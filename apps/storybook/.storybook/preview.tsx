import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { ThemeProvider } from "next-themes";

import type { Theme } from "~/constants";
import { DocsContainer } from "~/components/docs-container";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { THEMES } from "~/constants";

import "~/styles/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    docs: {
      container: DocsContainer,
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Change Theme for the application",
      defaultValue: "system",
      toolbar: {
        icon: "circlehollow",
        items: Object.values(THEMES),
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <ThemeProvider attribute="class" forcedTheme={context?.globals?.theme}>
          <ThemeSwitcher theme={context?.globals?.theme as Theme}>
            <Story />
          </ThemeSwitcher>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
