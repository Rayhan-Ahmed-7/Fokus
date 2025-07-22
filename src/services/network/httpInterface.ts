export interface HttpRequestConfig {
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
  timeout?: number;
  withCredentials?: boolean;
  // Add more generic options if needed
}
export interface HttpInterface {
  get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T>;
}
