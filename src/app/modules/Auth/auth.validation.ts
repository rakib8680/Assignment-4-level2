import { z } from 'zod';

const loginValidationSchema = z.object({
  username: z.string({ required_error: 'userName is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

const changePasswordValidationSchema = z.object({
  currentPassword: z.string().min(1, 'currentPassword is required.'),
  newPassword: z.string().min(1, 'currentPassword is required.'),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
