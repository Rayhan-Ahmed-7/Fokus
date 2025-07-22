import type { Todo } from "../../domain/entities/Todo";
import type { TodoDataSource } from "../dataSource/types/TodoDataSource";
import type { TodoRepository } from "./TodoRepository";

export class TodoRepositoryImpl implements TodoRepository {
  private dataSource: TodoDataSource;
  constructor(dataSource: TodoDataSource) {
    this.dataSource = dataSource;
  }

  async getTodos(): Promise<Todo[]> {
    return this.dataSource.fetchTodos();
  }

  async createTodo(todo: { title: string }): Promise<Todo> {
    return this.dataSource.createTodo(todo);
  }
}
