import type { DocsContainerProps } from "@storybook/blocks";
import type { FC, PropsWithChildren } from "react";
import { DocsContainer as BaseContainer } from "@storybook/blocks";
import { themes } from "storybook/internal/theming";

import type { Theme } from "~/constants";
import { useIsDarkTheme } from "./use-is-dark-theme";

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  children,
  context,
}) => {
  const currentTheme = localStorage.getItem("theme") as Theme;
  const { isDark } = useIsDarkTheme(currentTheme);

  return (
    <BaseContainer
      theme={isDark ? themes.dark : themes.light}
      context={context}>
      {children}
    </BaseContainer>
  );
};
