import { useTodoViewModel } from "../viewModel/useTodoViewModel";

const TodoList = () => {
    const { todos, isLoading } = useTodoViewModel();

    if (isLoading) return <div>Loading...</div>;
    if (todos.length === 0) return <div>No todos available</div>;
    return (
        <div>
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="p-2 rounded bg-muted">
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;