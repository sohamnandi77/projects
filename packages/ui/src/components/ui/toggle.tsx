import type { VariantProps } from "class-variance-authority";
import type {
  ToggleButtonProps as AriaToggleButtonProps,
  ToggleButtonGroupProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import {
  ToggleButton as AriaToggleButton,
  composeRenderProps,
  ToggleButtonGroup,
} from "react-aria-components";

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
          "border border-stroke-input bg-transparent hover:bg-accent hover:text-accent-foreground",
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

const Toggle = (props: ToggleProps) => {
  const { className, variant, size, ...rest } = props;
  return (
    <AriaToggleButton
      className={composeTailwindRenderProps(
        toggleVariants({ variant, size }),
        className,
      )}
      {...rest}
    />
  );
};

const toggleGroupVariants = cva("flex gap-1", {
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
  },
});

const ToggleGroup = (props: ToggleButtonGroupProps) => {
  const { orientation, className } = props;
  return (
    <ToggleButtonGroup
      orientation={orientation}
      className={composeRenderProps(className, (className, renderProps) => {
        return toggleGroupVariants({
          ...renderProps,
          orientation,
          className,
        });
      })}
      {...props}
    />
  );
};

export { Toggle, ToggleGroup, toggleVariants };
export type { ToggleProps, ToggleButtonGroupProps };
