import { describe, it, expect, vi } from "vitest";
import { CreateTodo } from "../CreateTodo";
import type { Todo } from "../../entities/Todo";
import type { ApiResponse } from "@/shared/types/api-response.type";
import type { TodoRepository } from "@/features/todos/data/repository/TodoRepository";

const mockRepo: TodoRepository = {
  getTodos: vi.fn(),
  createTodo: vi.fn().mockResolvedValue({
    data: { id: "1", title: "Test Todo", completed: false },
  } as ApiResponse<Todo>),
  updateTodo: vi.fn(),
  updateTodoStatus: vi.fn(),
  deleteTodo: vi.fn(),
};

describe("CreateTodo Use Case", () => {
  it("should create a new todo with correct title", async () => {
    const useCase = new CreateTodo(mockRepo);
    const result = await useCase.execute({ title: "Test Todo" });

    expect(mockRepo.createTodo).toHaveBeenCalledWith({
      title: "Test Todo",
      completed: false,
    });

    expect(result.data.title).toBe("Test Todo");
  });
});
