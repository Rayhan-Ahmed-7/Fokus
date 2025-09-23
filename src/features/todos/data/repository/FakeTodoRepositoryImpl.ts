import type { TodoRepository } from "./TodoRepository";
import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { ApiResponse } from "@/shared/types/api-response.type";
import type { PaginatedResponse } from "@/shared/types/paginated-response.type";

export class FakeTodoRepositoryImpl implements TodoRepository {
  private todos: Todo[] = [];

  private createApiResponse<T>(
    data: T,
    message = "",
    status = 200
  ): ApiResponse<T> {
    return {
      data,
      message,
      status,
      errors: null,
    };
  }

  async getTodos(): Promise<ApiResponse<PaginatedResponse<Todo>>> {
    return this.createApiResponse(
      {
        count: this.todos.length,
        page: 1,
        pageSize: this.todos.length,
        next: null,
        previous: null,
        results: this.todos,
      },
      "Fetched todos from fake repo"
    );
  }

  async createTodo(todo: {
    title: string;
    completed: boolean;
  }): Promise<ApiResponse<Todo>> {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: todo.title,
      completed: todo.completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return this.createApiResponse(newTodo, "Created todo in fake repo", 201);
  }

  async updateTodo(
    id: string,
    todo: { title: string; completed: boolean }
  ): Promise<ApiResponse<Todo>> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Todo not found");

    this.todos[index] = {
      ...this.todos[index],
      ...todo,
      updatedAt: new Date(),
    };
    return this.createApiResponse(
      this.todos[index],
      "Updated todo in fake repo"
    );
  }

  async updateTodoStatus(
    id: string,
    completed: boolean
  ): Promise<ApiResponse<Todo>> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Todo not found");

    this.todos[index] = {
      ...this.todos[index],
      completed,
      updatedAt: new Date(),
    };
    return this.createApiResponse(
      this.todos[index],
      "Updated todo status in fake repo"
    );
  }

  async deleteTodo(id: string): Promise<ApiResponse<void>> {
    this.todos = this.todos.filter((t) => t.id !== id);
    return this.createApiResponse(undefined, "Deleted todo in fake repo", 204);
  }
}
