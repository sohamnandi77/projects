import type {
  FieldErrorProps,
  GroupProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError as FieldErrorPrimitive,
  Group,
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
    fieldError: "text-sm/6 text-danger forced-colors:text-[Mark]",
    // input: [
    //   "w-full min-w-0 bg-transparent px-2.5 py-2 text-base text-fg placeholder-muted-fg outline-none focus:outline-none lg:text-sm [&::-ms-reveal]:hidden",
    // ],
  },
});

const { description, fieldError } = fieldVariants();

interface DescriptionProps extends TextProps {
  isWarning?: boolean;
}

const Description = (props: DescriptionProps) => {
  const { className, ...rest } = props;
  const isWarning = props.isWarning ?? false;
  return (
    <Text
      {...rest}
      slot="description"
      className={description({
        className: isWarning ? "text-warning" : className,
      })}
    />
  );
};

const FieldError = (props: FieldErrorProps) => {
  const { className, ...rest } = props;
  return (
    <FieldErrorPrimitive
      {...rest}
      className={composeTailwindRenderProps(fieldError(), className)}
    />
  );
};

const FieldGroup = (props: GroupProps) => {
  const { className, ...rest } = props;
  return (
    <Group
      {...rest}
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

export { Description, FieldError, FieldGroup, fieldVariants };
export { Form } from "react-aria-components";
export type { FormProps } from "react-aria-components";
export type { FieldProps, FieldErrorProps, LabelProps, DescriptionProps };
