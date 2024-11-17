import type { VariantProps } from "class-variance-authority";
import type {
  FieldErrorProps as AriaFieldErrorProps,
  GroupProps as AriaGroupProps,
  LabelProps as AriaLabelProps,
  TextProps as AriaTextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Label as AriaLabel,
  Text as AriaText,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const labelVariants = cva([
  "text-sm font-medium leading-none",
  /* Disabled */
  "disabled:cursor-not-allowed disabled:opacity-70",
  /* Invalid */
  "group-data-[invalid]:text-error",
]);

const Label = ({ className, ...props }: AriaLabelProps) => (
  <AriaLabel className={cn(labelVariants(), className)} {...props} />
);

function FormDescription({ className, ...props }: AriaTextProps) {
  return (
    <AriaText
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
      slot="description"
    />
  );
}

function FieldError({ className, ...props }: AriaFieldErrorProps) {
  return (
    <AriaFieldError
      className={cn("text-error text-sm font-medium", className)}
      {...props}
    />
  );
}

const fieldGroupVariants = cva("", {
  variants: {
    variant: {
      default: [
        "relative flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
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

export {
  FieldError,
  FieldGroup,
  fieldGroupVariants,
  FormDescription,
  Label,
  labelVariants,
};
