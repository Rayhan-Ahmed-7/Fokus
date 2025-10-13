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
  CornerDownRight,
  GitMerge,
  CornerRightDown,
  Gamepad2,
  Search,
  ArrowDownUp,
  ChartNetwork,
  Sprout,
  Pickaxe,
  NetworkIcon,
  BrickWallShield,
  Bubbles,
  HandGrab,
  Pizza,
  KeyRound,
  RocketIcon,
  LockKeyholeOpenIcon,
  UserLockIcon,
} from "lucide-react";

export const menuData = [
  {
    label: "home", // 👈 translation key
    icon: Home,
    path: "/",
  },
  {
    label: "todos",
    icon: CheckSquare,
    path: "/todos",
  },
  {
    label: "algorithms",
    icon: Cpu,
    defaultOpen: false,
    children: [
      {
        label: "algorithms.sorting",
        path: "/algorithms/sorting",
        icon: ArrowDownUp,
        children: [
          {
            label: "algorithms.sorting.bubble",
            path: "/algorithms/sorting/bubble",
            icon: Bubbles,
          },
          {
            label: "algorithms.sorting.selection",
            path: "/algorithms/sorting/selection",
            icon: HandGrab,
          },
          {
            label: "algorithms.sorting.insertion",
            path: "/algorithms/sorting/insertion",
            icon: CornerRightDown,
          },
          {
            label: "algorithms.sorting.merge",
            path: "/algorithms/sorting/merge",
            icon: GitMerge,
          },
          {
            label: "algorithms.sorting.quick",
            path: "/algorithms/sorting/quick",
            icon: Zap,
          },
        ],
      },
      {
        label: "algorithms.searching",
        path: "/algorithms/searching",
        icon: Search,
        children: [
          {
            label: "algorithms.searching.linear",
            path: "/algorithms/searching/linear",
            icon: ArrowDown,
          },
          {
            label: "algorithms.searching.binary",
            path: "/algorithms/searching/binary",
            icon: Zap,
          },
        ],
      },
    ],
  },
  {
    label: "solid",
    icon: RocketIcon,
    defaultOpen: false,
    children: [
      {
        label: "solid.singleResponsibility",
        path: "/solid/single-responsibility",
        icon: UserLockIcon,
      },
      {
        label: "solid.openClosed",
        path: "/solid/open-closed",
        icon: LockKeyholeOpenIcon,
      },
      {
        label: "solid.liskovSubstitution",
        path: "/solid/liskov-substitution",
        icon: Shuffle,
      },
      {
        label: "solid.interfaceSegregation",
        path: "/solid/interface-segregation",
        icon: Layers,
      },
      {
        label: "solid.dependencyInversion",
        path: "/solid/dependency-inversion",
        icon: KeyRound,
      },
    ],
  },
  {
    label: "dsa",
    icon: NetworkIcon,
    defaultOpen: false,
    children: [
      { label: "dsa.stack", path: "/dsa/stack", icon: Layers },
      { label: "dsa.queue", path: "/dsa/queue", icon: CornerDownRight },
      { label: "dsa.graph", path: "/dsa/graph", icon: ChartNetwork },
    ],
  },
  {
    label: "designPatterns",
    icon: Target,
    defaultOpen: false,
    children: [
      {
        label: "designPatterns.creational",
        icon: Pickaxe,
        defaultOpen: false,
        children: [
          {
            label: "designPatterns.creational.singleton",
            path: "/patterns/creational/singleton",
            icon: Lock,
          },
          {
            label: "designPatterns.creational.builder",
            path: "/patterns/creational/builder",
            icon: Pizza,
          },
          {
            label: "designPatterns.creational.factory",
            path: "/patterns/creational/factory",
            icon: Factory,
          },
        ],
      },
      {
        label: "designPatterns.structural",
        icon: BrickWallShield,
        defaultOpen: false,
        children: [
          {
            label: "designPatterns.structural.adapter",
            path: "/patterns/structural/adapter",
            icon: Shuffle,
          },
          {
            label: "designPatterns.structural.decorator",
            path: "/patterns/structural/decorator",
            icon: Star,
          },
        ],
      },
      {
        label: "designPatterns.behavioral",
        icon: Sprout,
        defaultOpen: false,
        children: [
          {
            label: "designPatterns.behavioral.observer",
            path: "/patterns/behavioral/observer",
            icon: Eye,
          },
          {
            label: "designPatterns.behavioral.strategy",
            path: "/patterns/behavioral/strategy",
            icon: Siren,
          },
        ],
      },
    ],
  },
  {
    label: "games",
    icon: Gamepad2,
    defaultOpen: false,
    children: [
      { label: "games.tictactoe", path: "/games/tictactoe", icon: Grid },
    ],
  },
];
