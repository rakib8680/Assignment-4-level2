import { Router } from 'express';
import { categoryControllers } from './category.controller';
import { requestValidation } from '../../middlewares/requestValidation';
import { categorySchemaValidation } from './category.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/categories', categoryControllers.getAllCategories);
router.post(
  '/categories',
  auth('admin'),
  requestValidation(categorySchemaValidation),
  categoryControllers.createCategory,
);

export const categoryRoutes = router;
