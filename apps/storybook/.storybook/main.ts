import type { StorybookConfig } from "@storybook/react-vite";

const excludedProps = new Set([
  "id",
  "slot",
  "onCopy",
  "onCut",
  "onPaste",
  "onCompositionStart",
  "onCompositionEnd",
  "onCompositionUpdate",
  "onSelect",
  "onBeforeInput",
  "onInput",
  "ref",
  "key",
  "style",
]);

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-tag-badges",
    "@storybook/addon-a11y",
    "storybook-addon-rtl",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: (config) => {
    // Add performance configurations
    config.build = {
      ...config.build,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    };
    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: (prop) =>
        !prop.name.startsWith("aria-") && !excludedProps.has(prop.name),
    },
  },
};
export default config;
