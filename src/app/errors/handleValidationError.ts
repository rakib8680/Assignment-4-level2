import mongoose from 'mongoose';
import { TErrorResponse } from '../types/TErrorResponse';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorMessages = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return value?.message;
    },
  );

  const errorMessage = errorMessages.join(', ');

  return {
    success: false,
    message: 'Validation Error',
    errorMessage,
  };
};
