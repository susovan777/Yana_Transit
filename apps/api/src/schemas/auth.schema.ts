// Path: apps/api/src/schemas/auth.schema.ts
//
// Zod schemas validate the shape of request bodies BEFORE
// they reach controllers. If validation fails, the validate()
// middleware returns a 400 with field-level error messages.

import { z } from 'zod';

// ── POST /api/auth/login ──────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ── POST /api/auth/activate ───────────────────────────────────────────
// Called when an invited user clicks their email link and sets a password.
export const activateAccountSchema = z
  .object({
    token: z
      .string({ required_error: 'Activation token is required' })
      .min(1, 'Activation token is required'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ActivateAccountInput = z.infer<typeof activateAccountSchema>;

// ── POST /api/auth/forgot-password ───────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ── POST /api/auth/reset-password ────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    token: z.string({ required_error: 'Reset token is required' }).min(1),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string({
      required_error: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
