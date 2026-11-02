import { createClient, Client } from '@libsql/client';
import path from 'path';
import fs from 'fs';

let clientInstance: Client | null = null;
let initialized = false;

export function getDb(): Client {
  if (clientInstance) return clientInstance;

  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (url && (url.startsWith('libsql://') || url.startsWith('https://') || url.startsWith('http://'))) {
    clientInstance = createClient({
      url,
      authToken,
    });
  } else {
    // Local SQLite file via LibSQL
    const dbFilePath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'campaign.db');
    const dbDir = path.dirname(path.resolve(dbFilePath));
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const normalizedPath = path.resolve(dbFilePath).replace(/\\/g, '/');
    clientInstance = createClient({
      url: `file:${normalizedPath}`,
    });
  }

  return clientInstance;
}

export async function initDb(): Promise<void> {
  if (initialized) return;
  const db = getDb();

  await db.batch([
    `CREATE TABLE IF NOT EXISTS support_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      wilaya TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      commune TEXT,
      intention TEXT,
      participation TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );`,
    `CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_id TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      wilaya TEXT NOT NULL,
      commune TEXT,
      organization TEXT,
      type TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'Medium',
      status TEXT NOT NULL DEFAULT 'Pending',
      confidential INTEGER NOT NULL DEFAULT 0,
      idempotency_key TEXT UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    );`,
    `CREATE TABLE IF NOT EXISTS complaint_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER NOT NULL,
      category TEXT,
      concerned_party TEXT,
      incident_date TEXT,
      explanation TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS suggestion_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER NOT NULL,
      title TEXT,
      suggestion TEXT,
      expected_improvement TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );`,
    `CREATE TABLE IF NOT EXISTS internal_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER NOT NULL,
      author_email TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER NOT NULL,
      previous_status TEXT NOT NULL,
      new_status TEXT NOT NULL,
      changed_by TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
    );`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_ref ON submissions(reference_id);`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);`,
    `CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at);`,
    `CREATE INDEX IF NOT EXISTS idx_support_phone ON support_registrations(phone);`
  ], 'write');

  initialized = true;
}

export function sanitizeText(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  // 6 digit zero padded random number combined with timestamp slice to ensure uniqueness
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `REQ-${year}-${rand}`;
}
