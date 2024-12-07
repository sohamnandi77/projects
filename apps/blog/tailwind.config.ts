import type { Config } from "tailwindcss";

import baseConfig from "@projects/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/components/**/*.{ts,tsx}",
    "../../packages/editor/src/**/*.{ts,tsx}",
    "./src/**/*.tsx",
  ],
  presets: [baseConfig],
} satisfies Config;
