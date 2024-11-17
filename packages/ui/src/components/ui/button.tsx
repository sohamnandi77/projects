import type { VariantProps } from "class-variance-authority";
import type {
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { Button as AriaButton } from "react-aria-components";

import { composeTailwindRenderProps } from "@projects/ui/lib/utils";

const buttonVariants = cva(
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
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
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
    VariantProps<typeof buttonVariants> {
  onClick?: (e: PressEvent) => void;
}

const Button = (props: ButtonProps) => {
  const { className, onPress, onClick, variant, size, ...rest } = props;
  return (
    <AriaButton
      className={composeTailwindRenderProps(
        buttonVariants({ variant, size }),
        className,
      )}
      onPress={onPress ?? onClick}
      {...rest}
    />
  );
};

export { Button, buttonVariants };

export type { ButtonProps };
