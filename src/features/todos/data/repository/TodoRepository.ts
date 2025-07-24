import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { ApiResponse } from "@/shared/types/api-response.type";
import type { PaginatedResponse } from "@/shared/types/paginated-response.type";

export interface TodoRepository {
  getTodos(): Promise<ApiResponse<PaginatedResponse<Todo>>>;
  createTodo(todo: { title: string, completed: boolean }): Promise<ApiResponse<Todo>>;
  updateTodo(id: string, todo: { title: string }): Promise<ApiResponse<Todo>>;
  updateTodoStatus(id: string, completed: boolean): Promise<ApiResponse<Todo>>;
  deleteTodo(id: string): Promise<ApiResponse<void>>;
}
