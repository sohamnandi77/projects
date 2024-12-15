import type { VariantProps } from "class-variance-authority";
import type {
  DateFieldProps as AriaDateFieldProps,
  DateInputProps as AriaDateInputProps,
  DateSegmentProps as AriaDateSegmentProps,
  DateValue as AriaDateValue,
  TimeFieldProps as AriaTimeFieldProps,
  TimeValue as AriaTimeValue,
  ValidationResult as AriaValidationResult,
} from "react-aria-components";
import {
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  TimeField as AriaTimeField,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { FieldErrorMessage, fieldGroupVariants } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { cn } from "@projects/ui/lib/utils";

const DateField = AriaDateField;

const TimeField = AriaTimeField;

function DateSegment({ className, ...props }: AriaDateSegmentProps) {
  return (
    <AriaDateSegment
      className={composeRenderProps(className, (className) =>
        cn(
          "inline rounded p-0.5 caret-transparent outline outline-0 type-literal:px-0",
          /* Placeholder */
          "data-[placeholder]:text-muted-fg",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",
          /* Focused */
          "focus:bg-accent focus:text-accent-fg",
          /* Invalid */
          "data-[invalid]:data-[placeholder]:text-danger data-[invalid]:text-danger data-[invalid]:focus:bg-danger data-[invalid]:focus:data-[placeholder]:text-danger-fg data-[invalid]:focus:text-danger-fg",
          className,
        ),
      )}
      {...props}
    />
  );
}

interface DateInputProps
  extends AriaDateInputProps,
    VariantProps<typeof fieldGroupVariants> {}

function DateInput({
  className,
  variant,
  ...props
}: Omit<DateInputProps, "children">) {
  return (
    <AriaDateInput
      className={composeRenderProps(className, (className) =>
        cn(fieldGroupVariants({ variant }), "text-sm", className),
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} />}
    </AriaDateInput>
  );
}

interface JollyDateFieldProps<T extends AriaDateValue>
  extends AriaDateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyDateField<T extends AriaDateValue>({
  label,
  description,
  className,
  errorMessage,
  ...props
}: JollyDateFieldProps<T>) {
  return (
    <DateField
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className),
      )}
      {...props}
    >
      <Label>{label}</Label>
      <DateInput />
      {description && (
        <Text className="text-sm text-muted-fg" slot="description">
          {description}
        </Text>
      )}
      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
    </DateField>
  );
}

interface JollyTimeFieldProps<T extends AriaTimeValue>
  extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyTimeField<T extends AriaTimeValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: JollyTimeFieldProps<T>) {
  return (
    <TimeField
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className),
      )}
      {...props}
    >
      <Label>{label}</Label>
      <DateInput />
      {description && <Text slot="description">{description}</Text>}
      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
    </TimeField>
  );
}

export {
  DateField,
  DateInput,
  DateSegment,
  JollyDateField,
  JollyTimeField,
  TimeField,
};
export type { DateInputProps, JollyDateFieldProps, JollyTimeFieldProps };
