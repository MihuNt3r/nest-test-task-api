import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  name: z.string().min(2).max(50),
  password: z.string().min(6).max(100),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
});