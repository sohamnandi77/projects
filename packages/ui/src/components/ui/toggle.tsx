import type { VariantProps } from "class-variance-authority";
import type { ToggleButtonProps as AriaToggleButtonProps } from "react-aria-components";
import { cva } from "class-variance-authority";
import { ToggleButton as AriaToggleButton } from "react-aria-components";

import { composeTailwindRenderProps } from "@projects/ui/lib/utils";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "disabled:pointer-events-none disabled:opacity-50",
    /* Hover */
    "hover:bg-muted hover:text-muted-foreground",
    /* Selected */
    "selected:bg-accent selected:text-accent-foreground",
    /* Focus Visible */
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ToggleProps
  extends AriaToggleButtonProps,
    VariantProps<typeof toggleVariants> {}

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <AriaToggleButton
    className={composeTailwindRenderProps(
      toggleVariants({ variant, size }),
      className,
    )}
    {...props}
  />
);

export { Toggle, toggleVariants };
export type { ToggleProps };
