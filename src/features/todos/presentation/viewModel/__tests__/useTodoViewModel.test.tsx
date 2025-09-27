import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTodoViewModel } from "../useTodoViewModel";
import { type ReactNode } from "react";
import { FakeTodoRepositoryImpl } from "@/features/todos/data/repository/FakeTodoRepositoryImpl";

describe("useTodoViewModel", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  it("should initialize with empty title", () => {
    const { result } = renderHook(
      () => useTodoViewModel({ repo: new FakeTodoRepositoryImpl() }),
      { wrapper }
    );
    expect(result.current.title).toBe("");
  });

  it("should update title when setTitle is called", () => {
    const { result } = renderHook(
      () => useTodoViewModel({ repo: new FakeTodoRepositoryImpl() }),
      { wrapper }
    );

    act(() => {
      result.current.setTitle("My Task");
    });

    expect(result.current.title).toBe("My Task");
  });
});
