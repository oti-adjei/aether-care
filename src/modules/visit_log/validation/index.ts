import { z } from 'zod';

// Schema for fetching a visit log by ID
export const fetchVisitLogByIdSchema = z.object({
  visit_id: z.number(),
});

// Schema for fetching all visits of a patient
export const fetchVisitLogsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all visits handled by a doctor
export const fetchVisitLogsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating a visit log entry
export const createVisitLogSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  visit_date: z.string().datetime(),
  notes: z.string().optional(),
});

// Schema for updating a visit log entry
export const updateVisitLogSchema = z.object({
  visit_id: z.string().uuid(),
  notes: z.string().optional(),
});

// Schema for deleting a visit log entry
export const deleteVisitLogSchema = z.object({
  visit_id: z.string().uuid(),
});


export type FetchVisitLogByIdValidator = z.infer<typeof fetchVisitLogByIdSchema>;
export type FetchVisitLogsByPatientValidator = z.infer<typeof fetchVisitLogsByPatientSchema>;
export type FetchVisitLogsByDoctorValidator = z.infer<typeof fetchVisitLogsByDoctorSchema>;
export type CreateVisitLogValidator = z.infer<typeof createVisitLogSchema>;
export type UpdateVisitLogValidator = z.infer<typeof updateVisitLogSchema>;
export type DeleteVisitLogValidator = z.infer<typeof deleteVisitLogSchema>;