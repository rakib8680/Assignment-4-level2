import { z } from 'zod';

export const categorySchemaValidation = z.object({
  name: z.string(),
});
