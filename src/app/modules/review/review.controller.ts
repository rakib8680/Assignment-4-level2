import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

// create review
const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const result = await reviewServices.createReview(reviewData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
};
