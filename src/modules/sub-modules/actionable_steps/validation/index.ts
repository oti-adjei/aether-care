import { z } from 'zod';

// Schema for fetching an actionable step by ID
export const FetchActionableStepByIdSchema = z.object({
  step_id: z.string().uuid(),
});

// Schema for fetching all actionable steps for a patient
export const FetchActionableStepsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all actionable steps assigned by a doctor
export const FetchActionableStepsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating an actionable step
export const CreateActionableStepSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().datetime().optional(),
  status: z.enum(["pending", "completed", "cancelled"]).default("pending"),
});

// Schema for updating an actionable step
export const UpdateActionableStepSchema = z.object({
  step_id: z.string().uuid(),
  description: z.string().optional(),
  due_date: z.string().datetime().optional(),
  status: z.enum(["pending", "completed", "cancelled"]).optional(),
});

// Schema for deleting an actionable step
export const DeleteActionableStepSchema = z.object({
  step_id: z.string().uuid(),
});
