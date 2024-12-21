import type {
  CheckboxGroupProps as CheckboxGroupPrimitiveProps,
  CheckboxProps as CheckboxPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { Check, Minus } from "lucide-react";
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "./form";

interface CheckboxGroupProps extends CheckboxGroupPrimitiveProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { className, ...rest } = props;
  return (
    <CheckboxGroupPrimitive
      className={composeTailwindRenderProps("flex flex-col gap-y-2", className)}
      {...rest}
    >
      <Label>{props.label}</Label>
      <>{props.children as React.ReactNode}</>
      {props.description && (
        <Description className="block">{props.description}</Description>
      )}
      <FieldError>{props.errorMessage}</FieldError>
    </CheckboxGroupPrimitive>
  );
};

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm transition",
  variants: {
    isDisabled: {
      false: "opacity-100",
      true: "opacity-50",
    },
  },
});

const boxStyles = tv({
  base: "flex size-4 flex-shrink-0 items-center justify-center rounded border text-bg transition [&>[data-slot=icon]]:size-3",
  variants: {
    isSelected: {
      false: "border-toggle bg-secondary",
      true: [
        "border-primary/70 bg-primary text-primary-fg",
        "group-invalid:border-danger/70 group-invalid:bg-danger group-invalid:text-danger-fg",
      ],
    },
    isFocused: {
      true: [
        "border-primary/70 ring-4 ring-primary/20",
        "group-invalid:border-danger/70 group-invalid:text-danger-fg group-invalid:ring-danger/20",
      ],
    },
    isInvalid: {
      true: "border-danger/70 bg-danger/20 text-danger-fg ring-danger/20",
    },
  },
});

interface CheckboxProps extends CheckboxPrimitiveProps {
  description?: string;
  label?: string;
}

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <div
          className={cn(
            "flex gap-x-2",
            props.description ? "items-start" : "items-center",
          )}
        >
          <div
            className={boxStyles({
              ...renderProps,
              isSelected: isSelected || isIndeterminate,
              className: props.description ? "mt-1" : "mt-px",
            })}
          >
            {isIndeterminate ? <Minus /> : isSelected ? <Check /> : null}
          </div>

          <div className="flex flex-col gap-1">
            <>
              {props.label ? (
                <Label>{props.label}</Label>
              ) : (
                (props.children as React.ReactNode)
              )}
              {props.description && (
                <Description>{props.description}</Description>
              )}
            </>
          </div>
        </div>
      )}
    </CheckboxPrimitive>
  );
};

export { Checkbox, CheckboxGroup };
