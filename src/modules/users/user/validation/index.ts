import { z } from 'zod';

export const createUserSchema = z.object({
  first_name: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(6), // Assuming passwords should have a minimum length
  role: z.enum(['doctor', 'patient', 'admin']),
  isVerified: z.boolean().default(false),
});

export const fetchUserSchema = z.object({
  user_id: z.string().uuid(),
});

export const fetchUserByEmailSchema = z.object({
  email: z.string().email(),
});



export const fetchAllUsersSchema = z.object({});

export const updateUserSchema = z.object({
  // user_id: z.string().uuid(),
  first_name: z.string().min(1).max(255).optional(),
  surname: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['doctor', 'patient', 'admin']).optional(),
  isVerified: z.boolean().optional(),
});

export const deleteUserSchema = z.object({
  user_id: z.string().uuid(),
});

export const RestoreUserSchema = z.object({
  user_id: z.string().uuid(),
});


export type CreateUserValidator = z.infer<typeof createUserSchema>;
export type FetchUserValidator = z.infer<typeof fetchUserSchema>;
export type FetchUserByEmailValidator = z.infer<typeof fetchUserByEmailSchema>;
export type FetchAllUsersValidator = z.infer<typeof fetchAllUsersSchema>;
export type UpdateUserValidator = z.infer<typeof updateUserSchema>;
export type DeleteUserValidator = z.infer<typeof deleteUserSchema>;
export type RestoreUserValidator = z.infer<typeof RestoreUserSchema>;