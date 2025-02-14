import { z } from 'zod';

// Schema for fetching an admin by ID
export const fetchAdminByIdSchema = z.object({
  admin_id: z.string().uuid(),
});

// Schema for fetching an admin by email
export const fetchAdminByEmailSchema = z.object({
  email: z.string().email(),
});

// Schema for creating an admin
export const createAdminSchema = z.object({
  firstName: z.string().min(3).max(100),
  surname: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6).max(100),
});

// Schema for updating an admin

export const updateAdminIdSchema = z.object({
  admin_id: z.string().uuid(),
});
export const updateAdminSchema = z.object({
  firstName: z.string().min(3).max(100).optional(),
  surname: z.string().min(3).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  password: z.string().min(6).max(100).optional(),
});

// Schema for deleting an admin
export const deleteAdminSchema = z.object({
  admin_id: z.string().uuid(),
});


export type FetchAdminByIdValidator = z.infer<typeof fetchAdminByIdSchema>;
export type FetchAdminByEmailValidator = z.infer<typeof fetchAdminByEmailSchema>;
export type CreateAdminValidator = z.infer<typeof createAdminSchema>;
export type UpdateAdminValidator = z.infer<typeof updateAdminSchema>;
export type DeleteAdminValidator = z.infer<typeof deleteAdminSchema>;

