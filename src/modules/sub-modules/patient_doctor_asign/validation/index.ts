import { z } from 'zod';

// Schema for fetching an assignment by ID
export const fetchPatientDoctorAssignmentByIdSchema = z.object({
  assignment_id: z.string().uuid(),
});

// Schema for fetching all doctors assigned to a patient
export const fetchDoctorsByPatientSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching all patients assigned to a doctor
export const fetchPatientsByDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for creating a patient-doctor assignment
export const createPatientDoctorAssignmentSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
});

// Schema for deleting a patient-doctor assignment
export const deletePatientDoctorAssignmentSchema = z.object({
  assignment_id: z.string().uuid(),
});


export type FetchPatientDoctorAssignmentByIdValidator = z.infer<typeof fetchPatientDoctorAssignmentByIdSchema>;
export type FetchDoctorsByPatientValidator = z.infer<typeof fetchDoctorsByPatientSchema>;
export type FetchPatientsByDoctorValidator = z.infer<typeof fetchPatientsByDoctorSchema>;
export type CreatePatientDoctorAssignmentValidator = z.infer<typeof createPatientDoctorAssignmentSchema>;
export type DeletePatientDoctorAssignmentValidator = z.infer<typeof deletePatientDoctorAssignmentSchema>;