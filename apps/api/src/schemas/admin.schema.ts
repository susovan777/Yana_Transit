// Path: apps/api/src/schemas/admin.schema.ts

import { z } from 'zod';
import { Role } from '@prisma/client';

// ── POST /api/admin/companies ─────────────────────────────────────────
export const createCompanySchema = z.object({
  name: z
    .string({ required_error: 'Company name is required' })
    .min(2, 'Company name must be at least 2 characters')
    .trim(),
  gstNumber: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
      message: 'Invalid GST number format (e.g. 27AAPFU0939F1ZV)',
    })
    .optional(),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
      message: 'Invalid PAN format (e.g. AAPFU0939F)',
    })
    .optional(),
  email: z.string().email('Invalid email').toLowerCase().trim().optional(),
  phone: z.string().min(10, 'Enter a valid phone number').optional(),
  address: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Invalid pincode')
    .optional(),
  creditLimit: z
    .number()
    .positive('Credit limit must be a positive number')
    .optional(),
  contractStart: z.coerce.date().optional(),
  contractEnd: z.coerce.date().optional(),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

// ── POST /api/admin/users ─────────────────────────────────────────────
// Invite a user to a company. YAANA_ADMIN only.
export const inviteUserSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  role: z.enum([Role.CORPORATE_ADMIN, Role.CORPORATE_USER], {
    required_error: 'Role is required',
    invalid_type_error: 'Role must be CORPORATE_ADMIN or CORPORATE_USER',
  }),
  companyId: z
    .string({ required_error: 'Company is required' })
    .cuid('Invalid company ID'),
  phone: z.string().min(10, 'Enter a valid phone number').optional(),
});

export type InviteUserInput = z.infer<typeof inviteUserSchema>;

// ── PATCH /api/admin/users/:id/status ────────────────────────────────
export const updateUserStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be ACTIVE or INACTIVE',
  }),
});

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;

// ── PATCH /api/admin/companies/:id ───────────────────────────────────
export const updateCompanySchema = createCompanySchema.partial().extend({
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
