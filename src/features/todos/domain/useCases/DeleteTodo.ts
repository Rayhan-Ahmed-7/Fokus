import type { TodoRepository } from "../../data/repository/TodoRepository";

export class DeleteTodo {
  private repo: TodoRepository;
  constructor(repo: TodoRepository) {
    this.repo = repo;
  }
  execute(id: string) {
    return this.repo.deleteTodo(id);
  }
}
