import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { queryFunction } from '../../helpers/queryFunction';
import { TCourse } from './course.interface';
import { Course } from './course.model';

// create a course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// get all course
const getAllCourse = async (
  query: Record<string, unknown>,
): Promise<TCourse[]> => {
  const result = await queryFunction(Course.find(), query);
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
  });
  return result;
};

// get single course with reviews \
const getCourseWithReviews = async (id: string) => {
  const result = await Course.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
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

    // second stage
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },

    // third stage
    {
      $sort: {
        averageRating: -1,
        reviewCount: -1,
      },
    },

    // fourth stage
    {
      $limit: 1,
    },

    // fifth stage

    {
      $project: {
        reviews: false,
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
