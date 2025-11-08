import type { IResumeRepository } from "@/features/resume/data/repository/IResumeRepository";

export class UploadResumeUseCase {
  constructor(private repository: IResumeRepository) {}

  async execute(file: File) {
    return this.repository.upload(file);
  }
}
