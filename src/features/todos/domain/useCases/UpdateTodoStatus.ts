import type { ITodoRepository } from "../../data/repository/ITodoRepository";

export class UpdateTodoStatus {
  private repo: ITodoRepository;
  constructor(repo: ITodoRepository) {
    this.repo = repo;
  }
  execute({ id, completed }: { id: string; completed: boolean }) {
    return this.repo.updateTodoStatus(id, completed);
  }
}
