export type FieldType = "text" | "select" | "date" | "multiselect" | "textarea";

export type FieldStatus = "pending" | "active" | "confirmed" | "skipped";

export type JobStatus =
  | "idle"
  | "uploading"
  | "parsing"
  | "conversational"
  | "complete"
  | "error";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldState {
  name: string;
  value: string | string[];
  rawValue?: string;
  confidence: number;
  needsValidation: boolean;
  suggestions?: SelectOption[];
  message: string;
  required: boolean;
  status: FieldStatus;
  suggestionId: string;
  fieldType: FieldType;
}

export interface SSEEventData {
  type:
    | "job.started"
    | "progress"
    | "field.detected"
    | "job.done"
    | "error"
    | "connection.established";
  jobId: string;
  timestamp: number;
  message?: string;
  percent?: number;
  field?: string;
  value?: string | string[];
  rawValue?: string;
  confidence?: number;
  needsValidation?: boolean;
  suggestions?: SelectOption[];
  required?: boolean;
  suggestionId?: string;
  fieldType?: FieldType;
  result?: Record<string, FieldState>;
}

export interface SSEWrapper {
  data: SSEEventData | string;
  lastEventId: string;
  origin: string;
  ports: MessagePort[];
  source: MessageEventSource | null;
}

export interface UploadResponse {
  jobId: string;
}

export interface ConfirmFieldBody {
  action: "keep" | "edit" | "skip";
  value?: string | string[];
}
