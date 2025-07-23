import type { Todo } from "@/features/todos/domain/entities/Todo";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: { title: string }): Promise<Todo>;
  updateTodo(id: string, todo: { title: string }): Promise<Todo>;
  updateTodoStatus(id: string, completed: boolean): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}
