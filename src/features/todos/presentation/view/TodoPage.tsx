import { CreateTodo } from "./CreateTodo";
import TodoList from "./TodoList";

const TodoPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <CreateTodo />
      <TodoList />
    </div>
  );
};

export default TodoPage;
