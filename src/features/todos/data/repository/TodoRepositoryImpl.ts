import type { ApiResponse } from "@/shared/types/api-response.type";
import type { Todo } from "../../domain/entities/Todo";
import type { TodoDataSource } from "../dataSource/types/TodoDataSource";
import type { TodoRepository } from "./TodoRepository";
import type { PaginatedResponse } from "@/shared/types/paginated-response.type";

export class TodoRepositoryImpl implements TodoRepository {
  private dataSource: TodoDataSource;
  constructor(dataSource: TodoDataSource) {
    this.dataSource = dataSource;
  }

  async getTodos(): Promise<ApiResponse<PaginatedResponse<Todo>>> {
    return this.dataSource.fetchTodos();
  }

  async createTodo(todo: { title: string, completed: boolean }): Promise<ApiResponse<Todo>> {
    return this.dataSource.createTodo(todo);
  }

  async updateTodo(id: string, todo: { title: string, completed: boolean }): Promise<ApiResponse<Todo>> {
    return this.dataSource.updateTodo(id, todo);
  }

  async updateTodoStatus(id: string, completed: boolean): Promise<ApiResponse<Todo>> {
    return this.dataSource.updateTodoStatus(id, completed);
  }

  async deleteTodo(id: string): Promise<ApiResponse<void>> {
    return this.dataSource.deleteTodo(id);
  }
}
