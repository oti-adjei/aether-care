import { z } from 'zod';

// Schema for fetching a patient by ID
export const fetchPatientByIdSchema = z.object({
  patient_id: z.string().uuid(),
});

// Schema for fetching a patient by email
export const fetchPatientByEmailSchema = z.object({
  email: z.string().email(),
});

// Schema for creating a patient
export const createPatientSchema = z.object({
  firstName: z.string().min(3).max(100),
  surname: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Format: YYYY-MM-DD
  gender: z.enum(['male', 'female', 'other']),
  medical_history: z.string().optional(),
  password: z.string().min(6).max(100),
});

// Schema for updating a patient
export const updatePatientSchema = z.object({
  firstName: z.string().min(3).max(100).optional(),
  surname: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  medical_history: z.string().optional(),
  password: z.string().min(6).max(100).optional(),
});

// Schema for deleting a patient
export const deletePatientSchema = z.object({
  patient_id: z.string().uuid(),
});

export type FetchPatientByIdValidator = z.infer<typeof fetchPatientByIdSchema>;
export type FetchPatientByEmailValidator = z.infer<typeof fetchPatientByEmailSchema>;
export type CreatePatientValidator = z.infer<typeof createPatientSchema>;
export type UpdatePatientValidator = z.infer<typeof updatePatientSchema>;
export type DeletePatientValidator = z.infer<typeof deletePatientSchema>;


// export type FetchUserByIdSchema = z.infer<typeof fetchUserByIdSchema>;
// export type FetchUserByEmailSchema = z.infer<typeof fetchUserByEmailSchema>;
// export type CreateUserSchema = z.infer<typeof createUserSchema>;
// export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
// export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
// export type LoginValidator = z.infer<typeof loginValidator>;
// export type SendPhoneNumberOtpValidator = z.infer<typeof sendPhoneNumberOtpValidator>;
// export type VerifyPhoneNumberOtpValidator = z.infer<typeof verifyPhoneNumberOtpValidator>;

