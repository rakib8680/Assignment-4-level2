import { z } from 'zod';
import { CourseLevel } from './course.constant';

const tagsSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsSchemaValidation = z.object({
  level: z.enum([...CourseLevel] as [string, ...string[]]),
  description: z.string().optional(),
});

const createCourseSchemaValidation = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number().min(0, { message: 'Price Should be a positive number' }),
  tags: z.array(tagsSchemaValidation).optional(),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: detailsSchemaValidation,
});

const updateCourseSchemaValidation = createCourseSchemaValidation.partial();

export const courseValidations = {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
};
