import type { DocsContainerProps } from "@storybook/blocks";
import type { FC, PropsWithChildren } from "react";
import { DocsContainer as BaseContainer } from "@storybook/blocks";
import { themes } from "storybook/internal/theming";

import { useIsDarkTheme } from "./use-is-dark-theme";

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({
  children,
  context,
}) => {
  const { isDark } = useIsDarkTheme();

  return (
    <BaseContainer
      theme={isDark ? themes.dark : themes.light}
      context={context}>
      {children}
    </BaseContainer>
  );
};
