export interface PaginatedResponse<T> {
  count: number;
  page: number;
  pageSize: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
