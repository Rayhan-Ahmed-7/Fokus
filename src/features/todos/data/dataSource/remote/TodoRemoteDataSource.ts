import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { TodoDataSource } from "../types/TodoDataSource";
import type { HttpInterface } from "@/services/network/httpInterface";

export class TodoRemoteDataSource implements TodoDataSource {
  private readonly http: HttpInterface;
  constructor(http: HttpInterface) {
    this.http = http;
  }

  async fetchTodos(): Promise<Todo[]> {
    return this.http.get("/todos");
  }

  async createTodo({ title }: { title: string }): Promise<Todo> {
    return this.http.post("/todos", { title });
  }
}
