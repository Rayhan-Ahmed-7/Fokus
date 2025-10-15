import type { ITodoRepository } from "@/features/todos/data/repository/ITodoRepository";

export class CreateTodo {
  private todoRepo: ITodoRepository;

  constructor(todoRepo: ITodoRepository) {
    this.todoRepo = todoRepo;
  }

  async execute({ title }: { title: string }) {
    return this.todoRepo.createTodo({ title, completed: false });
  }
}
