import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/features/todos/domain/entities/Todo";
import { TodoRepositoryImpl } from "@/features/todos/data/repository/TodoRepositoryImpl";
import { CreateTodo } from "@/features/todos/domain/usecases/CreateTodo";
import { useState } from "react";
import { TodoRemoteDataSource } from "../../data/dataSource/remote/TodoRemoteDataSource";
import { FetchAdapter } from "@/services/network/FetchAdapter";
import { toast } from "@/services/notification/toast";
// import { TodoLocalDataSource } from "../../data/dataSource/local/TodoLocalDataSource";

const repo = new TodoRepositoryImpl(new TodoRemoteDataSource(new FetchAdapter()));
// const repo = new TodoRepositoryImpl(new TodoLocalDataSource());
const createTodoUseCase = new CreateTodo(repo);

export const useTodoViewModel = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => repo.getTodos(),
  });

  const createMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => createTodoUseCase.execute({ title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error) => {
      toast.error(error.message || "Failed to create todo", 100000);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      repo.updateTodo(id, { title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      repo.updateTodoStatus(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => repo.deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // Handlers
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const commitEdit = (todoId: string) => {
    if (editingText.trim()) {
      updateMutation.mutate({ id: todoId, title: editingText.trim() });
    }
    setEditingId(null);
    setEditingText("");
  };
  return {
    title,
    setTitle,
    todos: todoQuery.data?.data?.results || [],
    isLoading: todoQuery.isLoading,
    createTodo: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteTodo: deleteMutation.mutate,
    updateTodo: commitEdit,
    toggleTodo: (id: string, completed: boolean) =>
      toggleMutation.mutate({ id, completed }),

    editingId,
    setEditingId,
    editingText,
    setEditingText,
    startEditing,
  };
};
