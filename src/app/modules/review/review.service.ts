import { TReview } from './review.interface';
import { Review } from './review.model';

// create review
const createReview = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

export const reviewServices = {
  createReview,
};
