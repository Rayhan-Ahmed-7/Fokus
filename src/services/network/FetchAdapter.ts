import type { HttpInterface, HttpRequestConfig } from "./httpInterface";

export class FetchAdapter implements HttpInterface {
  private baseURL = "http://localhost:3001";

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    const query = config?.queryParams
      ? "?" +
        new URLSearchParams(
          config.queryParams as Record<string, string>
        ).toString()
      : "";

    const controller = new AbortController();
    const timeout = config?.timeout;

    if (timeout) {
      setTimeout(() => controller.abort(), timeout);
    }

    try {
      const response = await fetch(this.baseURL + url + query, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        credentials: config?.withCredentials ? "include" : "same-origin",
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timed out after ${timeout}ms`);
      }
      throw error;
    }
  }

  get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.request("GET", url, undefined, config);
  }

  post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    return this.request("POST", url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    return this.request("PUT", url, data, config);
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    return this.request("PATCH", url, data, config);
  }

  delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return this.request("DELETE", url, undefined, config);
  }
}
