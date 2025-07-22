import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { type Theme } from "../store/types/themeTypes";
import type { AppState } from "../store";

type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const theme = useSelector((state: AppState) => state.theme.current);

    // No need to initialize theme from localStorage since redux-persist handles it
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    return <>{children}</>;
}