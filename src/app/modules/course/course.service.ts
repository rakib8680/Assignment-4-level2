import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { queryFunction } from '../../helpers/queryFunction';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { JwtPayload } from 'jsonwebtoken';
import { Category } from '../category/category.model';

// create a course
const createCourse = async (payload: TCourse, courseCreator: JwtPayload) => {
  // check if category exist
  const isCategoryExist = await Category.findById(payload.categoryId);
  if (!isCategoryExist) {
    throw new AppError(404, 'Category not found');
  }

  // make new course object
  const newCourse = {
    ...payload,
    createdBy: courseCreator._id,
  };

  const result = await Course.create(newCourse);
  return result;
};

// get all course
const getAllCourse = async (
  query: Record<string, unknown>,
): Promise<TCourse[]> => {
  const result = await queryFunction(Course.find(), query).populate(
    'createdBy',
  );
  return result;
};

// update course
const updateCourse = async (payload: Partial<TCourse>, id: string) => {
  const { tags, details, ...remainingData } = payload;

  const updatePrimitiveData = await Course.findByIdAndUpdate(
    id,
    remainingData,
    { new: true, runValidators: true },
  );
  if (!updatePrimitiveData) {
    throw new AppError(500, 'Failed to update course');
  }

  //   update tags
  if (tags && tags.length > 0) {
    // delete tags
    const deletedTags = tags
      .filter((tag) => tag.name && tag.isDeleted)
      .map((tag) => tag.name);

    const deletedTagsResult = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          tags: {
            name: {
              $in: deletedTags,
            },
          },
        },
      },
      { new: true, runValidators: true },
    );
    if (!deletedTagsResult) {
      throw new AppError(500, 'Failed to update course');
    }

    // add new tag
    const newTags = tags?.filter((tag) => tag.name && !tag.isDeleted);
    const newTagsResult = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          tags: {
            $each: newTags,
          },
        },
      },
      { new: true, runValidators: true },
    );
    if (!newTagsResult) {
      throw new AppError(500, 'Failed to update course');
    }
  }

  //   update details
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  // final result
  const result = await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  }).populate('createdBy');
  return result;
};

// todo populate createdBy
// get single course with reviews
const getCourseWithReviews = async (id: string) => {
  const result = await Course.aggregate([
    // stage 1
    { $match: { _id: new mongoose.Types.ObjectId(id) } },

    // stage 2
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },

    // stage 3
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },

    // stage 4
    {
      $lookup: {
        from: 'reviews',
        let: { courseId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$courseId', '$$courseId'],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'createdBy',
            },
          },
          {
            $unwind: '$createdBy',
          },
          {
            $project: {
              'createdBy.password': false,
              'createdBy.createdAt': false,
              'createdBy.updatedAt': false,
              'createdBy.__v': false,
            },
          },
        ],
        as: 'reviews',
      },
    },

    // stage 4
    {
      $unwind: '$createdBy',
    },

    // stage 5
    {
      $project: {
        'createdBy.password': false,
        'createdBy.createdAt': false,
        'createdBy.updatedAt': false,
        'createdBy.__v': false,
      },
    },
  ]);

  return result;
};

// get best course according to rating
const getBestCourse = async () => {
  const result = await Course.aggregate([
    // first stage
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    //second stage
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    // third stage
    {
      $unwind: '$createdBy',
    },

    // fourth stage
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },

    // fifth stage
    {
      $sort: {
        averageRating: -1,
        reviewCount: -1,
      },
    },

    // sixth stage
    {
      $limit: 1,
    },

    // seventh stage

    {
      $project: {
        reviews: false,
        'createdBy.password': false,
        'createdBy.createdAt': false,
        'createdBy.updatedAt': false,
        'createdBy.__v': false,
      },
    },
  ]);

  return result;
};

export const courseServices = {
  createCourse,
  getAllCourse,
  updateCourse,
  getCourseWithReviews,
  getBestCourse,
};
