import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { Theme } from "@/core/store/types/themeTypes";
import { Sun, Moon, Monitor } from "lucide-react";
import { changeTheme } from "@/core/store/slices/themeSlice";
import type { AppState } from "@/core/store";

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

const ThemeSwitcher = () => {
  const theme = useSelector((state: AppState) => state.theme.current);

  const handleChange = (value: string) => {
    const selected = value as Theme;
    changeTheme(selected);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={theme}>
      <SelectTrigger className="w-full">
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
  );
};

export default ThemeSwitcher;
