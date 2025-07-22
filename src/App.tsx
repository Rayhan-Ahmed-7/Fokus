import { Link, Outlet } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSelector } from "react-redux";
import type { AppState } from "./core/store";
import type { Theme } from "./core/store/types/themeTypes";
import { changeTheme } from "./core/store/slices/themeSlice";

function App() {
  const theme = useSelector((state: AppState) => state.theme.current);
  const handleChange = (value: string) => {
    const selected = value as Theme
    changeTheme(selected);
  }
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
                <SelectItem key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
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


const themes: Theme[] = ["light", "dark", "system"] // 🔧 adjust according to your Theme type


