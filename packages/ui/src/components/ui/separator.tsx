import type { SeparatorProps } from "react-aria-components";
import { Separator as SeparatorPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

const separatorStyles = tv({
  base: "shrink-0 bg-border forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export function Separator(props: Readonly<SeparatorProps>) {
  const { className, orientation = "horizontal", ...rest } = props;
  return (
    <SeparatorPrimitive
      {...rest}
      className={separatorStyles({ orientation, className })}
    />
  );
}

export type { SeparatorProps };
