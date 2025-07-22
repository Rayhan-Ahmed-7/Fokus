import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodoViewModel } from "../viewModel/useTodoViewModel";

export function CreateTodo() {
  const { title, setTitle, createTodo, isCreating } = useTodoViewModel();

  return (
    <div className="flex gap-2">
      <Input
        value={title}
        placeholder="Add new todo"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        disabled={isCreating}
        onClick={() => {
          if (title) createTodo({ title });
          setTitle("");
        }}
      >
        {isCreating ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}
