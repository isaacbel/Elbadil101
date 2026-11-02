import { NextResponse } from 'next/server';
import { supportSchema } from '@/lib/validations';
import { getDb, initDb, sanitizeText } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const rateCheck = checkRateLimit(`support_${rawIp}`, 6, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const json = await req.json();
    const result = supportSchema.safeParse(json);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Validation error';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { firstName, lastName, wilaya, phone, commune, intention, participation, message, website } =
      result.data;

    // Honeypot check
    if (website && website.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    await initDb();
    const db = getDb();

    // Check duplicate phone
    const existing = await db.execute({
      sql: 'SELECT id FROM support_registrations WHERE phone = ?',
      args: [phone.trim()],
    });

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'This phone number is already registered.', code: 'DUPLICATE_PHONE' },
        { status: 400 }
      );
    }

    await db.execute({
      sql: `INSERT INTO support_registrations (
        first_name, last_name, wilaya, phone, commune, intention, participation, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sanitizeText(firstName),
        sanitizeText(lastName),
        sanitizeText(wilaya),
        phone.trim(),
        sanitizeText(commune),
        sanitizeText(intention),
        sanitizeText(participation),
        sanitizeText(message),
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Error in /api/support:', err);
    return NextResponse.json(
      { error: 'Database or server configuration error.' },
      { status: 500 }
    );
  }
}
