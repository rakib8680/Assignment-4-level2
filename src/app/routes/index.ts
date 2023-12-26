import { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { courseRoutes } from '../modules/course/course.route';
import { reviewRoutes } from '../modules/review/review.route';
import { AuthRoutes } from '../modules/Auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: courseRoutes,
  },
  {
    path: '/',
    route: categoryRoutes,
  },
  {
    path: '/',
    route: reviewRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
