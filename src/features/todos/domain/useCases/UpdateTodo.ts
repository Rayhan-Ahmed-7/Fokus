import type { ITodoRepository } from "../../data/repository/ITodoRepository";

export class UpdateTodo {
  private repo: ITodoRepository;
  constructor(repo: ITodoRepository) {
    this.repo = repo;
  }
  execute({ id, title }: { id: string; title: string }) {
    return this.repo.updateTodo(id, { title });
  }
}
