import { z } from 'zod';

// Schema for fetching a visit log by ID
export const FetchVisitLogByIdSchema = z.object({
  visit_id: z.string().uuid(),
});

// Schema for fetching all visits of a patient
export const FetchVisitLogsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all visits handled by a doctor
export const FetchVisitLogsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating a visit log entry
export const CreateVisitLogSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  visit_date: z.string().datetime(),
  notes: z.string().optional(),
});

// Schema for updating a visit log entry
export const UpdateVisitLogSchema = z.object({
  visit_id: z.string().uuid(),
  notes: z.string().optional(),
});

// Schema for deleting a visit log entry
export const DeleteVisitLogSchema = z.object({
  visit_id: z.string().uuid(),
});
