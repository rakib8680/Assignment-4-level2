import { Router } from 'express';
import { categoryControllers } from './category.controller';

const router = Router();

router.get('/categories', categoryControllers.getAllCategories);
router.post('/categories', categoryControllers.createCategory);

export const categoryRoutes = router;
