export type PaginatedResponse<T> = {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
};
