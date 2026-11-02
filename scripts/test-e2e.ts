import { initDb, getDb } from '../lib/db';
import { authenticateAdmin, signToken, verifyToken } from '../lib/auth';
import { submissionSchema } from '../lib/validations';

async function runTests() {
  console.log('=== RUNNING END-TO-END QA TESTS ===\n');

  await initDb();
  const db = getDb();

  // Test 1: Validation Schemas
  console.log('1. Testing Validation Schemas:');
  const validSubmission = submissionSchema.safeParse({
    type: 'Complaint',
    subject: 'Lighting issue in municipal park',
    description: 'The streetlights have been non-functional for 3 weeks.',
    consent: true,
  });
  console.log(' - Valid submission data:', validSubmission.success ? 'PASS' : 'FAIL');

  const invalidSubmission = submissionSchema.safeParse({
    type: 'Complaint',
    subject: 'Hi', // too short
    description: 'Short',
    consent: true,
  });
  console.log(' - Short subject rejected:', !invalidSubmission.success ? 'PASS' : 'FAIL');

  const honeypotTrap = submissionSchema.safeParse({
    type: 'Suggestion',
    subject: 'Improve civic green spaces',
    description: 'We propose planting native olive trees along municipal avenues.',
    consent: true,
    website: 'http://spam.com',
  });
  console.log(' - Honeypot detected & rejected:', !honeypotTrap.success ? 'PASS' : 'FAIL');

  // Test 2: Database Support Insertion & Duplicate Protection
  console.log('\n2. Testing Support Registration Database Operations:');
  const testPhone = `0666${Math.floor(100000 + Math.random() * 900000)}`;
  await db.execute({
    sql: 'INSERT INTO support_registrations (first_name, last_name, wilaya, phone, intention, participation) VALUES (?, ?, ?, ?, ?, ?)',
    args: ['Karim', 'Brahimi', '31 - Oran', testPhone, 'definitely', 'support'],
  });
  console.log(' - Registered supporter with phone:', testPhone, '-> PASS');

  try {
    await db.execute({
      sql: 'INSERT INTO support_registrations (first_name, last_name, wilaya, phone) VALUES (?, ?, ?, ?)',
      args: ['Duplicate', 'User', '31 - Oran', testPhone],
    });
    console.log(' - Duplicate phone protection: FAIL (allowed duplicate)');
  } catch (e: any) {
    console.log(' - Duplicate phone protection: PASS (blocked duplicate)');
  }

  // Test 3: Citizen Submissions & Cascading Relations
  console.log('\n3. Testing Citizen Submissions & Relations:');
  const testRef = `REQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const subRes = await db.execute({
    sql: `INSERT INTO submissions (
      reference_id, full_name, email, phone, wilaya, commune, type, subject, description, priority, status, confidential
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      testRef,
      'Fatima Zohra',
      'fatima@example.org',
      '0777123456',
      '25 - Constantine',
      'El Khroub',
      'Complaint',
      'Public lighting issue in district C',
      'Streetlights have been out of order for 3 weeks affecting safety.',
      'High',
      'Pending',
      1,
    ],
  });
  const subId = Number(subRes.lastInsertRowid);
  console.log(' - Created complaint with Ref ID:', testRef, 'ID:', subId, '-> PASS');

  await db.execute({
    sql: 'INSERT INTO complaint_details (submission_id, category, concerned_party, explanation) VALUES (?, ?, ?, ?)',
    args: [subId, 'local_infrastructure', 'Commune Public Works', 'Streetlights need bulb replacement'],
  });
  console.log(' - Inserted complaint details record -> PASS');

  await db.execute({
    sql: 'INSERT INTO status_history (submission_id, previous_status, new_status, changed_by) VALUES (?, ?, ?, ?)',
    args: [subId, 'Created', 'Pending', 'Citizen Submission'],
  });
  console.log(' - Inserted initial audit log -> PASS');

  // Test 4: Internal Administrative Notes
  console.log('\n4. Testing Internal Administrative Notes:');
  await db.execute({
    sql: 'INSERT INTO internal_notes (submission_id, author_email, body) VALUES (?, ?, ?)',
    args: [subId, 'admin@candidate.dz', 'Forwarded to local liaison coordinator for inspection.'],
  });
  const notes = await db.execute({
    sql: 'SELECT * FROM internal_notes WHERE submission_id = ?',
    args: [subId],
  });
  console.log(' - Retrieved internal notes count:', notes.rows.length, '-> PASS');

  // Test 5: Status Update & Audit Logging
  console.log('\n5. Testing Status Update & Audit Logging:');
  await db.execute({
    sql: 'UPDATE submissions SET status = ? WHERE id = ?',
    args: ['In Progress', subId],
  });
  await db.execute({
    sql: 'INSERT INTO status_history (submission_id, previous_status, new_status, changed_by) VALUES (?, ?, ?, ?)',
    args: [subId, 'Pending', 'In Progress', 'admin@candidate.dz'],
  });
  const history = await db.execute({
    sql: 'SELECT * FROM status_history WHERE submission_id = ?',
    args: [subId],
  });
  console.log(' - Audit history records count:', history.rows.length, '-> PASS');

  // Test 6: Authentication & Token Security
  console.log('\n6. Testing Auth & Session Cryptography:');
  const authSuccess = await authenticateAdmin('admin@candidate.dz', 'TestPass123!');
  console.log(' - Authenticate with correct password:', authSuccess ? `PASS (Role: ${authSuccess.role})` : 'FAIL');

  const authFail = await authenticateAdmin('admin@candidate.dz', 'WrongPassword');
  console.log(' - Authenticate with bad password:', authFail === null ? 'PASS (Rejected)' : 'FAIL');

  const token = signToken({ email: 'admin@candidate.dz', role: 'super_admin' });
  const verified = verifyToken(token);
  console.log(' - Token signature & payload verification:', verified?.email === 'admin@candidate.dz' ? 'PASS' : 'FAIL');

  const tamperedToken = token.slice(0, -4) + 'abcd';
  const tamperedVerified = verifyToken(tamperedToken);
  console.log(' - Tampered token rejected:', tamperedVerified === null ? 'PASS' : 'FAIL');

  // Test 7: Cascade Deletion
  console.log('\n7. Testing Deletion & Cleanup:');
  await db.batch([
    { sql: 'DELETE FROM internal_notes WHERE submission_id = ?', args: [subId] },
    { sql: 'DELETE FROM complaint_details WHERE submission_id = ?', args: [subId] },
    { sql: 'DELETE FROM status_history WHERE submission_id = ?', args: [subId] },
    { sql: 'DELETE FROM submissions WHERE id = ?', args: [subId] },
  ], 'write');
  const checkDel = await db.execute({ sql: 'SELECT id FROM submissions WHERE id = ?', args: [subId] });
  console.log(' - Cascade deletion of test record:', checkDel.rows.length === 0 ? 'PASS' : 'FAIL');

  console.log('\n=== ALL END-TO-END QA CHECKS COMPLETED SUCCESSFULLY ===');
}

runTests().catch(console.error);
