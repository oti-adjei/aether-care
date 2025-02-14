import { z } from 'zod';

// Schema for fetching medical history by ID
export const FetchMedicalHistoryByIdSchema = z.object({
  history_id: z.string().uuid(),
});

// Schema for fetching medical history by patient ID
export const FetchMedicalHistoryByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for creating a medical history record
export const CreateMedicalHistorySchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  diagnosis: z.string().min(3).max(500),
  treatment: z.string().min(3).max(500),
  notes: z.string().optional(),
  recorded_at: z.string().datetime().optional(),
});

// Schema for updating a medical history record
export const UpdateMedicalHistorySchema = z.object({
  history_id: z.string().uuid(),
  diagnosis: z.string().min(3).max(500).optional(),
  treatment: z.string().min(3).max(500).optional(),
  notes: z.string().optional(),
});

// Schema for deleting a medical history record
export const DeleteMedicalHistorySchema = z.object({
  history_id: z.string().uuid(),
});
