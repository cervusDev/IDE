// src/shared/helpers/pagination.helper.ts

export interface IPaginationParams {
  page?: number;
  limit?: number;
}

export interface IPaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function calculatePagination(params: IPaginationParams) {
  const page = Math.max(params.page && params.page > 0 ? params.page : 1, 1);
  const limit = Math.max(params.limit && params.limit > 0 ? params.limit : 20, 1);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): IPaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    items,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}