export interface IResumeRepository {
  upload(file: File): Promise<{ jobId: string }>;
  stream(
    jobId: string,
    onMessage: (data: unknown) => void,
    onError?: (err: unknown) => void
  ): EventSource;
  confirmField(
    jobId: string,
    fieldName: string,
    body: { action: string; value?: unknown }
  ): Promise<void>;
}
