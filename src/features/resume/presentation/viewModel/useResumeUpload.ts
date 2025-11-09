import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { ResumeRepositoryImpl } from "@/features/resume/data/repository/ResumeRepositoryImpl";
import { UploadResumeUseCase } from "@/features/resume/domain/useCases/UploadResumeUseCase";
import { toast } from "@/services/notification/toast";
import type {
  FieldState,
  JobStatus,
  SSEEventData,
} from "../../domain/types/resume.types";

const repo = new ResumeRepositoryImpl();
const uploadResumeUseCase = new UploadResumeUseCase(repo);

interface UseResumeUploadReturn {
  uploadResume: (file: File) => Promise<{ jobId: string }>;
  isUploading: boolean;
  confirmField: (fieldName: string, value: string | string[]) => Promise<void>;
  skipField: (fieldName: string) => Promise<void>;
  reset: () => void;
  fields: FieldState[];
  currentFieldIndex: number;
  jobStatus: JobStatus;
  jobId: string | null;
  fileName: string | null;
}

export const useResumeUpload = (): UseResumeUploadReturn => {
  const [fields, setFields] = useState<FieldState[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(-1);
  const [jobStatus, setJobStatus] = useState<JobStatus>("idle");
  const [jobId, setJobId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const sseRef = useRef<EventSource | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (file: File) => {
      setFileName(file.name);
      setJobStatus("uploading");
      return uploadResumeUseCase.execute(file);
    },
    onSuccess: (res) => {
      setJobId(res.jobId);
      setJobStatus("parsing");
      startStreaming(res.jobId);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Upload failed");
      setJobStatus("error");
    },
  });

  const startStreaming = (jobId: string): void => {
    console.log("🔌 Starting SSE connection for job:", jobId);

    if (sseRef.current) {
      sseRef.current.close();
    }

    sseRef.current = repo.stream(
      jobId,
      (data) => handleSSEEvent(data),
      (err) => {
        console.error("❌ SSE error:", err);
        toast.error("Stream connection lost");
        setJobStatus("error");
      }
    );
  };

  const handleSSEEvent = (data: SSEEventData): void => {
    console.log("📨 SSE Event:", data.type);

    switch (data.type) {
      case "connection.established":
        console.log("✅ Connection confirmed");
        break;

      case "job.started":
        console.log("🎬 Job started");
        setJobStatus("parsing");
        break;

      case "progress":
        console.log("📊 Progress:", data.percent, "%");
        break;

      case "field.detected": {
        console.log(
          "📝 Field detected:",
          data.field,
          "needsValidation:",
          data.needsValidation
        );

        if (!data.field) {
          console.warn("⚠️ Field name missing in event");
          break;
        }

        const fieldState: FieldState = {
          name: data.field,
          value: data.value ?? "",
          rawValue: data.rawValue,
          confidence: data.confidence ?? 0,
          needsValidation: data.needsValidation ?? false,
          suggestions: data.suggestions,
          message: data.message ?? "",
          required: data.required ?? false,
          status: (data.needsValidation ?? false) ? "pending" : "confirmed",
          suggestionId: data.suggestionId ?? `${data.field}-${Date.now()}`,
          fieldType: data.fieldType ?? "text",
        };

        setFields((prev) => {
          const newFields = [...prev, fieldState];

          console.log("📋 Total fields:", newFields.length);

          // Find first field that needs validation
          const firstPendingIndex = newFields.findIndex(
            (f) => f.needsValidation && f.status === "pending"
          );

          console.log("🎯 First pending field index:", firstPendingIndex);

          if (firstPendingIndex !== -1 && currentFieldIndex === -1) {
            console.log(
              "✅ Setting active field to:",
              newFields[firstPendingIndex].name
            );
            setCurrentFieldIndex(firstPendingIndex);
            setJobStatus("conversational");

            // Update that field to active
            newFields[firstPendingIndex] = {
              ...newFields[firstPendingIndex],
              status: "active",
            };
          }

          return newFields;
        });
        break;
      }

      case "job.done":
        console.log("🎉 Job complete!");
        setJobStatus("complete");
        if (sseRef.current) {
          sseRef.current.close();
        }
        break;

      case "error":
        console.error("❌ Job error:", data.message);
        toast.error(data.message || "An error occurred");
        setJobStatus("error");
        if (sseRef.current) {
          sseRef.current.close();
        }
        break;
    }
  };

  const confirmField = async (
    fieldName: string,
    value: string | string[]
  ): Promise<void> => {
    if (!jobId) {
      console.warn("⚠️ No jobId available");
      return;
    }

    console.log("✅ Confirming field:", fieldName, "with value:", value);

    try {
      await repo.confirmField(jobId, fieldName, { action: "keep", value });

      setFields((prev) =>
        prev.map((f) =>
          f.name === fieldName
            ? { ...f, status: "confirmed" as const, value }
            : f
        )
      );

      // Move to next field that needs validation
      const nextIndex = fields.findIndex(
        (f, idx) =>
          idx > currentFieldIndex && f.needsValidation && f.status === "pending"
      );

      console.log("🔍 Next field index:", nextIndex);

      if (nextIndex === -1) {
        console.log("✅ No more fields to validate");

        // Check if all required fields are confirmed
        const allRequiredConfirmed = fields
          .filter((f) => f.required)
          .every((f) => f.status === "confirmed" || f.name === fieldName);

        if (allRequiredConfirmed) {
          console.log("🎉 All required fields confirmed!");
          setJobStatus("complete");
        }
        setCurrentFieldIndex(-1);
      } else {
        console.log("➡️ Moving to next field:", fields[nextIndex].name);
        setCurrentFieldIndex(nextIndex);
        setFields((prev) =>
          prev.map((f, idx) =>
            idx === nextIndex ? { ...f, status: "active" as const } : f
          )
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to confirm field";
      console.error("❌ Failed to confirm field:", err);
      toast.error(message);
    }
  };

  const skipField = async (fieldName: string): Promise<void> => {
    if (!jobId) {
      console.warn("⚠️ No jobId available");
      return;
    }

    console.log("⏭️ Skipping field:", fieldName);

    try {
      await repo.confirmField(jobId, fieldName, { action: "skip" });

      setFields((prev) =>
        prev.map((f) =>
          f.name === fieldName ? { ...f, status: "skipped" as const } : f
        )
      );

      const nextIndex = fields.findIndex(
        (f, idx) =>
          idx > currentFieldIndex && f.needsValidation && f.status === "pending"
      );

      if (nextIndex === -1) {
        const allRequiredConfirmed = fields
          .filter((f) => f.required)
          .every((f) => f.status === "confirmed" || f.status === "skipped");

        if (allRequiredConfirmed) {
          setJobStatus("complete");
        }
        setCurrentFieldIndex(-1);
      } else {
        setCurrentFieldIndex(nextIndex);
        setFields((prev) =>
          prev.map((f, idx) =>
            idx === nextIndex ? { ...f, status: "active" as const } : f
          )
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to skip field";
      console.error("❌ Failed to skip field:", err);
      toast.error(message);
    }
  };

  const reset = (): void => {
    console.log("🔄 Resetting upload state");
    if (sseRef.current) {
      sseRef.current.close();
    }
    setJobStatus("idle");
    setFields([]);
    setCurrentFieldIndex(-1);
    setJobId(null);
    setFileName(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sseRef.current) {
        sseRef.current.close();
      }
    };
  }, []);

  return {
    uploadResume: mutateAsync,
    isUploading: isPending,
    confirmField,
    skipField,
    reset,
    fields,
    currentFieldIndex,
    jobStatus,
    jobId,
    fileName,
  };
};
export type { FieldState };
