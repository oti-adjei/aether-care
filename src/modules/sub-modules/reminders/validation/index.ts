import { z } from 'zod';

export const createReminderSchema = z.object({
  patientId: z.string().uuid(),
  stepId: z.number().int().positive(),
  reminderTime: z.string().datetime(),
  status: z.enum(['pending', 'sent', 'completed']).default('pending'),
});

export const fetchReminderSchema = z.object({
  reminderId: z.number().int().positive(),
});

export const fetchAllRemindersSchema = z.object({});

export const fetchRemindersByPatientSchema = z.object({
  patientId: z.string().uuid(),
});

export const updateReminderSchema = z.object({
  reminderId: z.number().int().positive(),
  status: z.enum(['pending', 'sent', 'completed']),
});

export const deleteReminderSchema = z.object({
  reminderId: z.number().int().positive(),
});

export const restoreReminderSchema = z.object({
  reminderId: z.number().int().positive(),
});


export type CreateReminderValidator = z.infer<typeof createReminderSchema>;
export type FetchReminderValidator = z.infer<typeof fetchReminderSchema>;
export type FetchAllRemindersValidator = z.infer<typeof fetchAllRemindersSchema>;
export type FetchRemindersByPatientValidator = z.infer<typeof fetchRemindersByPatientSchema>;
export type UpdateReminderValidator = z.infer<typeof updateReminderSchema>;
export type DeleteReminderValidator = z.infer<typeof deleteReminderSchema>;
export type RestoreReminderValidator = z.infer<typeof restoreReminderSchema>;