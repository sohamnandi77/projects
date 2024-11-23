import baseConfig, { restrictEnvAccess } from "@projects/eslint-config/base";
import nextjsConfig from "@projects/eslint-config/nextjs";
import reactConfig from "@projects/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
