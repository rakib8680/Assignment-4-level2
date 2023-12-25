import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';

// create category
const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
  const result = await categoryServices.createCategory(categoryData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

// get all categories
const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategories();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories,
};
