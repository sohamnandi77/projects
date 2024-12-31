import type {
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { createContext, use, useMemo } from "react";
import {
  composeRenderProps,
  ToggleButton,
  ToggleButtonGroup,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusButtonStyles } from "@projects/ui/lib/style";

interface ToggleGroupContextProps {
  appearance?: "outline" | "plain" | "solid";
}

const ToggleGroupContext = createContext<ToggleGroupContextProps>({
  appearance: "plain",
});

const getToggleGroupVariants = tv({
  base: ["flex gap-1"],
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
  },
});

const ToggleGroup = (
  props: ToggleButtonGroupProps & ToggleGroupContextProps,
) => {
  const {
    className,
    orientation = "horizontal",
    appearance = "plain",
    ...rest
  } = props;
  const value = useMemo(() => ({ appearance }), [appearance]);
  return (
    <ToggleGroupContext value={value}>
      <ToggleButtonGroup
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          getToggleGroupVariants({
            ...renderProps,
            orientation,
            className,
          }),
        )}
        {...rest}
      />
    </ToggleGroupContext>
  );
};

const getToggleVariants = tv({
  extend: focusButtonStyles,
  base: [
    "relative inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-transparent text-sm font-medium ring-offset-bg transition-colors",
    "enabled:hover:bg-secondary enabled:hover:text-secondary-fg",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-1 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--button-icon]",
  ],
  variants: {
    isDisabled: {
      true: "cursor-default opacity-50 forced-colors:border-[GrayText]",
    },
    appearance: {
      plain: [
        "selected:bg-secondary selected:text-secondary-fg",
        "[--button-icon:theme(colors.secondary.fg/60%)] enabled:hover:[--button-icon:theme(colors.secondary.fg/80%)] selected:[--button-icon:theme(colors.secondary.fg)]",
      ],
      solid: [
        "border-border bg-white text-black enabled:hover:bg-white/95 enabled:hover:text-black selected:border-primary selected:bg-primary selected:text-primary-fg",
        "[--button-icon:theme(colors.black/60%)] enabled:hover:[--button-icon:theme(colors.black/80%)] selected:[--button-icon:theme(colors.white)]",
      ],
      outline: [
        "border-border enabled:hover:bg-secondary/50 enabled:hover:text-secondary-fg selected:bg-secondary selected:text-secondary-fg selected:backdrop-blur-sm",
        "[--button-icon:theme(colors.secondary.fg/60%)] enabled:hover:[--button-icon:theme(colors.secondary.fg/80%)] selected:[--button-icon:theme(colors.secondary.fg)]",
      ],
    },
    size: {
      sm: "h-9 px-3.5",
      md: "h-10 px-4",
      lg: "h-11 px-5",
      icon: "size-9 shrink-0",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    appearance: "plain",
    size: "sm",
    shape: "square",
  },
});

type ToggleProps = ToggleButtonProps & VariantProps<typeof getToggleVariants>;

const Toggle = (props: ToggleProps) => {
  const { className, appearance, ...rest } = props;
  const { appearance: groupAppearance } = use(ToggleGroupContext);
  return (
    <ToggleButton
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        getToggleVariants({
          ...renderProps,
          appearance: appearance ?? groupAppearance,
          size: props.size,
          shape: props.shape,
          className,
        }),
      )}
    />
  );
};

export { ToggleGroup, Toggle };
export type { ToggleProps };
