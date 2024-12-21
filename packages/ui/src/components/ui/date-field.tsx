import type {
  DateFieldProps as DateFieldPrimitiveProps,
  DateInputProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import {
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, FieldError, FieldGroup, Label } from "./form";

interface DateFieldProps<T extends DateValue>
  extends DateFieldPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const DateField = <T extends DateValue>(props: DateFieldProps<T>) => {
  const {
    prefix,
    suffix,
    label,
    description,
    errorMessage,
    className,
    ...rest
  } = props;
  return (
    <DateFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix ? <span data-slot="prefix">{prefix}</span> : null}
        <DateInput />
        {suffix ? <span data-slot="suffix">{suffix}</span> : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  );
};

const segmentStyles = tv({
  base: "inline shrink-0 rounded p-0.5 tabular-nums tracking-wider text-fg caret-transparent outline outline-0 forced-color-adjust-none type-literal:px-0 sm:uppercase lg:text-sm forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-muted-fg",
    },
    isDisabled: {
      true: "text-fg/50 forced-colors:text-[GrayText]",
    },
    isFocused: {
      true: [
        "bg-primary text-primary-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "invalid:bg-danger invalid:text-danger-fg",
      ],
    },
  },
});

const DateInput = ({
  className,
  ...props
}: Omit<DateInputProps, "children">) => {
  return (
    <DateInputPrimitive
      className={composeTailwindRenderProps(
        "bg-transparent p-2 text-base text-fg placeholder:text-muted-fg lg:text-sm",
        className,
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </DateInputPrimitive>
  );
};

export { DateField, DateInput, segmentStyles, type DateFieldProps };
