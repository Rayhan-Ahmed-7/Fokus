import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { HttpInterface, HttpRequestConfig } from "./httpInterface";

export class AxiosAdapter implements HttpInterface {
  private axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
  });

  private transformConfig(config?: HttpRequestConfig): AxiosRequestConfig {
    return {
      headers: config?.headers,
      params: config?.queryParams,
      timeout: config?.timeout,
      withCredentials: config?.withCredentials,
    };
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const res = await this.axiosInstance.get<T>(url, this.transformConfig(config));
    return res.data;
  }

  async post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    const res = await this.axiosInstance.post<T>(url, data, this.transformConfig(config));
    return res.data;
  }

  async put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    const res = await this.axiosInstance.put<T>(url, data, this.transformConfig(config));
    return res.data;
  }

  async patch<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    const res = await this.axiosInstance.patch<T>(url, data, this.transformConfig(config));
    return res.data;
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const res = await this.axiosInstance.delete<T>(url, this.transformConfig(config));
    return res.data;
  }
}
