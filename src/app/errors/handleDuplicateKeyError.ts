/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../types/TErrorResponse';

export const handleDuplicateKeyError = (err: any): TErrorResponse => {
  const regex = /"([^"]*)"/;
  const match = err?.message.match(regex);
  const extractedMessage = match
    ? `${match[1]}  already exists`
    : 'Course already exists';

  return {
    success: false,
    message: 'Duplicate Key Error',
    errorMessage: extractedMessage,
  };
};
