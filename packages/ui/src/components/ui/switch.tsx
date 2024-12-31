import type { SwitchProps as SwitchPrimitiveProps } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import {
  composeRenderProps,
  Switch as SwitchPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const trackStyles = tv({
  base: [
    "mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent bg-toggle transition duration-200",
    "group-focus:ring-4",
    "group-invalid:ring-danger/20 group-focus:ring-4",
    "group-disabled:cursor-default group-disabled:opacity-50",
  ],
  variants: {
    variant: {
      primary: "group-focus:ring-primary/20 group-selected:bg-primary",
      secondary: "group-focus:ring-muted-fg/20 group-selected:bg-muted-fg",
      success: "group-focus:ring-success/20 group-selected:bg-success",
      danger: "group-focus:ring-danger/20 group-selected:bg-danger",
      warning: "group-focus:ring-warning/20 group-selected:bg-warning",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const switchStyles = tv({
  slots: {
    ball: "block size-4 origin-right rounded-full bg-primary-fg shadow transition-all duration-200 group-pressed:w-5 group-selected:ml-3 group-selected:group-data-[pressed]:ml-2 forced-colors:disabled:outline-[GrayText]",
  },
});

const { ball } = switchStyles();

interface SwitchProps
  extends SwitchPrimitiveProps,
    VariantProps<typeof trackStyles> {}

const Switch = (props: SwitchProps) => {
  const { children, variant = "primary", className, ...rest } = props;
  return (
    <SwitchPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group inline-flex touch-none items-center lg:text-sm",
        className,
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}>
      {composeRenderProps(children, (children) => (
        <>
          <span className={trackStyles({ variant })}>
            <span className={ball()} />
          </span>
          {children}
        </>
      ))}
    </SwitchPrimitive>
  );
};

export { Switch };
