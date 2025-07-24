import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { TodoDataSource } from "../types/TodoDataSource";
import type { HttpInterface } from "@/services/network/httpInterface";
import type { ApiResponse } from "@/shared/types/api-response.type";
import type { PaginatedResponse } from "@/shared/types/paginated-response.type";

export class TodoRemoteDataSource implements TodoDataSource {
  private readonly http: HttpInterface;
  constructor(http: HttpInterface) {
    this.http = http;
  }

  async fetchTodos(): Promise<ApiResponse<PaginatedResponse<Todo>>> {
    return this.http.get("/todos");
  }

  async createTodo({ title }: { title: string }): Promise<ApiResponse<Todo>> {
    return this.http.post("/todos/create", { title });
  }

  updateTodo(id: string, { title }: { title: string }): Promise<ApiResponse<Todo>> {
      return this.http.put(`/todos/update/${id}`, { title });
  }

  updateTodoStatus(id: string, completed: boolean): Promise<ApiResponse<Todo>> {
    return this.http.patch(`/todos/update-status/${id}`, { completed });
  }

  deleteTodo(id: string): Promise<ApiResponse<void>> {
    return this.http.delete(`/todos/delete/${id}`);
  }
}
