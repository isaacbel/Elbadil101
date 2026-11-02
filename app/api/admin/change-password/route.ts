import { NextResponse } from 'next/server';
import { getSession, hashPassword, verifyPassword, signToken } from '@/lib/auth';
import { getDb, initDb } from '@/lib/db';

const COMMON_WEAK_WORDS = new Set([
  'password',
  'admin',
  'qwerty',
  'candidate',
  'elbadil',
  'albadil',
]);

function isWeakPattern(pass: string): boolean {
  const lower = pass.toLowerCase();
  for (const word of COMMON_WEAK_WORDS) {
    if (lower.includes(word)) return true;
  }
  // Check sequential digits (e.g. 4+ consecutive incrementing numbers)
  for (let i = 0; i < pass.length - 3; i++) {
    const c0 = pass.charCodeAt(i);
    const c1 = pass.charCodeAt(i + 1);
    const c2 = pass.charCodeAt(i + 2);
    const c3 = pass.charCodeAt(i + 3);
    if (c1 === c0 + 1 && c2 === c1 + 1 && c3 === c2 + 1) return true;
  }
  // Check repeated single character
  if (/^(\w)\1+$/.test(pass)) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح به' }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const { currentPassword, newPassword } = body || {};

    if (!currentPassword || !newPassword || typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return NextResponse.json(
        { error: 'كلمة المرور الحالية وكلمة المرور الجديدة مطلوبتان.' },
        { status: 400 }
      );
    }

    await initDb();
    const db = getDb();

    // Verify current password against database
    const userResult = await db.execute({
      sql: 'SELECT password_hash FROM admin_users WHERE email = ?',
      args: [session.email.toLowerCase().trim()],
    });

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'حساب المستخدم غير موجود.' }, { status: 404 });
    }

    const currentHash = String(userResult.rows[0].password_hash);
    if (!verifyPassword(currentPassword, currentHash)) {
      return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة.' }, { status: 400 });
    }

    // Password strength rules
    const minLength = process.env.NODE_ENV === 'production' ? 12 : 8;
    if (newPassword.length < minLength) {
      return NextResponse.json(
        { error: `يجب ألا تقل كلمة المرور الجديدة عن ${minLength} أحرف.` },
        { status: 400 }
      );
    }

    if (isWeakPattern(newPassword)) {
      return NextResponse.json(
        { error: 'كلمة المرور الجديدة ضعيفة أو شائعة جداً. يرجى اختيار عبارة مرور أكثر تعقيداً.' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمة المرور الحالية.' },
        { status: 400 }
      );
    }

    // Update password hash and clear must_change_password flag
    const newHash = hashPassword(newPassword);
    await db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, must_change_password = 0 WHERE email = ?',
      args: [newHash, session.email.toLowerCase().trim()],
    });

    // Refresh session cookie
    const token = signToken({
      email: session.email,
      role: session.role,
      mustChangePassword: false,
    });

    const res = NextResponse.json({
      ok: true,
      message: 'تم تحديث كلمة المرور بنجاح.',
    });

    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return res;
  } catch (err: any) {
    console.error('Password change error:', err);
    return NextResponse.json({ error: 'حدث خطأ داخلي في الخادم.' }, { status: 500 });
  }
}
