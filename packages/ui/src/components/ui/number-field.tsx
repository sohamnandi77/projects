import type {
  ButtonProps,
  NumberFieldProps as NumberFieldPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import {
  Button,
  NumberField as NumberFieldPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { useViewport } from "@projects/hooks/use-viewport";

import { Description, FieldError, FieldGroup, Input, Label } from "./form";

const fieldBorderStyles = tv({
  base: "group-focus:border-primary/70 forced-colors:border-[Highlight]",
  variants: {
    isInvalid: {
      true: "group-focus:border-danger/70 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "group-focus:border-input/70",
    },
  },
});

const numberFieldStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5",
    stepperButton:
      "h-10 cursor-default px-3 text-muted-fg pressed:bg-primary pressed:text-primary-fg group-disabled:bg-secondary/70 forced-colors:group-disabled:text-[GrayText]",
  },
});

const { base, stepperButton } = numberFieldStyles();

interface NumberFieldProps extends NumberFieldPrimitiveProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const NumberField = ({
  label,
  placeholder,
  description,
  className,
  errorMessage,
  ...props
}: NumberFieldProps) => {
  const { isMobile } = useViewport();
  return (
    <NumberFieldPrimitive
      {...props}
      className={composeTailwindRenderProps(base(), className)}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="overflow-hidden">
        {(renderProps) => (
          <>
            {isMobile ? (
              <StepperButton slot="decrement" className="border-r" />
            ) : null}
            <Input className="tabular-nums" placeholder={placeholder} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                className: "grid h-10 place-content-center border-s",
              })}>
              {isMobile ? (
                <StepperButton slot="increment" />
              ) : (
                <div className="flex h-full flex-col">
                  <StepperButton
                    slot="increment"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                  <div
                    className={fieldBorderStyles({
                      ...renderProps,
                      className: "border-b border-input",
                    })}
                  />
                  <StepperButton
                    slot="decrement"
                    emblemType="chevron"
                    className="h-5 px-1"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  );
};

interface StepperButtonProps extends ButtonProps {
  slot: "increment" | "decrement";
  emblemType?: "chevron" | "default";
  className?: string;
}

const StepperButton = ({
  slot,
  className,
  emblemType = "default",
  ...props
}: StepperButtonProps) => {
  const icon =
    emblemType === "chevron" ? (
      slot === "increment" ? (
        <ChevronUp className="size-5" />
      ) : (
        <ChevronDown className="size-5" />
      )
    ) : slot === "increment" ? (
      <Plus />
    ) : (
      <Minus />
    );
  return (
    <Button className={stepperButton({ className })} slot={slot} {...props}>
      {icon}
    </Button>
  );
};

export { NumberField };
