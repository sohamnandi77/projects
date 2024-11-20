import path from "path";
import optimizeLocales from "@react-aria/optimize-locales-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { LOCALS } from "./src/constants";

const locales = LOCALS.filter((locale) => Boolean(locale.value)).map(
  (locale) => locale.value,
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...optimizeLocales.vite({
        locales,
      }),
      enforce: "pre",
    },
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
