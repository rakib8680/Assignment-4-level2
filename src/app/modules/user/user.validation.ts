import { z } from 'zod';
import { USER_ROLES } from './user.constant';

const isStrongPassword = (password: string) => {
  // Password must be at least 4 characters long
  // Should contain at least one uppercase letter, one lowercase letter, and one digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/.test(password);
};

export const userSchemaValidation = z.object({
  username: z
    .string()
    .min(1, { message: 'Username cannot be less than 1 character' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' })
    .refine((value) => isStrongPassword(value), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    }),
  role: z.enum([...USER_ROLES]),
});
