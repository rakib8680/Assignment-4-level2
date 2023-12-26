import express from 'express';
import { AuthValidation } from './auth.validation';
import { requestValidation } from '../../middlewares/requestValidation';
import { authControllers } from './auth.controller';
import { userSchemaValidation } from '../user/user.validation';
import { userControllers } from '../user/user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  requestValidation(userSchemaValidation),
  userControllers.registerUser,
);

router.post(
  '/login',
  requestValidation(AuthValidation.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  requestValidation(AuthValidation.changePasswordValidationSchema),
  auth('admin', 'user'),
  // authControllers.changePassword,
);

export const AuthRoutes = router;
