import type { VariantProps } from "class-variance-authority";
import type {
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Button as AriaButton } from "react-aria-components";

import { composeTailwindRenderProps } from "@projects/ui/lib/utils";

const buttonVariants = {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      error: "bg-error text-error-foreground hover:bg-error/90",
      success: "bg-success text-success-foreground hover:bg-success/90",
      outline:
        "border-stroke-input border bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      icon: "size-10",
      xs: "h-8 rounded-md px-3 text-xs",
      sm: "h-9 rounded-md px-3",
      md: "h-8 px-3 text-sm",
      lg: "h-11 rounded-md px-8",
    },
  },
} as const;

const getButtonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "disabled:pointer-events-none disabled:opacity-50",
    /* Focus Visible */
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        error: "bg-error text-error-foreground hover:bg-error/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        outline:
          "border border-stroke-secondary bg-background hover:bg-accent hover:text-accent-foreground focus:border-stroke-input",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10",
        xs: "h-8 rounded-md px-3 text-xs",
        sm: "h-9 rounded-md px-3",
        md: "h-8 px-3 text-sm",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof getButtonVariants> {
  onClick?: (e: PressEvent) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, onPress, onClick, variant, size, ...rest } = props;
  return (
    <AriaButton
      ref={ref}
      className={composeTailwindRenderProps(
        getButtonVariants({ variant, size }),
        className,
      )}
      onPress={onPress ?? onClick}
      {...rest}
    />
  );
});

export { Button, buttonVariants, getButtonVariants };

export type { ButtonProps };
