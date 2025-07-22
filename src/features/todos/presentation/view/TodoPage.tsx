import { CreateTodo } from "./CreateTodo";
import TodoList from "./TodoList";

const TodoPage = () => {
    return (
        <div>
            <h1>Todo List</h1>
            <CreateTodo />
            <TodoList />
        </div>
    );
};

export default TodoPage;