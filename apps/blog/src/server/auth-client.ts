import {
  anonymousClient,
  multiSessionClient,
  oneTapClient,
  organizationClient,
  passkeyClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "~/env";

export const client = createAuthClient({
  plugins: [
    anonymousClient(),
    organizationClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    }),
    passkeyClient(),
    multiSessionClient(),
  ],
});
