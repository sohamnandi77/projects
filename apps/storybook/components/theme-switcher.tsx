import type React from "react";

import { Theme } from "~/constants";
import { useIsDarkTheme } from "./useGetTheme";

interface ThemeSwitcherProps {
  children: React.ReactNode;
  theme: Theme;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { children, theme } = props;
  const { isDark } = useIsDarkTheme(theme);

  return <div className={isDark ? "dark" : "light"}>{children}</div>;
};
