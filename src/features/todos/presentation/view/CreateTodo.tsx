import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CreateTodo() {

  return (
    <div className="flex gap-2">
      <Input
        value={title}
        placeholder="Add new todo"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        onClick={() => {
          if (title) mutation.mutate({ title });
          setTitle("");
        }}
      >
        Add
      </Button>
    </div>
  );
}
