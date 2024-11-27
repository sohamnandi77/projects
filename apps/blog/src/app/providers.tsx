"use client";

import type { ReactChildrenProps } from "@projects/ui/types";
import { ThemeProvider } from "@projects/ui/theme";

import { TRPCReactProvider } from "~/trpc/react";

export default function RootProviders({ children }: ReactChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ThemeProvider>
  );
}
