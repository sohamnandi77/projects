import type {
  ButtonProps as AriaButtonProps,
  InputProps as AriaInputProps,
  NumberFieldProps as AriaNumberFieldProps,
  ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Input as AriaInput,
  NumberField as AriaNumberField,
  Text,
} from "react-aria-components";

import { Button } from "@projects/ui/button";
import { FieldErrorMessage, FieldGroup } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const NumberField = AriaNumberField;

function NumberFieldInput(props: Readonly<AriaInputProps>) {
  const { className, ...rest } = props;
  return (
    <AriaInput
      className={composeTailwindRenderProps(
        "w-fit min-w-0 flex-1 border-r border-transparent bg-bg pr-2 outline outline-0 placeholder:text-muted-fg [&::-webkit-search-cancel-button]:hidden",
        className,
      )}
      {...rest}
    />
  );
}

function NumberFieldSteppers({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute right-0 flex h-full flex-col border-l",
        className,
      )}
      {...props}
    >
      <NumberFieldStepper slot="increment">
        <ChevronUp aria-hidden className="size-4" />
      </NumberFieldStepper>
      <div className="border-b" />
      <NumberFieldStepper slot="decrement">
        <ChevronDown aria-hidden className="size-4" />
      </NumberFieldStepper>
    </div>
  );
}

function NumberFieldStepper(props: Readonly<AriaButtonProps>) {
  const { className, ...rest } = props;
  return (
    <Button
      className={composeTailwindRenderProps(
        "w-auto grow rounded-none px-0.5 text-muted-fg",
        className,
      )}
      variant={"ghost"}
      size={"icon"}
      {...rest}
    />
  );
}

interface JollyNumberFieldProps extends AriaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyNumberField(props: Readonly<JollyNumberFieldProps>) {
  const { label, description, errorMessage, className, ...rest } = props;
  return (
    <NumberField
      className={composeTailwindRenderProps(
        "group flex flex-col gap-2",
        className,
      )}
      {...rest}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <NumberFieldInput />
        <NumberFieldSteppers />
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-fg" slot="description">
          {description}
        </Text>
      )}
      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
    </NumberField>
  );
}

export {
  JollyNumberField,
  NumberField,
  NumberFieldInput,
  NumberFieldStepper,
  NumberFieldSteppers,
};
export type { JollyNumberFieldProps };
