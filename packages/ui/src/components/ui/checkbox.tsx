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

import { labelVariants } from "@projects/ui/label";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

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
                "flex size-4 shrink-0 items-center justify-center rounded-sm border border-stroke-secondary text-current ring-offset-bg",
                /* Focus Visible */
                "group-focus-visible/checkbox:outline-none group-focus-visible/checkbox:ring-2 group-focus-visible/checkbox:ring-ring group-focus-visible/checkbox:ring-offset-2",
                /* Selected */
                "group-indeterminate/checkbox:bg-primary group-indeterminate/checkbox:text-primary-fg group-selected/checkbox:bg-primary group-selected/checkbox:text-primary-fg",
                /* Disabled */
                "group-disabled/checkbox:cursor-not-allowed group-disabled/checkbox:opacity-50",
                /* Invalid */
                "group-invalid/checkbox:border-danger group-invalid/checkbox:group-selected/checkbox:bg-danger group-invalid/checkbox:group-selected/checkbox:text-danger-fg",
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
