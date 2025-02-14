import { z } from 'zod';

// Schema for fetching an actionable step by ID
export const fetchActionableStepByIdSchema = z.object({
  step_id: z.string().uuid(),
});

// Schema for fetching all actionable steps for a patient
export const fetchActionableStepsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all actionable steps assigned by a doctor
export const fetchActionableStepsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating an actionable step
export const createActionableStepSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().datetime().optional(),
  status: z.enum(["pending", "completed", "cancelled"]).default("pending"),
});

// Schema for updating an actionable step
export const updateActionableStepSchema = z.object({
  step_id: z.string().uuid(),
  description: z.string().optional(),
  due_date: z.string().datetime().optional(),
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
});

// Schema for deleting an actionable step
export const deleteActionableStepSchema = z.object({
  step_id: z.string().uuid(),
});


export type FetchActionableStepByIdValidator = z.infer<typeof fetchActionableStepByIdSchema>;
export type FetchActionableStepsByPatientValidator = z.infer<typeof fetchActionableStepsByPatientSchema>;
export type FetchActionableStepsByDoctorValidator = z.infer<typeof fetchActionableStepsByDoctorSchema>;
export type CreateActionableStepValidator = z.infer<typeof createActionableStepSchema>;
export type UpdateActionableStepValidator = z.infer<typeof updateActionableStepSchema>;
export type DeleteActionableStepValidator = z.infer<typeof deleteActionableStepSchema>;