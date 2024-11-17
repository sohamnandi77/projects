import type { Preview } from "@storybook/react";

import "@projects/tailwind-config/web-styles";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
