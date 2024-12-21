import type { SeparatorProps } from "react-aria-components";
import { Separator as SeparatorPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

const separatorStyles = tv({
  base: "shrink-0 bg-border forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      {...props}
      className={separatorStyles({
        orientation: props.orientation,
        className: className,
      })}
    />
  );
}

export type { SeparatorProps };
