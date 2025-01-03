import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  anonymous,
  bearer,
  multiSession,
  oAuthProxy,
  oneTap,
  openAPI,
  organization,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

import { env } from "~/env";
import { db } from "~/server/db";

export const config = {
  trustedOrigins: ["http://app.localhost:3000"],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    anonymous(),
    organization(),
    passkey(),
    bearer(),
    admin(),
    multiSession(),
    oneTap(),
    oAuthProxy(),
    openAPI(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session;
