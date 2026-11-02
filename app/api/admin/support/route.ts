import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';
import { normalizeArabicText } from '@/lib/admin-labels';

function normalizeSqlColumn(col: string): string {
  return `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(${col}, 'أ', 'ا'), 'إ', 'ا'), 'آ', 'ا'), 'ٱ', 'ا'), 'ة', 'ه'), 'ى', 'ي'), 'َ', ''), 'ُ', ''), 'ِ', '')`;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await initDb();
  const db = getDb();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.trim() || '';
  const wilaya = searchParams.get('wilaya') || '';
  const intention = searchParams.get('intention') || '';
  const participation = searchParams.get('participation') || '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit') || '20', 10)));
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const args: any[] = [];

  if (search) {
    const rawPattern = `%${search}%`;
    const normPattern = `%${normalizeArabicText(search)}%`;
    conditions.push(
      `(${normalizeSqlColumn('first_name')} LIKE ? OR ${normalizeSqlColumn('last_name')} LIKE ? OR ${normalizeSqlColumn('commune')} LIKE ? OR phone LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR commune LIKE ?)`
    );
    args.push(normPattern, normPattern, normPattern, rawPattern, rawPattern, rawPattern, rawPattern);
  }

  if (wilaya) {
    conditions.push('(wilaya LIKE ? OR wilaya = ?)');
    args.push(`%${wilaya}%`, wilaya);
  }

  if (intention) {
    conditions.push('intention = ?');
    args.push(intention);
  }

  if (participation) {
    conditions.push('participation = ?');
    args.push(participation);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRes = await db.execute({
    sql: `SELECT COUNT(*) as total FROM support_registrations ${whereClause}`,
    args: [...args],
  });
  const total = Number(countRes.rows[0]?.total || 0);

  const rowsRes = await db.execute({
    sql: `SELECT id, first_name, last_name, wilaya, phone, commune, intention, participation, message, created_at
          FROM support_registrations
          ${whereClause}
          ORDER BY id DESC
          LIMIT ? OFFSET ?`,
    args: [...args, limit, offset],
  });

  return NextResponse.json({
    items: rowsRes.rows.map((r) => ({
      id: Number(r.id),
      firstName: String(r.first_name),
      lastName: String(r.last_name),
      wilaya: String(r.wilaya),
      phone: String(r.phone),
      commune: String(r.commune || ''),
      intention: String(r.intention || ''),
      participation: String(r.participation || ''),
      message: String(r.message || ''),
      createdAt: String(r.created_at),
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
}
