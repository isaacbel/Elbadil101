import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb, initDb, sanitizeText } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await initDb();
  const db = getDb();

  const subRes = await db.execute({
    sql: 'SELECT * FROM submissions WHERE id = ? OR reference_id = ?',
    args: [id, id],
  });

  if (subRes.rows.length === 0) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  const row = subRes.rows[0];
  const subId = Number(row.id);
  const isSuperAdmin = session.role === 'super_admin';
  const isConfidential = Number(row.confidential) === 1;

  // Masking if confidential and not super_admin
  let email = String(row.email || '');
  let phone = String(row.phone || '');
  let fullName = String(row.full_name || '');

  if (isConfidential && !isSuperAdmin) {
    email = '***@confidential.dz';
    phone = '05******** (Confidential)';
    fullName = `${fullName.slice(0, 1)}*** (Confidential)`;
  }

  // Fetch complaint details if type === 'Complaint'
  let complaintDetails = null;
  if (row.type === 'Complaint') {
    const cRes = await db.execute({
      sql: 'SELECT * FROM complaint_details WHERE submission_id = ?',
      args: [subId],
    });
    if (cRes.rows.length > 0) {
      const cr = cRes.rows[0];
      complaintDetails = {
        category: String(cr.category || ''),
        concernedParty: String(cr.concerned_party || ''),
        incidentDate: String(cr.incident_date || ''),
        explanation: String(cr.explanation || ''),
      };
    }
  }

  // Fetch suggestion details if type === 'Suggestion'
  let suggestionDetails = null;
  if (row.type === 'Suggestion') {
    const sRes = await db.execute({
      sql: 'SELECT * FROM suggestion_details WHERE submission_id = ?',
      args: [subId],
    });
    if (sRes.rows.length > 0) {
      const sr = sRes.rows[0];
      suggestionDetails = {
        title: String(sr.title || ''),
        suggestion: String(sr.suggestion || ''),
        expectedImprovement: String(sr.expected_improvement || ''),
      };
    }
  }

  // Fetch internal notes
  const notesRes = await db.execute({
    sql: 'SELECT id, author_email, body, created_at FROM internal_notes WHERE submission_id = ? ORDER BY id DESC',
    args: [subId],
  });

  // Fetch status history
  const historyRes = await db.execute({
    sql: 'SELECT id, previous_status, new_status, changed_by, created_at FROM status_history WHERE submission_id = ? ORDER BY id DESC',
    args: [subId],
  });

  return NextResponse.json({
    submission: {
      id: subId,
      referenceId: String(row.reference_id),
      fullName,
      email,
      phone,
      wilaya: String(row.wilaya || ''),
      commune: String(row.commune || ''),
      organization: String(row.organization || ''),
      type: String(row.type || ''),
      subject: String(row.subject || ''),
      description: String(row.description || ''),
      priority: String(row.priority || 'Medium'),
      status: String(row.status || 'Pending'),
      confidential: isConfidential,
      createdAt: String(row.created_at || ''),
      complaintDetails,
      suggestionDetails,
      notes: notesRes.rows.map((n) => ({
        id: Number(n.id),
        authorEmail: String(n.author_email),
        body: String(n.body),
        createdAt: String(n.created_at),
      })),
      statusHistory: historyRes.rows.map((h) => ({
        id: Number(h.id),
        previousStatus: String(h.previous_status),
        newStatus: String(h.new_status),
        changedBy: String(h.changed_by),
        createdAt: String(h.created_at),
      })),
    },
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await initDb();
  const db = getDb();

  const currentRes = await db.execute({
    sql: 'SELECT id, status, priority FROM submissions WHERE id = ? OR reference_id = ?',
    args: [id, id],
  });

  if (currentRes.rows.length === 0) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  const current = currentRes.rows[0];
  const subId = Number(current.id);
  const body = await req.json();

  const newStatus = body.status;
  const newPriority = body.priority;

  if (newStatus && newStatus !== current.status) {
    await db.execute({
      sql: 'UPDATE submissions SET status = ? WHERE id = ?',
      args: [newStatus, subId],
    });

    await db.execute({
      sql: `INSERT INTO status_history (submission_id, previous_status, new_status, changed_by)
            VALUES (?, ?, ?, ?)`,
      args: [subId, String(current.status), newStatus, session.email],
    });
  }

  if (newPriority && newPriority !== current.priority) {
    await db.execute({
      sql: 'UPDATE submissions SET priority = ? WHERE id = ?',
      args: [newPriority, subId],
    });
  }

  return NextResponse.json({ ok: true, status: newStatus || current.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await initDb();
  const db = getDb();

  await db.batch([
    {
      sql: 'DELETE FROM internal_notes WHERE submission_id = ?',
      args: [id],
    },
    {
      sql: 'DELETE FROM complaint_details WHERE submission_id = ?',
      args: [id],
    },
    {
      sql: 'DELETE FROM suggestion_details WHERE submission_id = ?',
      args: [id],
    },
    {
      sql: 'DELETE FROM status_history WHERE submission_id = ?',
      args: [id],
    },
    {
      sql: 'DELETE FROM submissions WHERE id = ? OR reference_id = ?',
      args: [id, id],
    },
  ], 'write');

  return NextResponse.json({ ok: true });
}
