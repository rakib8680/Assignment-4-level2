import { Router } from 'express';
import { requestValidation } from '../../middlewares/requestValidation';
import { courseControllers } from './course.controller';
import { courseValidations } from './course.validation';

const router = Router();

router.post(
  '/course',
  requestValidation(courseValidations.createCourseSchemaValidation),
  courseControllers.createCourse,
);

router.get('/courses', courseControllers.getAllCourse);

router.get('/course/best', courseControllers.getBestCourse);

router.put(
  '/courses/:courseId',
  requestValidation(courseValidations.updateCourseSchemaValidation),
  courseControllers.updateCourse,
);

router.get(
  '/courses/:courseId/reviews',
  courseControllers.getCourseWithReviews,
);

export const courseRoutes = router;
