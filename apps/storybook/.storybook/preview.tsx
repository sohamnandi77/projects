import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { I18nProvider } from "@projects/ui";
import { ThemeProvider } from "@projects/ui/theme";

import type { Theme } from "~/constants";
import { DocsContainer } from "~/components/docs-container";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { LOCALS, THEMES } from "~/constants";

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
      toc: {
        contentsSelector: ".sbdocs-content",
        headingSelector: "h3",
        title: "Table of Contents",
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      container: DocsContainer,
      argTypes: {
        sort: "requiredFirst",
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Language",
      description: "Change Language for the application",
      defaultValue: "en-US",
      toolbar: {
        icon: "globe",
        items: LOCALS,
        showName: true,
        dynamicTitle: true,
      },
    },
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
        <ThemeProvider
          attribute="class"
          forcedTheme={context.globals.theme as Theme}
        >
          <ThemeSwitcher theme={context.globals.theme as Theme}>
            <I18nProvider locale={context.globals.locale as string}>
              <Story />
            </I18nProvider>
          </ThemeSwitcher>
        </ThemeProvider>
      );
    },
  ],
  argTypes: {
    className: {
      type: "string",
    },
  },
};

export default preview;
