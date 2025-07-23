import type { Todo } from "@/features/todos/domain/entities/Todo";

export interface TodoDataSource {
  fetchTodos(): Promise<Todo[]> | Todo[];
  createTodo(todo: { title: string }): Promise<Todo> | Todo;
  updateTodo(id: string, todo: { title: string }): Promise<Todo> | Todo;
  updateTodoStatus(id: string, completed: boolean): Promise<Todo> | Todo;
  deleteTodo(id: string): Promise<void> | void;
}
