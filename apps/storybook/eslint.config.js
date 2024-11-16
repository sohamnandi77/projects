import baseConfig, { restrictEnvAccess } from "@projects/eslint-config/base";
import reactConfig from "@projects/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...reactConfig, ...restrictEnvAccess];
