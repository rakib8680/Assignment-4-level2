import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';

// create course
const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  const result = await courseServices.createCourse(courseData, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

// get all course
const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseServices.getAllCourse(query);

  const meta: Record<string, unknown> = {
    page: query?.page || 1,
    limit: query?.limit || 10,
    total: result.length,
  };

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta,
    data: {
      courses: result,
    },
  });
});

// update course
const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updateCourse(req.body, courseId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

// get single course with reviews
const getCourseWithReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const course = await courseServices.getCourseWithReviews(courseId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: { course: course[0] },
  });
});

// get best course
const getBestCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourse();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: { course: result[0] },
  });
});

export const courseControllers = {
  createCourse,
  getAllCourse,
  updateCourse,
  getCourseWithReviews,
  getBestCourse,
};
