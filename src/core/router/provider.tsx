import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
