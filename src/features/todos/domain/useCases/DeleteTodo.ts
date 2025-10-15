import type { ITodoRepository } from "../../data/repository/ITodoRepository";

export class DeleteTodo {
  private repo: ITodoRepository;
  constructor(repo: ITodoRepository) {
    this.repo = repo;
  }
  execute(id: string) {
    return this.repo.deleteTodo(id);
  }
}
