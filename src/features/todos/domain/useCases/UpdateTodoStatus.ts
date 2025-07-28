import type { TodoRepository } from "../../data/repository/TodoRepository";

export class UpdateTodoStatus {
  private repo: TodoRepository;
  constructor(repo: TodoRepository) {
    this.repo = repo;
  }
  execute({ id, completed }: { id: string; completed: boolean }) {
    return this.repo.updateTodoStatus(id, completed);
  }
}
