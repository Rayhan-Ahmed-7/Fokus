import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import TodoPage from "@/features/todos/presentation/view/TodoPage";
export const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "todos",
  component: TodoPage,
  staticData: {
    breadcrumb: "todos",
  },
});
