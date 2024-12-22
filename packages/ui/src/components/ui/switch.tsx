import type { SwitchProps as SwitchPrimitiveProps } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { Switch as SwitchPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

const trackStyles = tv({
  base: [
    "mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent bg-toggle transition duration-200",
    "group-focus:ring-4",
    "group-invalid:ring-danger/20 group-focus:ring-4",
    "group-disabled:cursor-default group-disabled:opacity-50",
  ],
  variants: {
    intent: {
      primary: "group-focus:ring-primary/20 group-selected:bg-primary",
      secondary: "group-focus:ring-muted-fg/20 group-selected:bg-muted-fg",
      success: "group-focus:ring-success/20 group-selected:bg-success",
      danger: "group-focus:ring-danger/20 group-selected:bg-danger",
      warning: "group-focus:ring-warning/20 group-selected:bg-warning",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const switchStyles = tv({
  slots: {
    base: "group inline-flex touch-none items-center lg:text-sm",
    ball: "block size-4 origin-right rounded-full bg-primary-fg shadow transition-all duration-200 group-pressed:w-5 group-selected:ml-3 group-selected:group-data-[pressed]:ml-2 forced-colors:disabled:outline-[GrayText]",
  },
});

const { base, ball } = switchStyles();

interface SwitchProps
  extends SwitchPrimitiveProps,
    VariantProps<typeof trackStyles> {}

const Switch = ({ children, intent, className, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive
      {...props}
      className={(values) =>
        base({
          className:
            typeof className === "function" ? className(values) : className,
        })
      }
      style={{ WebkitTapHighlightColor: "transparent" }}>
      {(values) => (
        <>
          <span className={trackStyles({ intent })}>
            <span className={ball()} />
          </span>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </SwitchPrimitive>
  );
};

export { Switch };
