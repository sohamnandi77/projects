import type React from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

import { Theme } from "~/constants";

interface ThemeSwitcherProps {
  children: React.ReactNode;
  theme: Theme;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { children, theme } = props;
  const { setTheme } = useTheme();

  useEffect(() => {
    try {
      setTheme(theme);
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  }, []);

  return <>{children}</>;
};