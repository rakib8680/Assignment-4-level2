import { Query } from 'mongoose';
import { TQueryObj } from '../types/TQueryObj';

export const filterPriceFunction = <T>(
  modelQuery: Query<T[], T>,
  query: TQueryObj,
) => {
  if (query?.minPrice && query?.maxPrice) {
    const queryObj = {
      $gte: Number(query.minPrice),
      $lte: Number(query.maxPrice),
    };
    const result = modelQuery.find({
      price: queryObj,
    });
    return result;
  }
  return modelQuery;
};
