import { Router } from 'express';
import { requestValidation } from '../../middlewares/requestValidation';
import { courseControllers } from './course.controller';
import { courseValidations } from './course.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/courses',
  auth('admin'),
  requestValidation(courseValidations.createCourseSchemaValidation),
  courseControllers.createCourse,
);

router.get('/courses', courseControllers.getAllCourse);

router.get('/course/best', courseControllers.getBestCourse);

router.put(
  '/courses/:courseId',
  auth('admin'),
  requestValidation(courseValidations.updateCourseSchemaValidation),
  courseControllers.updateCourse,
);

router.get(
  '/courses/:courseId/reviews',
  courseControllers.getCourseWithReviews,
);

export const courseRoutes = router;
