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
});

export const Review = model<TReview>('Review', reviewSchema);
