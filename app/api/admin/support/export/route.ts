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
    'ID',
    'First Name',
    'Last Name',
    'Wilaya',
    'Phone',
    'Commune',
    'Voting Intention',
    'Participation Type',
    'Support Message',
    'Registration Date',
  ];

  const csvRows = [headers.join(',')];

  for (const row of res.rows) {
    csvRows.push(
      [
        row.id,
        escapeCsv(row.first_name),
        escapeCsv(row.last_name),
        escapeCsv(row.wilaya),
        escapeCsv(row.phone),
        escapeCsv(row.commune),
        escapeCsv(row.intention),
        escapeCsv(row.participation),
        escapeCsv(row.message),
        escapeCsv(row.created_at),
      ].join(',')
    );
  }

  // Prepend UTF-8 BOM for Arabic support in Excel
  const csvContent = '\uFEFF' + csvRows.join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="candidate-support-registrations-2026.csv"',
    },
  });
}
