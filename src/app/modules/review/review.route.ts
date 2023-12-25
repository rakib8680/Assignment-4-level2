import { Router } from 'express';
import { reviewControllers } from './review.controller';
import { requestValidation } from '../../middlewares/requestValidation';
import { createReviewSchemaValidation } from './review.validation';

const router = Router();

// create review route
router.post(
  '/reviews',
  requestValidation(createReviewSchemaValidation),
  reviewControllers.createReview,
);

export const reviewRoutes = router;
