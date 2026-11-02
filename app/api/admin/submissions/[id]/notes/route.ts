import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb, initDb, sanitizeText } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { body } = await req.json();

  if (!body || typeof body !== 'string' || body.trim().length === 0) {
    return NextResponse.json({ error: 'Note text cannot be empty' }, { status: 400 });
  }

  await initDb();
  const db = getDb();

  const subRes = await db.execute({
    sql: 'SELECT id FROM submissions WHERE id = ? OR reference_id = ?',
    args: [id, id],
  });

  if (subRes.rows.length === 0) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
  }

  const subId = Number(subRes.rows[0].id);

  const insertRes = await db.execute({
    sql: 'INSERT INTO internal_notes (submission_id, author_email, body) VALUES (?, ?, ?)',
    args: [subId, session.email, sanitizeText(body)],
  });

  return NextResponse.json({
    ok: true,
    note: {
      id: Number(insertRes.lastInsertRowid),
      authorEmail: session.email,
      body: sanitizeText(body),
      createdAt: new Date().toISOString(),
    },
  });
}
