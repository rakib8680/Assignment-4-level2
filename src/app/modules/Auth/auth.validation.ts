import { z } from 'zod';

const loginValidationSchema = z.object({
  id: z.string({ required_error: 'userName is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const AuthValidation = {
  loginValidationSchema,
};
