import { z } from 'zod';

// Schema for fetching a doctor note by ID
export const fetchDoctorNoteByIdSchema = z.object({
  note_id: z.string().uuid(),
});

// Schema for fetching all doctor notes for a specific patient
export const fetchDoctorNotesByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for creating a doctor note
export const createDoctorNoteSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  note: z.string().min(3).max(1000),
  created_at: z.string().datetime().optional(),
});

// Schema for updating a doctor note
export const updateDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
  note: z.string().min(3).max(1000).optional(),
});

// Schema for soft deleting a doctor note
export const softDeleteDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
});

// Schema for restoring a soft deleted doctor note
export const restoreDoctorNoteSchema = z.object({
  note_id: z.string().uuid(),
});

export type FetchDoctorNoteByIdValidator = z.infer<typeof fetchDoctorNoteByIdSchema>;
export type FetchDoctorNotesByPatientValidator = z.infer<typeof fetchDoctorNotesByPatientSchema>;
export type CreateDoctorNoteValidator = z.infer<typeof createDoctorNoteSchema>;
export type UpdateDoctorNoteValidator = z.infer<typeof updateDoctorNoteSchema>;
export type SoftDeleteDoctorNoteValidator = z.infer<typeof softDeleteDoctorNoteSchema>;
export type RestoreDoctorNoteValidator = z.infer<typeof restoreDoctorNoteSchema>;