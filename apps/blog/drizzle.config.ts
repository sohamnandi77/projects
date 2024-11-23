import { type Config } from "drizzle-kit";

import { env } from "~/env";

if (!env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in env");
}

const nonPoolingUrl = env.DATABASE_URL.replace(":6543", ":5432");

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: nonPoolingUrl,
  },
  verbose: true,
  strict: true,
  casing: "snake_case",
  tablesFilter: ["blog_*"],
} satisfies Config;
