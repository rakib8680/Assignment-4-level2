import { Router } from 'express';
import { userControllers } from './user.controller';
import { requestValidation } from '../../middlewares/requestValidation';
import { userSchemaValidation } from './user.validation';

const router = Router();

router.post(
  '/register',
  requestValidation(userSchemaValidation),
  userControllers.registerUser,
);

export const userRoutes = router;
