import { useTranslation } from "react-i18next";
import { CreateTodo } from "./CreateTodo";
import TodoList from "./TodoList";

const TodoPage = () => {
  const { t } = useTranslation("todos");
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <CreateTodo />
      <TodoList />
    </div>
  );
};

export default TodoPage;
