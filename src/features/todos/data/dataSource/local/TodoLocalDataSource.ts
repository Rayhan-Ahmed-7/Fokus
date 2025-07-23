import type { Todo } from "@/features/todos/domain/entities/Todo";
import type { TodoDataSource } from "../types/TodoDataSource";

const LOCAL_STORAGE_KEY = "todos";

export class TodoLocalDataSource implements TodoDataSource {
  fetchTodos(): Todo[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  createTodo({ title }: { title: string }): Todo {
    const todos = this.fetchTodos();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return newTodo;
  }

   updateTodo(id: string, { title }: { title: string }): Todo {
    const todos = this.fetchTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            title,
            updatedAt: new Date(),
          }
        : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodos.find(todo => todo.id === id)!;
  }

  updateTodoStatus(id: string, completed: boolean): Todo {
    const todos = this.fetchTodos();
    const updatedTodos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed,
            updatedAt: new Date(),
          }
        : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return updatedTodos.find(todo => todo.id === id)!;
  }

  deleteTodo(id: string): void {
    const todos = this.fetchTodos();
    const updated = todos.filter(todo => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
}
