import type {
  FieldErrorProps,
  GroupProps,
  InputProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult,
} from "react-aria-components";
import * as React from "react";
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  "aria-label"?: TextFieldPrimitiveProps["aria-label"];
  "aria-labelledby"?: TextFieldPrimitiveProps["aria-labelledby"];
}

const fieldVariants = tv({
  slots: {
    description: "text-pretty text-base/6 text-muted-fg sm:text-sm/6",
    label: "w-fit cursor-default text-sm font-medium text-secondary-fg",
    fieldError: "text-sm/6 text-danger forced-colors:text-[Mark]",
    input: [
      "w-full min-w-0 bg-transparent px-2.5 py-2 text-base text-fg placeholder-muted-fg outline-none focus:outline-none lg:text-sm [&::-ms-reveal]:hidden",
    ],
  },
});

const { description, label, fieldError, input } = fieldVariants();

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive {...props} className={label({ className })} />;
};

interface DescriptionProps extends TextProps {
  isWarning?: boolean;
}

const Description = ({ className, ...props }: DescriptionProps) => {
  const isWarning = props.isWarning ?? false;
  return (
    <Text
      {...props}
      slot="description"
      className={description({
        className: isWarning ? "text-warning" : className,
      })}
    />
  );
};

const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return (
    <FieldErrorPrimitive
      {...props}
      className={composeTailwindRenderProps(fieldError(), className)}
    />
  );
};

const FieldGroup = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      {...props}
      className={composeTailwindRenderProps(
        cn([
          "flex items-center rounded-lg border border-input transition duration-200 ease-out",
          "focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/20",
          "focus-within:ring-4 group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20",
          "[&>[role=progressbar]]:mr-2.5",
          "[&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0",
          "[&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg",
          "[&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg",
          "group-disabled:opacity-50",
        ]),
        className,
      )}
    />
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        {...props}
        className={composeTailwindRenderProps(input(), className)}
      />
    );
  },
);

Input.displayName = "Input";

export {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
  fieldVariants,
  type FieldProps,
};

export { Form } from "react-aria-components";
