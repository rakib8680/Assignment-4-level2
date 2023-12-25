import express from 'express';
import { AuthValidation } from './auth.validation';
import { requestValidation } from '../../middlewares/requestValidation';
import { authControllers } from './auth.controller';


const router = express.Router();

router.post(
  '/login',
  requestValidation(AuthValidation.loginValidationSchema),
  authControllers.loginUser,
);


export const AuthRoutes = router;
