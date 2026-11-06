import { NextResponse } from 'next/server';
import { submissionSchema } from '@/lib/validations';
import { getDb, initDb, sanitizeText, generateReferenceId } from '@/lib/db';
import { hashIp, checkHashedRateLimit, checkDuplicateContent } from '@/lib/rate-limit';
import { CAMPAIGN_LOCATION, ANTI_ABUSE_CONFIG } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    // 1. Salted IP Hash rate limiting (raw IP is never stored)
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const hashedIp = hashIp(rawIp);
    const rateCheck = checkHashedRateLimit(hashedIp);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before submitting again.' },
        { status: 429 }
      );
    }

    const json = await req.json();

    // 2. Anti-bot submit timing check (immune to cross-machine clock skew)
    if (typeof json.clientDurationMs === 'number') {
      if (json.clientDurationMs > 0 && json.clientDurationMs < 800) {
        return NextResponse.json(
          { error: 'يرجى مراجعة محتوى المراسلة قبل الإرسال.' },
          { status: 400 }
        );
      }
    } else if (typeof json.formStartTime === 'number' && json.formStartTime > 0) {
      const elapsed = Date.now() - json.formStartTime;
      // Only reject if elapsed is positive and suspiciously sub-second; ignore negative elapsed due to client/server clock drift
      if (elapsed > 0 && elapsed < 800) {
        return NextResponse.json(
          { error: 'يرجى مراجعة محتوى المراسلة قبل الإرسال.' },
          { status: 400 }
        );
      }
    }

    // 3. Zod validation
    const result = submissionSchema.safeParse(json);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Validation error';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const d = result.data;

    // 4. Honeypot check
    if (d.website && d.website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // 5. Identical content detection within time window
    const submissionSubject = d.subject || d.type || 'مراسلة';
    const isDuplicate = checkDuplicateContent(d.type, submissionSubject, d.description);
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'An identical request was recently submitted. Please avoid duplicate submissions.' },
        { status: 409 }
      );
    }

    await initDb();
    const db = getDb();

    // 6. Idempotency check if key provided
    if (d.idempotencyKey) {
      const existingKey = await db.execute({
        sql: 'SELECT reference_id FROM submissions WHERE idempotency_key = ?',
        args: [d.idempotencyKey],
      });
      if (existingKey.rows.length > 0) {
        return NextResponse.json({ referenceId: existingKey.rows[0].reference_id });
      }
    }

    // 7. Collision-safe reference ID generator
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

    // 8. Enforce locked constituency location on SERVER
    const enforcedWilaya = CAMPAIGN_LOCATION.storageWilaya;
    const enforcedCommune = CAMPAIGN_LOCATION.storageCommune;

    // 9. Insert submission record (NO personal name, email, phone collected)
    const insertSub = await db.execute({
      sql: `INSERT INTO submissions (
        reference_id, full_name, email, phone, wilaya, commune, organization,
        type, subject, description, priority, status, confidential, idempotency_key
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 0, ?)`,
      args: [
        referenceId,
        'Anonymous Citizen', // identity not collected
        '',
        '',
        enforcedWilaya,
        enforcedCommune,
        sanitizeText(d.organization || ''),
        sanitizeText(d.type),
        sanitizeText(submissionSubject),
        sanitizeText(d.description),
        d.priority || 'Medium',
        d.idempotencyKey || null,
      ],
    });

    const subId = Number(insertSub.lastInsertRowid);

    // 10. Conditional insert into complaint_details
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

    // 11. Conditional insert into suggestion_details
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

    // 12. Initial status history log
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
