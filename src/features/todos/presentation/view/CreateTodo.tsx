import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodoViewModel } from "../viewModel/useTodoViewModel";
import { T } from "@/core/i18/T";
// import { useTranslation } from "react-i18next";

export function CreateTodo() {
  // const { t } = useTranslation("todos");
  const { title, setTitle, createTodo, isCreating } = useTodoViewModel();
  const handleSubmit = () => {
    if (title.trim()) {
      createTodo({ title });
      setTitle("");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <Input
        className="w-full sm:flex-1"
        value={title}
        placeholder={T("placeholder", "todos")}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button
        disabled={isCreating || !title.trim()}
        onClick={() => {
          if (title.trim()) createTodo({ title });
          setTitle("");
        }}
      >
        {isCreating ? T("adding", "todos") : T("add", "todos")}
      </Button>
    </div>
  );
}
