import type { ApiResponse } from "@/shared/types/api-response.type";
import type { PaginatedResponse } from "@/shared/types/paginated-response.type";
import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { TodoDataSource } from "../types/TodoDataSource";

const LOCAL_STORAGE_KEY = "todos";

export class TodoLocalDataSource implements TodoDataSource {
  async fetchTodos(): Promise<ApiResponse<PaginatedResponse<Todo>>> {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const todos: Todo[] = raw ? JSON.parse(raw) : [];
    return {
      message: "Todos fetched from local storage",
      status: 200,
      errors: null,
      data: {
        count: todos.length,
        page: 1,
        pageSize: todos.length,
        next: null,
        previous: null,
        results: todos,
      },
    };
  }

  async createTodo({ title }: { title: string }): Promise<ApiResponse<Todo>> {
    const todos = (await this.fetchTodos()).data.results;
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return {
      message: "Todo created locally",
      status: 201,
      errors: null,
      data: newTodo,
    };
  }

  // Similarly wrap updateTodo, updateTodoStatus, deleteTodo with ApiResponse
  async updateTodo(
    id: string,
    { title }: { title: string }
  ): Promise<ApiResponse<Todo>> {
    const todos = (await this.fetchTodos()).data.results;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title, updatedAt: new Date() } : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    const updatedTodo = updatedTodos.find((todo) => todo.id === id)!;
    return {
      message: "Todo updated locally",
      status: 200,
      errors: null,
      data: updatedTodo,
    };
  }

  async updateTodoStatus(
    id: string,
    completed: boolean
  ): Promise<ApiResponse<Todo>> {
    const todos = (await this.fetchTodos()).data.results;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed, updatedAt: new Date() } : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    const updatedTodo = updatedTodos.find((todo) => todo.id === id)!;
    return {
      message: "Todo status updated locally",
      status: 200,
      errors: null,
      data: updatedTodo,
    };
  }

  async deleteTodo(id: string): Promise<ApiResponse<void>> {
    const todos = (await this.fetchTodos()).data.results;
    const filtered = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    return {
      message: "Todo deleted locally",
      status: 204,
      errors: null,
      data: undefined,
    };
  }
}
