"use client";

import type { VariantProps } from "class-variance-authority";
import type {
  FieldErrorProps as AriaFieldErrorProps,
  GroupProps as AriaGroupProps,
  TextProps as AriaTextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Text as AriaText,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

function FormDescription(props: Readonly<AriaTextProps>) {
  const { className, ...rest } = props;
  return (
    <AriaText
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
      slot="description"
    />
  );
}

function FieldError(props: Readonly<AriaFieldErrorProps>) {
  const { className, ...rest } = props;
  return (
    <AriaFieldError
      className={composeTailwindRenderProps(
        "text-destructive text-sm font-medium",
        className,
      )}
      {...rest}
    />
  );
}

const fieldGroupVariants = cva("", {
  variants: {
    variant: {
      default: [
        "relative flex h-10 w-full items-center overflow-hidden rounded-md border border-stoke-input bg-background px-3 py-2 text-sm ring-offset-background",
        /* Focus Within */
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        /* Disabled */
        "disabled:opacity-50",
      ],
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface GroupProps
  extends AriaGroupProps,
    VariantProps<typeof fieldGroupVariants> {}

function FieldGroup({ className, variant, ...props }: GroupProps) {
  return (
    <AriaGroup
      className={composeTailwindRenderProps(
        fieldGroupVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { Form } from "react-aria-components";
export { FieldError, FieldGroup, fieldGroupVariants, FormDescription };
