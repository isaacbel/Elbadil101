import { hashPassword } from '../lib/auth';
import { getDb, initDb } from '../lib/db';

async function seed() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  const password = process.env.ADMIN_PASSWORD || process.argv[3];
  const role = (process.env.ADMIN_ROLE || process.argv[4] || 'super_admin').toLowerCase();

  if (!email || !password) {
    console.error('Usage: tsx scripts/seed-admin.ts [email] [password] [role]');
    console.error('Or provide ADMIN_EMAIL and ADMIN_PASSWORD in environment variables.');
    process.exit(1);
  }

  console.log(`\nInitializing database...`);
  await initDb();
  const db = getDb();

  const passwordHash = hashPassword(password);

  console.log(`Checking admin user: ${email}...`);
  const existing = await db.execute({
    sql: 'SELECT id, email, role FROM admin_users WHERE email = ?',
    args: [email.toLowerCase().trim()],
  });

  if (existing.rows.length > 0) {
    await db.execute({
      sql: 'UPDATE admin_users SET password_hash = ?, role = ? WHERE email = ?',
      args: [passwordHash, role, email.toLowerCase().trim()],
    });
    console.log(`Updated existing admin account for ${email} with role: ${role}`);
  } else {
    await db.execute({
      sql: 'INSERT INTO admin_users (email, role, password_hash) VALUES (?, ?, ?)',
      args: [email.toLowerCase().trim(), role, passwordHash],
    });
    console.log(`Created new admin account for ${email} with role: ${role}`);
  }

  console.log(`\n--- Credentials Config ---`);
  console.log(`ADMIN_EMAIL=${email}`);
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(`ADMIN_ROLE=${role}`);
  console.log(`You can also store ADMIN_PASSWORD_HASH in your .env.local or Vercel env.\n`);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
