import { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { courseRoutes } from '../modules/course/course.route';
import { reviewRoutes } from '../modules/review/review.route';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/api',
    route: courseRoutes,
  },
  {
    path: '/api',
    route: categoryRoutes,
  },
  {
    path: '/api',
    route: reviewRoutes,
  },
  {
    path: '/auth',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
