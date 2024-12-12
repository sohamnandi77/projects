import tailwind from "eslint-plugin-tailwindcss";

import baseConfig, { restrictEnvAccess } from "@projects/eslint-config/base";
import drizzleConfig from "@projects/eslint-config/drizzle";
import nextjsConfig from "@projects/eslint-config/next";
import reactConfig from "@projects/eslint-config/react";

// import tailwindConfig from "@projects/eslint-config/tailwind";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...drizzleConfig,
  // ...tailwindConfig,
  ...tailwind.configs["flat/recommended"],
  ...restrictEnvAccess,
];
