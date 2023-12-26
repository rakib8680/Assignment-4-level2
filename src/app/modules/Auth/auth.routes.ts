import express from 'express';
import { AuthValidation } from './auth.validation';
import { requestValidation } from '../../middlewares/requestValidation';
import { authControllers } from './auth.controller';
import { userSchemaValidation } from '../user/user.validation';
import { userControllers } from '../user/user.controller';


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


export const AuthRoutes = router;
