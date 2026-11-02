import crypto from 'crypto';
import { ANTI_ABUSE_CONFIG } from './constants';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const contentStore = new Map<string, number>(); // contentHash -> timestamp

// Periodic cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
    for (const [hash, timestamp] of contentStore.entries()) {
      if (now - timestamp > ANTI_ABUSE_CONFIG.duplicateContentWindowMs) {
        contentStore.delete(hash);
      }
    }
  }, 10 * 60 * 1000).unref?.();
}

/**
 * Creates a one-way salted hash of an IP address.
 * Never stores or logs raw IP addresses.
 */
export function hashIp(rawIp: string): string {
  return crypto
    .createHash('sha256')
    .update(`${rawIp}:${ANTI_ABUSE_CONFIG.ipSalt}`)
    .digest('hex');
}

/**
 * Checks rate limit by hashed identifier.
 */
export function checkHashedRateLimit(
  hashedIdentifier: string,
  limit: number = ANTI_ABUSE_CONFIG.ipRateLimitMax,
  windowMs: number = ANTI_ABUSE_CONFIG.ipRateLimitWindowMs
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitStore.get(hashedIdentifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(hashedIdentifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSec: Math.ceil((record.resetTime - now) / 1000),
  };
}

/**
 * Backward compatible alias for rate limit checks
 */
export const checkRateLimit = checkHashedRateLimit;

/**
 * Checks if an identical submission content was received within the duplicate window.
 */
export function checkDuplicateContent(type: string, subject: string, description: string): boolean {
  const normalized = `${type.trim().toLowerCase()}:${subject.trim().toLowerCase()}:${description.trim().toLowerCase()}`;
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  const now = Date.now();
  const lastTime = contentStore.get(hash);

  if (lastTime && (now - lastTime) < ANTI_ABUSE_CONFIG.duplicateContentWindowMs) {
    return true; // is duplicate
  }

  contentStore.set(hash, now);
  return false;
}
