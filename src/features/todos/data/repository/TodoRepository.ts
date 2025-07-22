import type {Todo} from "@/features/todos/domain/entities/Todo";
export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: { title: string }): Promise<Todo>;
}
