/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  success: boolean;
  message: string;
  errorMessage?: string;
  errorDetails?: any;
  stack?: any;
};
