import { z } from 'zod';

// Schema for fetching medical history by ID
export const fetchMedicalHistoryByIdSchema = z.object({
  history_id: z.string().uuid(),
});

// Schema for fetching medical history by patient ID
export const fetchMedicalHistoryByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for creating a medical history record
export const createMedicalHistorySchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  diagnosis: z.string().min(3).max(500),
  treatment: z.string().min(3).max(500),
  notes: z.string().optional(),
  diagnosed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// Schema for updating a medical history record
export const updateMedicalHistorySchema = z.object({
  history_id: z.string().uuid(),
  diagnosis: z.string().min(3).max(500).optional(),
  treatment: z.string().min(3).max(500).optional(),
  notes: z.string().optional(),
});

// Schema for deleting a medical history record
export const deleteMedicalHistorySchema = z.object({
  history_id: z.string().uuid(),
});


export type FetchMedicalHistoryByIdValidator= z.infer<typeof fetchMedicalHistoryByIdSchema>;
export type FetchMedicalHistoryByPatientValidator= z.infer<typeof fetchMedicalHistoryByPatientSchema>;
export type CreateMedicalHistoryValidator= z.infer<typeof createMedicalHistorySchema>;
export type UpdateMedicalHistoryValidator= z.infer<typeof updateMedicalHistorySchema>;
export type DeleteMedicalHistoryValidator= z.infer<typeof deleteMedicalHistorySchema>;