import { NextResponse } from 'next/server';
import { authenticateAdmin, signToken } from '@/lib/auth';
import {
  hashIp,
  checkLoginLockout,
  recordFailedLogin,
  clearFailedLogin,
} from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const hashedIp = hashIp(`login_${rawIp}`);

    // Check lockout on failed attempts (5 attempts, 10 minutes)
    const lockout = checkLoginLockout(hashedIp, 5, 10 * 60 * 1000);
    if (lockout.locked) {
      return NextResponse.json(
        { error: 'Too many failed login attempts. Please wait 10 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = body?.email;
    const password = body?.password;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      recordFailedLogin(hashedIp, 5, 10 * 60 * 1000);
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    const admin = await authenticateAdmin(email, password);

    if (!admin) {
      recordFailedLogin(hashedIp, 5, 10 * 60 * 1000);
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    // Clear failed attempts on valid login
    clearFailedLogin(hashedIp);

    const token = signToken({
      email: admin.email,
      role: admin.role,
      mustChangePassword: admin.mustChangePassword,
    });

    const res = NextResponse.json({
      ok: true,
      user: {
        email: admin.email,
        role: admin.role,
        mustChangePassword: admin.mustChangePassword,
      },
    });

    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return res;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Authentication service error.' }, { status: 500 });
  }
}
