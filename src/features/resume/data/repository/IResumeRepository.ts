import type {
  UploadResponse,
  SSEEventData,
  ConfirmFieldBody,
} from "../../domain/types/resume.types";

export interface IResumeRepository {
  upload(file: File): Promise<UploadResponse>;
  stream(
    jobId: string,
    onMessage: (data: SSEEventData) => void,
    onError?: (err: Event) => void
  ): EventSource;
  confirmField(
    jobId: string,
    fieldName: string,
    body: ConfirmFieldBody
  ): Promise<void>;
}
