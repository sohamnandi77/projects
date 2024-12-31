import { useEffect } from "react";

import { useLocalStorage } from "@projects/hooks/use-local-storage";
import { useTheme } from "@projects/ui/theme";

import type { Theme } from "~/constants";
import { THEMES } from "~/constants";

export const useIsDarkTheme = () => {
  const [theme] = useLocalStorage<Theme>("theme", THEMES.SYSTEM);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
    return () => {
      setTheme(THEMES.SYSTEM);
    };
  }, [setTheme, theme]);

  const isDark =
    theme === THEMES.SYSTEM
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === THEMES.DARK;

  return { isDark };
};
