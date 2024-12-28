import tailwind from "eslint-plugin-tailwindcss";

import baseConfig from "@projects/eslint-config/base";
import reactConfig from "@projects/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  { ignores: [] },
  ...baseConfig,
  ...reactConfig,
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        callees: ["cn", "cva", "tv"],
        config: "../../apps/storybook/tailwind.config.ts",
      },
    },
  },
];