import path from "path";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...tailwindcssPlugin.configs["flat/recommended"],
    plugins: {
      tailwindcss: tailwindcssPlugin,
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva", "tv"],
        config: path.join(__dirname, "./tailwind.config.ts"),
      },
    },
  },
];
