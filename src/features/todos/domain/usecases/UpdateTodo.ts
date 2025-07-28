import type { TodoRepository } from "../../data/repository/TodoRepository";

export class UpdateTodo {
  private repo: TodoRepository;
  constructor(repo: TodoRepository) {
    this.repo = repo;
  }
  execute({ id, title }: { id: string; title: string }) {
    return this.repo.updateTodo(id, { title });
  }
}
