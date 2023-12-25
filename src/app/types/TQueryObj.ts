export type TQueryObj = {
  [key: string]: unknown;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  tags?: string;
  startDate?: Date;
  endDate?: Date;
  language?: string;
  provider?: string;
  durationInWeeks?: string;
  level?: string;
};
