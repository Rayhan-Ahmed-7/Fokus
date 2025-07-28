import type { TodoRepository } from "../../data/repository/TodoRepository";

export class GetTodos {
  private repo: TodoRepository;
  constructor(repo: TodoRepository) {
    this.repo = repo;
  }
  execute() {
    return this.repo.getTodos();
  }
}
