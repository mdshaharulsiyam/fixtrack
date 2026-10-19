import { Model } from "mongoose";

const escapeRegex = (str: string): string => {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export interface QueryKeys {
  limit?: string;
  page?: string;
  sort?: string;
  order?: string;
  [key: string]: unknown;
}

export interface SearchKeys {
  [key: string]: string;
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface ResponseData<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

const MAX_LIMIT = 100;

const Queries = async <T>(
  collectionModel: Model<T>,
  queryKeys: QueryKeys,
  searchKeys: SearchKeys,
  modelSelect?: string,
): Promise<ResponseData<T>> => {
  const { limit, page, sort, order, ...filters } = queryKeys;
  const query: Record<string, unknown> = {};

  const searchConditions = Object.entries(searchKeys)
    .filter(([, value]) => typeof value === "string" && value.trim())
    .map(([key, value]) => ({
      [key]: { $regex: escapeRegex(value.trim()), $options: "i" },
    }));

  if (searchConditions.length > 0) query.$or = searchConditions;

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query[key] = value;
    }
  });

  const itemsPerPage = Math.min(
    Math.max(parseInt(limit || "10", 10) || 10, 1),
    MAX_LIMIT,
  );
  const currentPage = Math.max(parseInt(page || "1", 10) || 1, 1);
  const sortOrder: Record<string, 1 | -1> = {
    [sort || "createdAt"]: order === "asc" ? 1 : -1,
  };

  let queryExec = collectionModel
    .find(query)
    .sort(sortOrder)
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage);

  if (modelSelect) queryExec = queryExec.select(modelSelect);

  const [result, totalItems] = await Promise.all([
    queryExec.lean<T[]>(),
    collectionModel.countDocuments(query),
  ]);

  return {
    success: true,
    data: result,
    pagination: {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    },
  };
};

export default Queries;
