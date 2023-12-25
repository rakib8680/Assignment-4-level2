import { ZodError } from 'zod';
import { TErrorResponse } from '../types/TErrorResponse';

export const handleZodError = (err: ZodError): TErrorResponse => {
  const errorMessages = err.issues.map((el) => {
    return el.message;
  });

  const errorMessage = errorMessages.join(', ');

  return {
    success: false,
    message: 'Validation Error',
    errorMessage,
  };
};
