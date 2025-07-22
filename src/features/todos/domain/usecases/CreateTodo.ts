import type { TodoRepository } from "@/features/todos/data/repository/TodoRepository";

export class CreateTodo {
  private todoRepo: TodoRepository;

  constructor(todoRepo: TodoRepository) {
    this.todoRepo = todoRepo;
  }

  async execute({ title }: { title: string }) {
    return this.todoRepo.createTodo({ title });
  }
}
