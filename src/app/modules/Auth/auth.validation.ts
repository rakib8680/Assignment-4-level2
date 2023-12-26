import { z } from 'zod';

const loginValidationSchema = z.object({
  id: z.string({ required_error: 'userName is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

const changePasswordValidationSchema = z.object({
  currentPassword: z.string({ required_error: 'currentPassword is required.' }),
  newPassword: z.string({ required_error: 'newPassword is required' }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
