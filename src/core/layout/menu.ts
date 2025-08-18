import {
  Cpu,
  Gamepad2,
  CheckSquare,
  Home,
  Target,
  Layers,
  Factory,
  Shuffle,
  Star,
  Eye,
  MessageCircle,
  Siren,
  Lock,
} from "lucide-react";

export const menuData = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Todos",
    icon: CheckSquare,
    path: "/todos",
  },
  {
    label: "Algorithms",
    icon: Cpu,
    defaultOpen: false, // menu collapsed by default
    children: [
      { label: "Sorting", path: "/algorithms/sorting", icon: Cpu },
      { label: "Searching", path: "/algorithms/searching", icon: Cpu },
    ],
  },
  {
    label: "DSA",
    icon: Layers,
    defaultOpen: false,
    children: [
      { label: "Stack", path: "/dsa/stack", icon: Layers },
      { label: "Queue", path: "/dsa/queue", icon: Layers },
      { label: "Graph", path: "/dsa/graph", icon: Layers },
    ],
  },
  {
    label: "Design Patterns",
    icon: Target,
    defaultOpen: false,
    children: [
      {
        label: "Creational",
        icon: Factory,
        defaultOpen: false,
        children: [
          {
            label: "Singleton",
            path: "/patterns/creational/singleton",
            icon: Lock,
          },
          {
            label: "Factory",
            path: "/patterns/creational/factory",
            icon: Factory,
          },
        ],
      },
      {
        label: "Structural",
        icon: Layers,
        defaultOpen: false,
        children: [
          {
            label: "Adapter",
            path: "/patterns/structural/adapter",
            icon: Shuffle,
          },
          {
            label: "Decorator",
            path: "/patterns/structural/decorator",
            icon: Star,
          },
        ],
      },
      {
        label: "Behavioral",
        icon: MessageCircle,
        defaultOpen: false,
        children: [
          {
            label: "Observer",
            path: "/patterns/behavioral/observer",
            icon: Eye,
          },
          {
            label: "Strategy",
            path: "/patterns/behavioral/strategy",
            icon: Siren,
          },
        ],
      },
    ],
  },
  {
    label: "Games",
    icon: Gamepad2,
    defaultOpen: false,
    children: [
      { label: "Tic Tac Toe", path: "/games/tictactoe", icon: Gamepad2 },
    ],
  },
];
