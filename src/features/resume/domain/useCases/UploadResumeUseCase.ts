import type { IResumeRepository } from "@/features/resume/data/repository/IResumeRepository";
import type { UploadResponse } from "../types/resume.types";

export class UploadResumeUseCase {
  constructor(private repository: IResumeRepository) {}

  async execute(file: File): Promise<UploadResponse> {
    return this.repository.upload(file);
  }
}
