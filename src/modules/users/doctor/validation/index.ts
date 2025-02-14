import z from 'zod';

// Schema for fetching a doctor by ID
export const fetchDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

// Schema for fetching a doctor by email
export const fetchDoctorByEmailSchema = z.object({
  email: z.string().email(),
});

// Schema for creating a doctor
export const createDoctorSchema = z.object({
  firstName: z.string().min(3).max(100),
  surname: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  specialization: z.string().min(3).max(100),
  experience: z.number().min(0),
  license_number: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
});

// Schema for updating a doctor
export const updateDoctorSchema = z.object({
  firstName: z.string().min(3).max(100).optional(),
  surname: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  specialization: z.string().min(3).max(100).optional(),
  experience: z.number().min(0).optional(),
  license_number: z.string().min(3).max(100).optional(),
  password: z.string().min(6).max(100).optional(),
});

// Schema for deleting a doctor
export const deleteDoctorSchema = z.object({
  doctor_id: z.string().uuid(),
});

export type FetchDoctorValidator = z.infer<typeof fetchDoctorSchema>;
export type FetchDoctorByEmailValidator = z.infer<typeof fetchDoctorByEmailSchema>;
export type CreateDoctorValidator = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorValidator = z.infer<typeof updateDoctorSchema>;
export type DeleteDoctorValidator = z.infer<typeof deleteDoctorSchema>;

