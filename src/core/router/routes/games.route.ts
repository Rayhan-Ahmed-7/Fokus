import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import TicTacToePage from "@/features/games/tictactoe/view/TicTacToePage";

export const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "games",
  staticData: {
    breadcrumb: "games",
  },
});

export const ticTacToeRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: "tictactoe",
  component: TicTacToePage,
  staticData: {
    breadcrumb: "games.tictactoe",
  },
});
