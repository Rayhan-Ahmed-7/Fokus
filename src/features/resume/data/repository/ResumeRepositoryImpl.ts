import { AxiosAdapter } from "@/services/network/AxiosAdapter";
import type { IResumeRepository } from "./IResumeRepository";
import type {
  UploadResponse,
  SSEEventData,
  SSEWrapper,
  ConfirmFieldBody,
} from "../../domain/types/resume.types";

export class ResumeRepositoryImpl implements IResumeRepository {
  private http = new AxiosAdapter();
  private baseUrl = "/resume";

  async upload(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await this.http.post<{ data: UploadResponse }>(
      `${this.baseUrl}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  }

  stream(
    jobId: string,
    onMessage: (data: SSEEventData) => void,
    onError?: (err: Event) => void
  ): EventSource {
    const apiUrl = "http://localhost:3001";
    const source = new EventSource(`${apiUrl}${this.baseUrl}/stream/${jobId}`);

    source.onmessage = (event: MessageEvent<string>) => {
      try {
        // Parse the outer wrapper
        const outer = JSON.parse(event.data) as SSEWrapper;

        // Extract inner data
        let inner: SSEEventData;

        if (typeof outer.data === "string") {
          // Data is double-stringified
          inner = JSON.parse(outer.data) as SSEEventData;
        } else if (outer.data && typeof outer.data === "object") {
          // Data is already an object
          inner = outer.data as SSEEventData;
        } else {
          // Fallback: treat the whole thing as the event
          inner = outer as unknown as SSEEventData;
        }

        onMessage(inner);
      } catch (err) {
        console.error("Failed to parse SSE data:", event.data, err);
      }
    };

    source.onerror = (err: Event) => {
      if (onError) onError(err);
      source.close();
    };

    return source;
  }

  async confirmField(
    jobId: string,
    fieldName: string,
    body: ConfirmFieldBody
  ): Promise<void> {
    await this.http.patch(
      `${this.baseUrl}/job/${jobId}/field/${fieldName}`,
      body
    );
  }
}
