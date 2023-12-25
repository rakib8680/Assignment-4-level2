import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Category must be created by a user'],
  },
});

export const Category = model<TCategory>('Category', categorySchema);
