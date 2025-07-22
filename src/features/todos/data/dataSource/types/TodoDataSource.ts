import type { Todo } from "@/features/todos/domain/entities/Todo";

export interface TodoDataSource {
  fetchTodos(): Promise<Todo[]> | Todo[];
  createTodo(todo: { title: string }): Promise<Todo> | Todo;
}