import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/register', userControllers.registerUser);

export const userRoutes = router;
