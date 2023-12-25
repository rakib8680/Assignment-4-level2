import { Query } from 'mongoose';
import { TQueryObj } from '../types/TQueryObj';
import { filterPriceFunction } from './filteredPriceHelper';
import { filterFunction } from './filterHelper';
import { paginateFunction } from './paginateHelper';
import { sortFunction } from './sortHelper';

export const queryFunction = <T>(
  modelQuery: Query<T[], T>,
  query: TQueryObj,
) => {
  const filteredData = filterFunction(modelQuery, query);
  const paginatedData = paginateFunction(filteredData, query);
  const sortedData = sortFunction(paginatedData, query);
  const filteredPriceData = filterPriceFunction(sortedData, query);

  return filteredPriceData;
};
