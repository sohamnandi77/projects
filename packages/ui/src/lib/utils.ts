import type { ClassValue } from "class-variance-authority/types";
import { createContext, useContext } from "react";
import { cx } from "class-variance-authority";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(cx(...inputs));

export function composeTailwindRenderProps<T>(
  tw: string | (string | undefined)[],
  className: string | ((v: T) => string) | undefined = "",
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

// editable, circular progress, responsive progressbar, responsive modal, QR Code, Rating Group, Steps
// format number, format byte
// Highlight
// locale
// Presence

export function createContextFactory<ContextData>(options?: {
  defaultValue?: ContextData | null;
  errorMessage?: string;
}) {
  const opts = {
    defaultValue: null,
    errorMessage: "useContext must be used within a Provider",
    ...options,
  };

  const context = createContext<ContextData | null>(opts.defaultValue);

  function useContextFactory(): ContextData {
    const contextValue = useContext(context);
    if (contextValue === null) {
      throw new Error(opts.errorMessage);
    }
    return contextValue;
  }

  return [context.Provider, useContextFactory] as const;
}
