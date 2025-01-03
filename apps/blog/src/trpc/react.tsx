"use client";

import type { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { isServer, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";

import type { AppRouter } from "~/server/api/root";
import { env } from "~/env";
import { createQueryClient } from "./query-client";

// Declare the singleton variable
let clientQueryClientSingleton: QueryClient | undefined = undefined;

// Separate function to initialize the singleton
function initializeQueryClientSingleton(): QueryClient {
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient();
  }
  return clientQueryClientSingleton;
}

// Modified getQueryClient function
const getQueryClient = () => {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use the initialized singleton
  return initializeQueryClientSingleton();
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/trpc",
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:3000`;
};
