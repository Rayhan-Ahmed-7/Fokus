import {
  Cpu,
  Grid,
  CheckSquare,
  Home,
  Target,
  Layers,
  Factory,
  Shuffle,
  Star,
  Eye,
  Siren,
  Lock,
  ArrowDown,
  Zap,
  Repeat,
  CornerDownRight,
  GitMerge,
  CornerRightDown,
  Gamepad2,
  Search,
  ArrowDownUp,
  ChartNetwork,
  Sprout,
  Pickaxe,
  Network,
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
    defaultOpen: false,
    children: [
      {
        label: "Sorting",
        path: "/algorithms/sorting",
        icon: ArrowDownUp,
        children: [
          {
            label: "Bubble Sort",
            path: "/algorithms/sorting/bubble",
            icon: Repeat,
          },
          {
            label: "Selection Sort",
            path: "/algorithms/sorting/selection",
            icon: ArrowDown,
          },
          {
            label: "Insertion Sort",
            path: "/algorithms/sorting/insertion",
            icon: CornerRightDown,
          },
          {
            label: "Merge Sort",
            path: "/algorithms/sorting/merge",
            icon: GitMerge,
          },
          { label: "Quick Sort", path: "/algorithms/sorting/quick", icon: Zap },
        ],
      },
      {
        label: "Searching",
        path: "/algorithms/searching",
        icon: Search,
        children: [
          {
            label: "Linear Search",
            path: "/algorithms/searching/linear",
            icon: ArrowDown,
          },
          {
            label: "Binary Search",
            path: "/algorithms/searching/binary",
            icon: Zap,
          },
        ],
      },
    ],
  },
  {
    label: "DSA",
    icon: Layers,
    defaultOpen: false,
    children: [
      { label: "Stack", path: "/dsa/stack", icon: Layers },
      { label: "Queue", path: "/dsa/queue", icon: CornerDownRight },
      { label: "Graph", path: "/dsa/graph", icon: ChartNetwork },
    ],
  },
  {
    label: "Design Patterns",
    icon: Target,
    defaultOpen: false,
    children: [
      {
        label: "Creational",
        icon: Pickaxe,
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
        icon: Network,
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
        icon: Sprout,
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
    children: [{ label: "Tic Tac Toe", path: "/games/tictactoe", icon: Grid }],
  },
];
