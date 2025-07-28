export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
  errors: unknown | null;
}
