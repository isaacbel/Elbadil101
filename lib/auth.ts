import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getDb, initDb } from './db';

const SESSION_COOKIE_NAME = 'admin_session';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, stored] = storedHash.split(':');
    if (!salt || !stored) return false;
    const derived = scryptSync(password, salt, 64);
    const value = Buffer.from(stored, 'hex');
    return value.length === derived.length && timingSafeEqual(value, derived);
  } catch {
    return false;
  }
}

export interface AdminSession {
  email: string;
  role: 'super_admin' | 'admin';
  exp: number;
}

export function signToken(data: { email: string; role: string }, maxAgeSec = 60 * 60 * 12): string {
  const secret = process.env.SESSION_SECRET || 'fallback-dev-secret-replace-in-production-long-random';
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  const payload = Buffer.from(JSON.stringify({ ...data, exp })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): AdminSession | null {
  try {
    const secret = process.env.SESSION_SECRET || 'fallback-dev-secret-replace-in-production-long-random';
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;

    const expected = createHmac('sha256', secret).update(payload).digest('base64url');
    if (signature !== expected) return null;

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AdminSession;
    if (Date.now() / 1000 > data.exp) return null;

    return data;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function authenticateAdmin(email: string, password: string): Promise<{ email: string; role: string } | null> {
  await initDb();
  const db = getDb();

  // First check database admin_users table
  const userResult = await db.execute({
    sql: 'SELECT email, role, password_hash FROM admin_users WHERE email = ?',
    args: [email.toLowerCase().trim()],
  });

  if (userResult.rows.length > 0) {
    const user = userResult.rows[0];
    const hash = String(user.password_hash);
    if (verifyPassword(password, hash)) {
      return {
        email: String(user.email),
        role: String(user.role || 'admin'),
      };
    }
    return null;
  }

  // Fallback check against environment variables (for initial setup before seeding or for master account)
  const envEmail = process.env.ADMIN_EMAIL;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (envEmail && email.toLowerCase().trim() === envEmail.toLowerCase().trim()) {
    if (envHash && verifyPassword(password, envHash)) {
      return { email: envEmail, role: 'super_admin' };
    }
    if (envPassword && password === envPassword) {
      return { email: envEmail, role: 'super_admin' };
    }
  }

  return null;
}
