import { useTodoViewModel } from "../viewModel/useTodoViewModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useTodoAnimations } from "../viewModel/useTodoAnimation";
import { T } from "@/core/i18/T";
import { todoRepo } from "../..";

const TodoList = () => {
  const {
    todos,
    isLoading,
    deleteTodo,
    toggleTodo,
    updateTodo,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
  } = useTodoViewModel({ repo: todoRepo });
  const { listRef } = useTodoAnimations();

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;
  if (todos.length === 0)
    return (
      <div className="text-muted-foreground text-center">
        {T("noTodos", "todos")}
      </div>
    );

  return (
    <ul className="space-y-3" ref={listRef}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="p-4 rounded-lg bg-muted/50 border shadow-sm flex justify-between items-center gap-2"
        >
          <div className="flex items-center gap-2 w-full">
            <Checkbox
              className="cursor-pointer"
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id, !todo.completed)}
            />
            {editingId === todo.id ? (
              <Input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => {
                  updateTodo(todo.id);
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo(todo.id);
                    setEditingId(null);
                  }
                }}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => {
                  setEditingId(todo.id);
                  setEditingText(todo.title);
                }}
                className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.title}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => deleteTodo(todo.id)}
          >
            <Trash />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
