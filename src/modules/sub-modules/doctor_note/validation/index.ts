import { z } from 'zod';

// Schema for fetching a doctor note by ID
export const FetchDoctorNoteByIdSchema = z.object({
  note_id: z.string().uuid(),
});

// Schema for fetching all doctor notes for a specific patient
export const FetchDoctorNotesByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for creating a doctor note
export const CreateDoctorNoteSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  note: z.string().min(3).max(1000),
  created_at: z.string().datetime().optional(),
});

// Schema for updating a doctor note
export const UpdateDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
  note: z.string().min(3).max(1000).optional(),
});

// Schema for soft deleting a doctor note
export const SoftDeleteDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
});

// Schema for restoring a soft deleted doctor note
export const RestoreDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
});
