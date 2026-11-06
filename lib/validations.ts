import { z } from 'zod';
import { CAMPAIGN_LOCATION } from './constants';

export const requestTypes = [
  'General Information',
  'Complaint',
  'Suggestion',
  'Technical Problem',
  'Request for Assistance',
  'Other',
] as const;

// All valid types including legacy 'Question' for reading existing submissions
export const allKnownRequestTypes = [
  ...requestTypes,
  'Question',
] as const;

export const submissionSchema = z.object({
  // Location is fixed for the campaign (Taher, Jijel)
  wilaya: z.string().optional().default(CAMPAIGN_LOCATION.storageWilaya),
  commune: z.string().optional().default(CAMPAIGN_LOCATION.storageCommune),
  organization: z.string().trim().max(120).optional().default(''),
  type: z.enum(requestTypes, { errorMap: () => ({ message: 'نوع المراسلة غير صالح' }) }).or(z.string()),
  subject: z.string().trim().max(160).optional().default(''),
  description: z.string().trim().min(10, { message: 'نص المراسلة يجب أن يحتوي على 10 أحرف على الأقل' }).max(3000, { message: 'نص المراسلة لا يمكن أن يتجاوز 3000 حرف' }),
  priority: z.enum(['Low', 'Medium', 'High']).optional().default('Medium'),
  consent: z.union([z.boolean(), z.string()]).refine(val => val === true || val === 'true' || val === 'on', {
    message: 'الموافقة على شروط المراسلة مطلوبة',
  }),
  website: z.string().max(0, { message: 'تم رصد نشاط غير مصرح به' }).optional().default(''),
  idempotencyKey: z.string().max(100).optional(),
  formStartTime: z.number().optional(),
  clientDurationMs: z.number().optional(),

  // Optional legacy details
  complaintCategory: z.string().max(100).optional().default(''),
  concernedParty: z.string().max(120).optional().default(''),
  incidentDate: z.string().max(30).optional().default(''),
  suggestionTitle: z.string().max(160).optional().default(''),
  expectedImprovement: z.string().max(1000).optional().default(''),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
