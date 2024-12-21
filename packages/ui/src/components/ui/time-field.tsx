import type {
  TimeFieldProps as TimeFieldPrimitiveProps,
  TimeValue,
  ValidationResult,
} from "react-aria-components";
import * as React from "react";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { TimeField as TimeFieldPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

import { DateInput } from "./date-field";
import { Description, FieldError, FieldGroup, Label } from "./form";

export interface TimeFieldProps<T extends TimeValue>
  extends TimeFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const timeFieldStyles = tv({
  base: "flex w-fit min-w-28 justify-around whitespace-nowrap p-2 lg:text-sm",
});

const TimeField = <T extends TimeValue>(props: TimeFieldProps<T>) => {
  const {
    prefix,
    suffix,
    label,
    className,
    description,
    errorMessage,
    ...rest
  } = props;
  return (
    <TimeFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix ? <span data-slot="prefix">{prefix}</span> : null}
        <DateInput className={timeFieldStyles} />
        {suffix ? <span data-slot="suffix">{suffix}</span> : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TimeFieldPrimitive>
  );
};

export { TimeField };
