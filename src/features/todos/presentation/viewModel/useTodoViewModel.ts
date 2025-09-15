import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/features/todos/domain/entities/Todo";
import { TodoRepositoryImpl } from "@/features/todos/data/repository/TodoRepositoryImpl";
import { CreateTodo } from "@/features/todos/domain/useCases/CreateTodo";
import { GetTodos } from "@/features/todos/domain/useCases/GetTodos";
import { UpdateTodo } from "@/features/todos/domain/useCases/UpdateTodo";
import { UpdateTodoStatus } from "@/features/todos/domain/useCases/UpdateTodoStatus";
import { DeleteTodo } from "@/features/todos/domain/useCases/DeleteTodo";
import { useState } from "react";
// import { TodoRemoteDataSource } from "../../data/dataSource/remote/TodoRemoteDataSource";
// import { FetchAdapter } from "@/services/network/FetchAdapter";
import { toast } from "@/services/notification/toast";
import { TodoLocalDataSource } from "../../data/dataSource/local/TodoLocalDataSource";

// const repo = new TodoRepositoryImpl(new TodoRemoteDataSource(new FetchAdapter()));
const repo = new TodoRepositoryImpl(new TodoLocalDataSource());
const getTodosUseCase = new GetTodos(repo);
const createTodoUseCase = new CreateTodo(repo);
const updateTodoUseCase = new UpdateTodo(repo);
const updateTodoStatusUseCase = new UpdateTodoStatus(repo);
const deleteTodoUseCase = new DeleteTodo(repo);

export const useTodoViewModel = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodosUseCase.execute(),
  });

  const createMutation = useMutation({
    mutationFn: ({ title }: { title: string }) =>
      createTodoUseCase.execute({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully", 500000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create todo");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      updateTodoUseCase.execute({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTodoStatusUseCase.execute({ id, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.info("Todo status updated successfully", 100000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodoUseCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.warning("Todo deleted successfully");
    },
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
      updateMutation.mutate({
        id: todoId,
        title: editingText.trim(),
      });
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
