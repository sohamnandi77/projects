import type { RadioGroupProps, RadioProps } from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import {
  composeRenderProps,
  RadioGroup as RadioGroupPrimitive,
  Radio as RadioPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const RadioGroup = (props: RadioGroupProps) => {
  const { children, ...rest } = props;
  return (
    <RadioGroupPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-2",
        props.className,
      )}>
      {composeRenderProps(children, (children) => (
        <div className="flex select-none gap-2 group-orientation-horizontal:flex-wrap group-orientation-horizontal:gap-2 group-orientation-vertical:flex-col sm:group-orientation-horizontal:gap-4">
          {children}
        </div>
      ))}
    </RadioGroupPrimitive>
  );
};

const radioStyles = tv({
  base: "size-4 shrink-0 rounded-full border bg-secondary transition",
  variants: {
    isSelected: {
      false: "border-toggle",
      true: "border-[4.5px] border-primary",
    },
    isFocused: {
      true: [
        "border-primary bg-primary/20 ring-4 ring-primary/20",
        "group-invalid:border-danger/70 group-invalid:bg-danger/20 group-invalid:ring-danger/20",
      ],
    },
    isInvalid: {
      true: "border-danger/70 bg-danger/20",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
});

const Radio = (props: RadioProps) => {
  const { children, ...rest } = props;
  return (
    <RadioPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex items-center gap-2 text-sm text-fg transition disabled:text-fg/50 forced-colors:disabled:text-[GrayText]",
        props.className,
      )}>
      {composeRenderProps(children, (children, renderProps) => (
        <div className="flex gap-2">
          <div
            className={radioStyles({
              ...renderProps,
            })}
          />
          <div className="flex flex-col gap-1">{children}</div>
        </div>
      ))}
    </RadioPrimitive>
  );
};

export { Radio, RadioGroup, radioStyles };
