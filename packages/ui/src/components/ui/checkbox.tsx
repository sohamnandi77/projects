import type {
  CheckboxProps as AriaCheckboxProps,
  CheckboxRenderProps,
} from "react-aria-components";
import { Check, Minus } from "lucide-react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import { labelVariants } from "./field";

const CheckboxGroup = AriaCheckboxGroup;

const CheckboxIcon = (props: CheckboxRenderProps) => {
  const { isIndeterminate, isSelected } = props;
  if (isIndeterminate) return <Minus className="size-4" />;
  if (isSelected) return <Check className="size-4" />;
  return null;
};

const Checkbox = (props: AriaCheckboxProps) => {
  const { className, children, ...rest } = props;
  return (
    <AriaCheckbox
      className={composeTailwindRenderProps(
        cn(
          "group/checkbox flex items-center gap-x-2",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-70",
          labelVariants,
          className,
        ),
        className,
      )}
      {...rest}
    >
      {composeRenderProps(children, (children, renderProps) => {
        return (
          <>
            <div
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary text-current ring-offset-background",
                /* Focus Visible */
                "group-data-[focus-visible]/checkbox:outline-none group-data-[focus-visible]/checkbox:ring-2 group-data-[focus-visible]/checkbox:ring-ring group-data-[focus-visible]/checkbox:ring-offset-2",
                /* Selected */
                "group-data-[indeterminate]/checkbox:bg-primary group-data-[selected]/checkbox:bg-primary group-data-[indeterminate]/checkbox:text-primary-foreground group-data-[selected]/checkbox:text-primary-foreground",
                /* Disabled */
                "group-data-[disabled]/checkbox:cursor-not-allowed group-data-[disabled]/checkbox:opacity-50",
                /* Invalid */
                "group-data-[invalid]/checkbox:border-error group-data-[invalid]/checkbox:group-data-[selected]/checkbox:bg-error group-data-[invalid]/checkbox:group-data-[selected]/checkbox:text-error-foreground",
                /* Resets */
                "focus:outline-none focus-visible:outline-none",
              )}
            >
              <CheckboxIcon {...renderProps} />
            </div>
            {children}
          </>
        );
      })}
    </AriaCheckbox>
  );
};

export { Checkbox, CheckboxGroup };
