import { useTranslation } from "react-i18next";
import { CreateTodo } from "./CreateTodo";
import TodoList from "./TodoList";

const TodoPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t("todos:title")}</h1>
      {t("common:currency", { amount: 1234.56 })}
      {t("common:number", { amount: 1234.56, locale: "ar-SA" })}
      <CreateTodo />
      <TodoList />
    </div>
  );
};

export default TodoPage;
