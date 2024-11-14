import type { ClassValue } from "class-variance-authority/types";
import { cx } from "class-variance-authority";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(cx(...inputs));

export function composeTailwindRenderProps<T>(
  tw: string,
  className: string | ((v: T) => string) | undefined,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

// editable, circular progress, responsive progressbar, responsive modal, QR Code, Rating Group, Steps
// format number, format byte
// Highlight
// locale
// Presence
