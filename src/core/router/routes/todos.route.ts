import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import TodoPage from "@/features/todos/presentation/view/TodoPage";
import { breadcrumbLoader } from "@/core/utils/breadcrumb";
export const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "todos",
  component: TodoPage,
  loader: breadcrumbLoader("todos"),
});
