import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/features/todos/domain/entities/Todo";
import { TodoRepositoryImpl } from "@/features/todos/data/repository/TodoRepositoryImpl";
import { CreateTodo } from "@/features/todos/domain/usecases/CreateTodo";
import { useState } from "react";
// import { TodoRemoteDataSource } from "../../data/dataSource/remote/TodoRemoteDataSource";
// import { FetchAdapter } from "@/services/network/FetchAdapter";
import { TodoLocalDataSource } from "../../data/dataSource/local/TodoLocalDataSource";

// const repo = new TodoRepositoryImpl(new TodoRemoteDataSource(new FetchAdapter()));
const repo = new TodoRepositoryImpl(new TodoLocalDataSource());
const createTodoUseCase = new CreateTodo(repo);

export const useTodoViewModel = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const todoQuery = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => repo.getTodos(),
  });

  const createMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => createTodoUseCase.execute({ title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
 const deleteTodo = async (id: string) => {
    await repo.deleteTodo(id);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await repo.updateTodoStatus(id, completed);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const updateTodo = async (id: string, newTitle: string) => {
    await repo.updateTodo(id, { title: newTitle });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return {
    title,
    setTitle,
    todos: todoQuery.data || [],
    isLoading: todoQuery.isLoading,
    createTodo: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteTodo,
    toggleTodo,
    updateTodo,
  };
};
