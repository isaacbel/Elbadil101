import { z } from 'zod';

export const algerianPhoneRegex = /^(\+213|0)(5|6|7)\d{8}$/;

export const supportSchema = z.object({
  firstName: z.string().trim().min(2, { message: 'first_name_min' }).max(70),
  lastName: z.string().trim().min(2, { message: 'last_name_min' }).max(70),
  wilaya: z.string().min(1, { message: 'wilaya_required' }),
  phone: z.string().trim().regex(algerianPhoneRegex, { message: 'invalid_phone' }),
  commune: z.string().trim().max(100).optional().default(''),
  intention: z.string().optional().default(''),
  participation: z.string().optional().default(''),
  message: z.string().trim().max(1000, { message: 'message_max' }).optional().default(''),
  consent: z.union([z.boolean(), z.string()]).refine(val => val === true || val === 'true' || val === 'on', {
    message: 'consent_required',
  }),
  website: z.string().max(0, { message: 'Spam detected' }).optional().default(''),
});

export const requestTypes = [
  'General Information',
  'Complaint',
  'Suggestion',
  'Question',
  'Technical Problem',
  'Request for Assistance',
  'Other',
] as const;

export const submissionSchema = z.object({
  fullName: z.string().trim().min(3, { message: 'name_min' }).max(140),
  email: z.string().trim().email({ message: 'invalid_email' }),
  phone: z.string().trim().regex(algerianPhoneRegex, { message: 'invalid_phone' }),
  wilaya: z.string().min(1, { message: 'wilaya_required' }),
  commune: z.string().trim().max(100).optional().default(''),
  organization: z.string().trim().max(120).optional().default(''),
  type: z.enum(requestTypes, { errorMap: () => ({ message: 'type_required' }) }),
  subject: z.string().trim().min(3, { message: 'subject_min' }).max(160, { message: 'subject_max' }),
  description: z.string().trim().min(10, { message: 'description_min' }).max(3000, { message: 'description_max' }),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
  consent: z.union([z.boolean(), z.string()]).refine(val => val === true || val === 'true' || val === 'on', {
    message: 'consent_required',
  }),
  website: z.string().max(0, { message: 'Spam detected' }).optional().default(''),
  idempotencyKey: z.string().max(100).optional(),
  // Conditional Complaint fields
  complaintCategory: z.string().max(100).optional().default(''),
  concernedParty: z.string().max(120).optional().default(''),
  incidentDate: z.string().max(30).optional().default(''),
  confidential: z.union([z.boolean(), z.string()]).optional().default(false),
  // Conditional Suggestion fields
  suggestionTitle: z.string().max(160).optional().default(''),
  expectedImprovement: z.string().max(1000).optional().default(''),
});

export type SupportFormData = z.infer<typeof supportSchema>;
export type SubmissionFormData = z.infer<typeof submissionSchema>;
