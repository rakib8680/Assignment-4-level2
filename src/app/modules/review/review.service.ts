import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { Course } from '../course/course.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

// create review
const createReview = async (payload: TReview, reviewCreator: JwtPayload) => {
  // check if the course exists before creating a review
  const course = await Course.findById(payload.courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const reviewData = {
    ...payload,
    createdBy: reviewCreator._id,
  };

  const result = (await Review.create(reviewData)).populate('createdBy');

  return result;
};

export const reviewServices = {
  createReview,
};
