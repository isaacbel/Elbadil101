import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';
import {
  ADMIN_VOTING_INTENTION_LABELS,
  ADMIN_PARTICIPATION_LABELS,
  formatAdminDate,
} from '@/lib/admin-labels';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await initDb();
  const db = getDb();

  const res = await db.execute(`
    SELECT id, first_name, last_name, wilaya, phone, commune, intention, participation, message, created_at
    FROM support_registrations
    ORDER BY id DESC
  `);

  const escapeCsv = (val: unknown) => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
    'المعرف',
    'الاسم',
    'اللقب',
    'الولاية',
    'رقم الهاتف',
    'البلدية',
    'نية التصويت',
    'نوع المشاركة',
    'رسالة الدعم',
    'تاريخ التسجيل',
  ];

  const csvRows = [headers.join(',')];

  for (const row of res.rows) {
    const intentionLabel =
      (row.intention && ADMIN_VOTING_INTENTION_LABELS[String(row.intention)]) ||
      String(row.intention || '');
    const participationLabel =
      (row.participation && ADMIN_PARTICIPATION_LABELS[String(row.participation)]) ||
      String(row.participation || '');
    const formattedDate = formatAdminDate(row.created_at as string, true);

    csvRows.push(
      [
        row.id,
        escapeCsv(row.first_name),
        escapeCsv(row.last_name),
        escapeCsv(row.wilaya),
        escapeCsv(row.phone),
        escapeCsv(row.commune),
        escapeCsv(intentionLabel),
        escapeCsv(participationLabel),
        escapeCsv(row.message),
        escapeCsv(formattedDate),
      ].join(',')
    );
  }

  // Prepend UTF-8 BOM for Arabic support in Excel
  const csvContent = '\uFEFF' + csvRows.join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="candidate-supporters-2026.csv"',
    },
  });
}
