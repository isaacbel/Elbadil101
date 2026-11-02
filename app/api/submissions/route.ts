import { NextResponse } from 'next/server';
import { submissionSchema } from '@/lib/validations';
import { getDb, initDb, sanitizeText, generateReferenceId } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const rateCheck = checkRateLimit(`submission_${rawIp}`, 8, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const json = await req.json();
    const result = submissionSchema.safeParse(json);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Validation error';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const d = result.data;

    // Honeypot check
    if (d.website && d.website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    await initDb();
    const db = getDb();

    // Idempotency check if key provided
    if (d.idempotencyKey) {
      const existingKey = await db.execute({
        sql: 'SELECT reference_id FROM submissions WHERE idempotency_key = ?',
        args: [d.idempotencyKey],
      });
      if (existingKey.rows.length > 0) {
        return NextResponse.json({ referenceId: existingKey.rows[0].reference_id });
      }
    }

    // Generate collision-safe reference ID
    let referenceId = generateReferenceId();
    let unique = false;
    let attempts = 0;
    while (!unique && attempts < 10) {
      const check = await db.execute({
        sql: 'SELECT id FROM submissions WHERE reference_id = ?',
        args: [referenceId],
      });
      if (check.rows.length === 0) {
        unique = true;
      } else {
        referenceId = generateReferenceId();
        attempts++;
      }
    }

    const isConfidential = d.confidential === true || d.confidential === 'true' ? 1 : 0;

    // Insert submission record
    const insertSub = await db.execute({
      sql: `INSERT INTO submissions (
        reference_id, full_name, email, phone, wilaya, commune, organization,
        type, subject, description, priority, status, confidential, idempotency_key
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?)`,
      args: [
        referenceId,
        sanitizeText(d.fullName),
        sanitizeText(d.email),
        d.phone.trim(),
        sanitizeText(d.wilaya),
        sanitizeText(d.commune),
        sanitizeText(d.organization),
        sanitizeText(d.type),
        sanitizeText(d.subject),
        sanitizeText(d.description),
        d.priority,
        isConfidential,
        d.idempotencyKey || null,
      ],
    });

    const subId = Number(insertSub.lastInsertRowid);

    // Conditional insert into complaint_details
    if (d.type === 'Complaint') {
      await db.execute({
        sql: `INSERT INTO complaint_details (
          submission_id, category, concerned_party, incident_date, explanation
        ) VALUES (?, ?, ?, ?, ?)`,
        args: [
          subId,
          sanitizeText(d.complaintCategory),
          sanitizeText(d.concernedParty),
          sanitizeText(d.incidentDate),
          sanitizeText(d.description),
        ],
      });
    }

    // Conditional insert into suggestion_details
    if (d.type === 'Suggestion') {
      await db.execute({
        sql: `INSERT INTO suggestion_details (
          submission_id, title, suggestion, expected_improvement
        ) VALUES (?, ?, ?, ?)`,
        args: [
          subId,
          sanitizeText(d.suggestionTitle || d.subject),
          sanitizeText(d.description),
          sanitizeText(d.expectedImprovement),
        ],
      });
    }

    // Initial status history log
    await db.execute({
      sql: `INSERT INTO status_history (submission_id, previous_status, new_status, changed_by)
            VALUES (?, 'Created', 'Pending', 'Citizen Submission')`,
      args: [subId],
    });

    return NextResponse.json({ referenceId });
  } catch (err: any) {
    console.error('Error in /api/submissions:', err);
    return NextResponse.json(
      { error: 'Database or server configuration error.' },
      { status: 500 }
    );
  }
}
