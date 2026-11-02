import fs from 'fs';
import path from 'path';
import { hashPassword } from '../lib/auth';
import { getDb, initDb } from '../lib/db';

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

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

// Ensure .env.local and .env are loaded when running script directly via tsx
loadEnvFile(path.resolve(process.cwd(), '.env.local'));
loadEnvFile(path.resolve(process.cwd(), '.env'));

async function seed() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const role = (process.env.ADMIN_ROLE?.trim() || 'super_admin').toLowerCase();

  if (!email || !password) {
    console.error('\n[ERROR] Missing required credentials.');
    console.error('Please ensure ADMIN_EMAIL and ADMIN_PASSWORD are set in .env.local or your environment.\n');
    process.exit(1);
  }

  // Production weak-password protection
  const isProduction = process.env.NODE_ENV === 'production';
  const isWeak = password.length < 12 || isWeakPattern(password);

  if (isProduction && isWeak) {
    console.error('\n[SECURITY ERROR] Seed script aborted in production environment.');
    console.error('Production policy requires ADMIN_PASSWORD to be at least 12 characters long and not match common weak passwords.');
    console.error('Please update ADMIN_PASSWORD in your production environment settings with a strong passphrase.\n');
    process.exit(1);
  }

  // In non-production, flag if weak password is used so admin is prompted to update it
  const mustChangePassword = isWeak ? 1 : 0;

  console.log('Initializing database schema...');
  await initDb();
  const db = getDb();

  const passwordHash = hashPassword(password);

  console.log('Synchronizing admin account in database...');
  const existing = await db.execute({
    sql: 'SELECT id FROM admin_users WHERE email = ?',
    args: [email.toLowerCase()],
  });

  if (existing.rows.length > 0) {
    await db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, role = ?, must_change_password = ? WHERE email = ?',
      args: [passwordHash, role, mustChangePassword, email.toLowerCase()],
    });
    console.log('[SUCCESS] Existing admin account updated with role:', role);
  } else {
    await db.execute({
      sql: 'INSERT INTO admin_users (email, role, password_hash, must_change_password) VALUES (?, ?, ?, ?)',
      args: [email.toLowerCase(), role, passwordHash, mustChangePassword],
    });
    console.log('[SUCCESS] New admin account created with role:', role);
  }

  if (mustChangePassword) {
    console.log('[SECURITY NOTICE] Temporary/weak development password detected. A change prompt will be displayed upon login.');
  }
  console.log('Admin provisioning complete. You can now log in at /admin/login.\n');
}

seed().catch((err) => {
  console.error('[SEED ERROR]', err);
  process.exit(1);
});
