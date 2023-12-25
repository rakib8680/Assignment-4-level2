import { TCategory } from './category.interface';
import { Category } from './category.model';

// create category
const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

// get all categories
const getAllCategories = async () => {
  const result = await Category.find();

  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
};
