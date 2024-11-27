import baseConfig, { restrictEnvAccess } from "@projects/eslint-config/base";
import drizzleConfig from "@projects/eslint-config/drizzle";
import nextjsConfig from "@projects/eslint-config/next";
import reactConfig from "@projects/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...drizzleConfig,
  ...restrictEnvAccess,
];
