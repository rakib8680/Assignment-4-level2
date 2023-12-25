/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose';
import { TQueryObj } from '../types/TQueryObj';

export const filterFunction = <T>(
  modelQuery: Query<T[], T>,
  query: TQueryObj,
) => {
  const excludeFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
  ];

  const copyQueryObj: any = { ...query };

  if (copyQueryObj.level) {
    copyQueryObj['details.level'] = copyQueryObj.level;
    delete copyQueryObj.level;
  }
  excludeFields.forEach((el) => delete copyQueryObj[el as keyof TQueryObj]);

  const result = modelQuery.find(copyQueryObj);

  return result;
};
