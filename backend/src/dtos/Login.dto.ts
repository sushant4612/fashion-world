import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 6 characters long")
});

export type LoginDto = z.infer<typeof LoginSchema>