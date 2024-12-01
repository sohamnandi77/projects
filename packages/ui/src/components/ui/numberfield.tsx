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
  composeRenderProps,
  Text,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

import { Button } from "./button";
import { FieldError, FieldGroup } from "./form";
import { Label } from "./label";

const NumberField = AriaNumberField;

function NumberFieldInput(props: Readonly<AriaInputProps>) {
  const { className, ...rest } = props;
  return (
    <AriaInput
      className={composeRenderProps(className, (className) =>
        cn(
          "w-fit min-w-0 flex-1 border-r border-transparent bg-background pr-2 outline outline-0 placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
          className,
        ),
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
      className={composeRenderProps(className, (className) =>
        cn("w-auto grow rounded-none px-0.5 text-muted-foreground", className),
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
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className),
      )}
      {...rest}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <NumberFieldInput />
        <NumberFieldSteppers />
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-foreground" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
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
