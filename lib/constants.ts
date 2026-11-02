/**
 * CAMPAIGN CONSTITUENCY & SITE-WIDE CONSTANTS
 * ============================================
 * Fixed location for ALBADIL 101: Taher, Wilaya of Jijel (18).
 * To change the constituency in the future, edit this file only.
 */

export const CAMPAIGN_LOCATION = {
  wilayaCode: '18',
  wilaya: {
    ar: '18 - جيجل',
    fr: '18 - Jijel',
    en: '18 - Jijel',
  },
  commune: {
    ar: 'الطاهير',
    fr: 'Taher',
    en: 'Taher',
  },
  // Normalized strings for storage and server enforcement
  storageWilaya: '18 - Jijel',
  storageCommune: 'Taher',
} as const;

export const ANTI_ABUSE_CONFIG = {
  minSubmitTimeMs: 3000, // minimum 3 seconds before submit allowed (anti-bot)
  ipRateLimitMax: 10, // max 10 submissions per IP per window
  ipRateLimitWindowMs: 15 * 60 * 1000, // 15 minutes window
  duplicateContentWindowMs: 10 * 60 * 1000, // 10 minutes duplicate content check
  ipSalt: process.env.SESSION_SECRET || 'albadil-salt-2026',
} as const;
