import { Link, Outlet } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { AppState } from "./core/store";
import type { Theme } from "./core/store/types/themeTypes";
import { changeTheme } from "./core/store/slices/themeSlice";
import { Sun, Moon, Monitor } from "lucide-react";

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-4 w-4 mr-2 text-yellow-500" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-4 w-4 mr-2 text-indigo-400" />,
  },
  {
    value: "system",
    label: "System",
    icon: <Monitor className="h-4 w-4 mr-2 text-gray-500" />,
  },
];
function App() {
  const theme = useSelector((state: AppState) => state.theme.current);
  const handleChange = (value: string) => {
    const selected = value as Theme;
    changeTheme(selected);
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between p-4 shadow border-b bg-card">
        <h1 className="text-xl font-semibold">Todo App</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/todos" className="hover:underline">
            Todos
          </Link>
          <Select onValueChange={handleChange} defaultValue={theme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  <div className="flex items-center">
                    {theme.icon}
                    <span>{theme.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
