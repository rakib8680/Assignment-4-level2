import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course id is required'],
  },
  rating: { type: Number, required: [true, 'Rating is required'] },
  review: { type: String },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must be created by a user'],
  },
});

export const Review = model<TReview>('Review', reviewSchema);
