import { AxiosAdapter } from "@/services/network/AxiosAdapter";
import type { IResumeRepository } from "./IResumeRepository";

export class ResumeRepositoryImpl implements IResumeRepository {
  private http = new AxiosAdapter();
  private baseUrl = "/resume";

  async upload(file: File): Promise<{ jobId: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await this.http.post<{ data: { jobId: string } }>(
      `${this.baseUrl}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  }

  stream(
    jobId: string,
    onMessage: (data: unknown) => void,
    onError?: (err: unknown) => void
  ): EventSource {
    const apiUrl = "http://localhost:3001";
    const source = new EventSource(`${apiUrl}${this.baseUrl}/stream/${jobId}`);

    source.onmessage = (event) => {
      try {
        const outer = JSON.parse(event.data);
        const inner =
          typeof outer.data === "string" ? JSON.parse(outer.data) : outer.data;
        onMessage(inner);
      } catch (err) {
        console.error("Failed to parse SSE data:", event.data, err);
      }
    };

    source.onerror = (err) => {
      if (onError) onError(err);
      source.close();
    };

    return source;
  }

  async confirmField(
    jobId: string,
    fieldName: string,
    body: { action: string; value?: unknown }
  ): Promise<void> {
    await this.http.patch(
      `${this.baseUrl}/job/${jobId}/field/${fieldName}`,
      body
    );
  }
}
