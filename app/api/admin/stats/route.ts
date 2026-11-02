import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await initDb();
  const db = getDb();

  const [
    totalSubRes,
    complaintsRes,
    suggestionsRes,
    pendingRes,
    inProgressRes,
    resolvedRes,
    supportersRes,
    timelineRes,
  ] = await Promise.all([
    db.execute('SELECT COUNT(*) as c FROM submissions'),
    db.execute("SELECT COUNT(*) as c FROM submissions WHERE type = 'Complaint'"),
    db.execute("SELECT COUNT(*) as c FROM submissions WHERE type = 'Suggestion'"),
    db.execute("SELECT COUNT(*) as c FROM submissions WHERE status = 'Pending'"),
    db.execute("SELECT COUNT(*) as c FROM submissions WHERE status = 'In Progress'"),
    db.execute("SELECT COUNT(*) as c FROM submissions WHERE status = 'Resolved'"),
    db.execute('SELECT COUNT(*) as c FROM support_registrations'),
    db.execute(`
      SELECT date(created_at) as day, COUNT(*) as count 
      FROM submissions 
      GROUP BY date(created_at) 
      ORDER BY day DESC 
      LIMIT 7
    `),
  ]);

  return NextResponse.json({
    totalSubmissions: Number(totalSubRes.rows[0]?.c || 0),
    totalComplaints: Number(complaintsRes.rows[0]?.c || 0),
    totalSuggestions: Number(suggestionsRes.rows[0]?.c || 0),
    pending: Number(pendingRes.rows[0]?.c || 0),
    inProgress: Number(inProgressRes.rows[0]?.c || 0),
    resolved: Number(resolvedRes.rows[0]?.c || 0),
    totalSupporters: Number(supportersRes.rows[0]?.c || 0),
    chartData: timelineRes.rows.map((r) => ({
      day: String(r.day || ''),
      count: Number(r.count || 0),
    })),
  });
}
