"use client";

import type {
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import { focusStyles } from "#ui/lib/style";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import {
  composeRenderProps,
  TextArea as TextAreaPrimitive,
  TextField as TextFieldPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, Label } from "./form";

const textareaStyles = tv({
  extend: focusStyles,
  base: "w-full min-w-0 rounded-lg border border-input bg-bg px-2.5 py-2 text-base shadow-sm outline-none transition duration-200 disabled:bg-secondary disabled:opacity-50 sm:text-sm",
});

interface TextareaProps extends TextFieldPrimitiveProps {
  autoSize?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
}

const Textarea = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  ...props
}: TextareaProps) => {
  return (
    <TextFieldPrimitive
      {...props}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <TextAreaPrimitive
        placeholder={placeholder}
        className={composeRenderProps(className, (className, renderProps) =>
          textareaStyles({
            ...renderProps,
            className,
          }),
        )}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  );
};

export { Textarea, type TextareaProps };
