import type { ITodoRepository } from "../../data/repository/ITodoRepository";

export class GetTodos {
  private repo: ITodoRepository;
  constructor(repo: ITodoRepository) {
    this.repo = repo;
  }
  execute() {
    return this.repo.getTodos();
  }
}
