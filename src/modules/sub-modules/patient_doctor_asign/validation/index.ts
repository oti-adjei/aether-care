import { z } from 'zod';

// Schema for fetching an assignment by ID
export const FetchPatientDoctorAssignmentByIdSchema = z.object({
  assignment_id: z.string().uuid(),
});

// Schema for fetching all doctors assigned to a patient
export const FetchDoctorsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all patients assigned to a doctor
export const FetchPatientsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating a patient-doctor assignment
export const CreatePatientDoctorAssignmentSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
});

// Schema for deleting a patient-doctor assignment
export const DeletePatientDoctorAssignmentSchema = z.object({
  assignment_id: z.string().uuid(),
});
