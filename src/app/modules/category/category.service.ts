import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';

// create category
const createCategory = async (
  payload: TCategory,
  categoryCreator: JwtPayload,
) => {
  const newCategory = {
    name: payload.name,
    createdBy: categoryCreator._id,
  };

  const result = await Category.create(newCategory);

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
