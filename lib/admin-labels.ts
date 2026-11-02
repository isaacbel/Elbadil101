/**
 * Central Mapping & Helpers for the Admin Dashboard
 * Preserves database values in English while providing natural, formal Arabic labels.
 */

export const ADMIN_STATUS_LABELS: Record<string, string> = {
  Pending: 'قيد الانتظار',
  'In Progress': 'قيد المعالجة',
  Resolved: 'تمت المعالجة',
  // Lowercase fallbacks
  pending: 'قيد الانتظار',
  in_progress: 'قيد المعالجة',
  resolved: 'تمت المعالجة',
};

export const ADMIN_PRIORITY_LABELS: Record<string, string> = {
  Low: 'منخفضة',
  Medium: 'متوسطة',
  High: 'عالية',
  // Lowercase fallbacks
  low: 'منخفضة',
  medium: 'متوسطة',
  high: 'عالية',
};

export const ADMIN_TYPE_LABELS: Record<string, string> = {
  'General Information': 'معلومات عامة',
  Complaint: 'شكوى',
  Suggestion: 'اقتراح',
  Question: 'سؤال أو استفسار',
  'Technical Problem': 'مشكلة تقنية',
  'Request for Assistance': 'طلب مساعدة',
  Other: 'أخرى',
  // Lowercase / alternate fallbacks
  general_information: 'معلومات عامة',
  complaint: 'شكوى',
  suggestion: 'اقتراح',
  question: 'سؤال أو استفسار',
  technical_problem: 'مشكلة تقنية',
  request_for_assistance: 'طلب مساعدة',
  other: 'أخرى',
};

export const ADMIN_COMPLAINT_CATEGORY_LABELS: Record<string, string> = {
  public_services: 'المرافق والخدمات العمومية',
  local_infrastructure: 'البنية التحتية والتهيئة المحلية',
  administrative_delay: 'تعطيل أو بيروقراطية إدارية',
  social_housing: 'السكن والشؤون الاجتماعية',
  other: 'أخرى',
};

export const ADMIN_VOTING_INTENTION_LABELS: Record<string, string> = {
  definitely: 'سأصوت بالتأكيد',
  leaning: 'أميل نحو التصويت',
  learn_more: 'أرغب في معرفة المزيد',
  undecided: 'لم يقرر بعد',
};

export const ADMIN_PARTICIPATION_LABELS: Record<string, string> = {
  support: 'تسجيل الدعم الرمزي',
  share: 'نشر رسالة الحملة والتوعية',
  volunteer: 'التطوع في لجان العمل',
  field_outreach: 'المشاركة في العمل الميداني',
};

export const ADMIN_ROLE_LABELS: Record<string, string> = {
  super_admin: 'المسؤول الرئيسي',
  admin: 'مسؤول إدارة',
};

/**
 * Shared Algerian Gregorian Date Formatter using Latin numerals (0-9)
 * Format: 2 نوفمبر 2026 أو 2 نوفمبر 2026 في 14:30
 */
export function formatAdminDate(
  dateVal: string | number | Date | null | undefined,
  includeTime = false
): string {
  if (!dateVal) return '—';
  try {
    const d = typeof dateVal === 'string' || typeof dateVal === 'number' ? new Date(dateVal) : dateVal;
    if (isNaN(d.getTime())) return String(dateVal);

    if (includeTime) {
      return new Intl.DateTimeFormat('ar-DZ-u-nu-latn', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(d);
    }

    return new Intl.DateTimeFormat('ar-DZ-u-nu-latn', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch {
    return String(dateVal);
  }
}

/**
 * Short date formatter (e.g. 2 جانفي 2026)
 */
export function formatAdminDateShort(dateVal: string | number | Date | null | undefined): string {
  if (!dateVal) return '—';
  try {
    const d = typeof dateVal === 'string' || typeof dateVal === 'number' ? new Date(dateVal) : dateVal;
    if (isNaN(d.getTime())) return String(dateVal);
    return new Intl.DateTimeFormat('ar-DZ-u-nu-latn', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return String(dateVal);
  }
}

/**
 * Normalizes Arabic text for flexible matching:
 * - Removes tashkeel / diacritics
 * - Normalizes alefs: [أإآٱ] -> ا
 * - Normalizes yaa: ى -> ي
 * - Normalizes taa marbouta: ة -> ه
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove tashkeel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim()
    .toLowerCase();
}
