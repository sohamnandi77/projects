import type {
  ButtonProps,
  NumberFieldProps as NumberFieldPrimitiveProps,
} from "react-aria-components";
import { useMemo } from "react";
import { cn, createContextFactory } from "#ui/lib/utils";
import {
  Button,
  NumberField as NumberFieldPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { GroupProps } from "./form";
import { FieldGroup, Input } from "./form";

const numberFieldStyles = tv({
  slots: { base: "group flex flex-col gap-y-1.5" },
});

const { base } = numberFieldStyles();

const NumberField = (props: NumberFieldPrimitiveProps) => {
  const { className, ...rest } = props;
  return <NumberFieldPrimitive {...rest} className={base(className)} />;
};

const NumberFieldGroup = (props: GroupProps) => {
  return <FieldGroup {...props} />;
};

interface StepperButtonGroupContextValue {
  orientation: "vertical" | "horizontal";
}

const [StepperButtonGroupContext, useStepperButtonGroupContext] =
  createContextFactory<StepperButtonGroupContextValue | undefined>();

type StepperButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: StepperButtonGroupContextValue["orientation"];
  children:
    | React.ReactNode
    | ((value: StepperButtonGroupContextValue) => React.ReactNode);
};

const StepperButtonGroup = (props: StepperButtonGroupProps) => {
  const { className, children, orientation = "horizontal", ...rest } = props;
  const value = useMemo(() => ({ orientation }), [orientation]);
  return (
    <StepperButtonGroupContext value={value}>
      <div
        className={cn(
          "flex h-full group-disabled:cursor-not-allowed",
          orientation === "vertical"
            ? "flex-col divide-y group-invalid:divide-danger/70 group-focus:divide-primary group-disabled:divide-input/70"
            : "flex-row",
          className,
        )}
        {...rest}>
        {typeof children === "function" ? children({ orientation }) : children}
      </div>
    </StepperButtonGroupContext>
  );
};

interface StepperButtonStyles {
  orientation: "vertical" | "horizontal";
  slot: "increment" | "decrement";
}

const getButtonStyles = (args: StepperButtonStyles): string => {
  const { orientation, slot } = args;

  if (orientation === "vertical") return "border-l px-1";

  return slot === "increment" ? "border-l" : "border-r";
};

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  className?: string;
}

const StepperButton = (props: StepperButtonProps) => {
  const { slot, className, ...rest } = props;
  const context = useStepperButtonGroupContext();

  if (!context) {
    throw new Error("StepperButton must be within StepperButtonGroup");
  }

  const { orientation } = context;

  return (
    <Button
      className={cn([
        "h-full cursor-default px-3 text-muted-fg group-focus-within:border-primary/70 pressed:bg-primary pressed:text-primary-fg forced-colors:border-[Highlight]",
        /* Invalid */
        "group-invalid:border-danger/70 group-invalid:group-focus-within:border-danger/70 group-invalid:forced-colors:border-[Mark]",
        /* Disabled */
        "group-disabled:cursor-not-allowed group-disabled:border-input/70 group-disabled:forced-colors:text-[GrayText]",
        /* Slot */
        getButtonStyles({ orientation, slot }),
        className,
      ])}
      slot={slot}
      {...rest}
    />
  );
};

export {
  NumberField,
  StepperButton,
  StepperButtonGroup,
  Input as NumberFieldInput,
  NumberFieldGroup,
};
