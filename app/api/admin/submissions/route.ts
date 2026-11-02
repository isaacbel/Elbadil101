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
  const type = searchParams.get('type') || '';
  const status = searchParams.get('status') || '';
  const priority = searchParams.get('priority') || '';
  const wilaya = searchParams.get('wilaya') || '';
  const sort = searchParams.get('sort') === 'oldest' ? 'ASC' : 'DESC';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(5, parseInt(searchParams.get('limit') || '15', 10)));
  const offset = (page - 1) * limit;

  // Build parameterized WHERE clauses
  const conditions: string[] = [];
  const args: any[] = [];

  if (search) {
    const rawPattern = `%${search}%`;
    const normPattern = `%${normalizeArabicText(search)}%`;
    conditions.push(
      `(${normalizeSqlColumn('reference_id')} LIKE ? OR ${normalizeSqlColumn('subject')} LIKE ? OR ${normalizeSqlColumn('description')} LIKE ? OR reference_id LIKE ? OR subject LIKE ? OR description LIKE ?)`
    );
    args.push(normPattern, normPattern, normPattern, rawPattern, rawPattern, rawPattern);
  }

  if (type) {
    conditions.push('type = ?');
    args.push(type);
  }

  if (status) {
    conditions.push('status = ?');
    args.push(status);
  }

  if (priority) {
    conditions.push('priority = ?');
    args.push(priority);
  }

  if (wilaya) {
    conditions.push('(wilaya LIKE ? OR wilaya = ?)');
    args.push(`%${wilaya}%`, wilaya);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count matching filters
  const countRes = await db.execute({
    sql: `SELECT COUNT(*) as total FROM submissions ${whereClause}`,
    args: [...args],
  });
  const total = Number(countRes.rows[0]?.total || 0);

  // Query records
  const querySql = `
    SELECT id, reference_id, full_name, email, phone, wilaya, commune, organization,
           type, subject, description, priority, status, confidential, created_at
    FROM submissions
    ${whereClause}
    ORDER BY id ${sort}
    LIMIT ? OFFSET ?
  `;

  const rowsRes = await db.execute({
    sql: querySql,
    args: [...args, limit, offset],
  });

  const isSuperAdmin = session.role === 'super_admin';

  // Format and mask confidential data if not authorized
  const items = rowsRes.rows.map((row) => {
    const isConfidential = Number(row.confidential) === 1;
    let email = String(row.email || '');
    let phone = String(row.phone || '');
    let fullName = String(row.full_name || '');

    if (isConfidential && !isSuperAdmin) {
      email = '***@confidential.dz';
      phone = '05******** (Confidential)';
      fullName = `${fullName.slice(0, 1)}*** (Confidential)`;
    }

    return {
      id: Number(row.id),
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
    };
  });

  return NextResponse.json({
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
    userRole: session.role,
  });
}
