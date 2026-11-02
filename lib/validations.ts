import { z } from 'zod';
import { CAMPAIGN_LOCATION } from './constants';

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
  // Location is fixed and validated against constants
  wilaya: z.string().optional().default(CAMPAIGN_LOCATION.storageWilaya),
  commune: z.string().optional().default(CAMPAIGN_LOCATION.storageCommune),
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
  formStartTime: z.number().optional(),

  // Conditional Complaint fields (without confidentiality since all submissions are anonymous)
  complaintCategory: z.string().max(100).optional().default(''),
  concernedParty: z.string().max(120).optional().default(''),
  incidentDate: z.string().max(30).optional().default(''),

  // Conditional Suggestion fields
  suggestionTitle: z.string().max(160).optional().default(''),
  expectedImprovement: z.string().max(1000).optional().default(''),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
