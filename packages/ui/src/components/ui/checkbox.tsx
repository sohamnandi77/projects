import type { CheckboxGroupProps, CheckboxProps } from "react-aria-components";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { Check, Minus } from "lucide-react";
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, ...rest } = props;
  return (
    <CheckboxGroupPrimitive
      {...rest}
      className={composeTailwindRenderProps("flex flex-col gap-y-2", className)}
    />
  );
};

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm transition",
  variants: {
    isDisabled: {
      true: "opacity-50",
    },
  },
});

const boxStyles = tv({
  base: "flex size-4 shrink-0 items-center justify-center rounded border border-input text-bg transition group-has-[[slot=description]]/checkbox-icon:mt-1 *:data-[slot=icon]:size-3",
  variants: {
    isSelected: {
      true: [
        "border-primary bg-primary text-primary-fg",
        "group-invalid:border-danger/70 group-invalid:bg-danger group-invalid:text-danger-fg",
      ],
    },
    isFocused: {
      true: [
        "border-primary ring-4 ring-primary/20",
        "group-invalid:border-danger/70 group-invalid:text-danger-fg group-invalid:ring-danger/20",
      ],
    },
    isInvalid: {
      true: "border-danger/70 bg-danger/20 text-danger-fg ring-danger/20",
    },
    isDisabled: {
      true: "cursor-not-allowed bg-muted",
    },
  },
});

interface CheckboxIconProps {
  isSelected: boolean;
  isIndeterminate: boolean;
}

const CheckboxIcon = (props: CheckboxIconProps) => {
  const { isSelected, isIndeterminate } = props;
  if (isIndeterminate) return <Minus />;
  if (isSelected) return <Check />;
  return null;
};

const Checkbox = (props: CheckboxProps) => {
  const { className, children } = props;
  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}>
      {composeRenderProps(
        children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <div
            className={cn(
              "group/checkbox-icon flex items-center gap-x-2 has-[[slot=description]]:items-start",
            )}>
            <div
              className={boxStyles({
                ...renderProps,
                isSelected: isSelected || isIndeterminate,
              })}>
              <CheckboxIcon
                isSelected={isSelected}
                isIndeterminate={isIndeterminate}
              />
            </div>
            <div className="flex flex-col gap-1">{children}</div>
          </div>
        ),
      )}
    </CheckboxPrimitive>
  );
};

export type { CheckboxGroupProps, CheckboxProps };
export { Checkbox, CheckboxGroup };
