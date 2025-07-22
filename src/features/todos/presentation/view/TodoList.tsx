import { useTodoViewModel } from "../viewModel/useTodoViewModel";

const TodoList = () => {
  const { todos, isLoading } = useTodoViewModel();

  if (isLoading)
    return <div className="text-muted-foreground">Loading...</div>;
  if (todos.length === 0)
    return <div className="text-muted-foreground">No todos available</div>;

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="p-4 rounded-lg bg-muted/50 border shadow-sm"
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
