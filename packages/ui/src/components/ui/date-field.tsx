import type {
  DateFieldProps,
  DateInputProps,
  DateSegmentProps,
  DateValue,
  TimeFieldProps,
  TimeValue,
} from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import {
  composeRenderProps,
  DateField as DateFieldPrimitive,
  DateInput as DateInputPrimitive,
  DateSegment as DateSegmentPrimitive,
  TimeField as TimeFieldPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { FieldGroup, InputPrefix, InputSuffix } from "./form";

const DateField = <T extends DateValue>(props: DateFieldProps<T>) => {
  const { className, ...rest } = props;
  return (
    <DateFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    />
  );
};

const TimeField = <T extends TimeValue>(props: TimeFieldProps<T>) => {
  const { className, ...rest } = props;
  return (
    <TimeFieldPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    />
  );
};

const DateInput = (props: DateInputProps) => {
  const { className, ...rest } = props;
  return (
    <DateInputPrimitive
      className={composeTailwindRenderProps(
        "bg-transparent p-2 text-base text-fg placeholder:text-muted-fg lg:text-sm",
        className,
      )}
      {...rest}
    />
  );
};

const TimeInput = (props: DateInputProps) => {
  const { className, ...rest } = props;
  return (
    <DateInput
      className={composeTailwindRenderProps(
        "flex w-fit min-w-28 justify-around whitespace-nowrap sm:text-sm",
        className,
      )}
      {...rest}
    />
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

const DateSegment = (props: DateSegmentProps) => {
  const { className, ...rest } = props;
  return (
    <DateSegmentPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        segmentStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

export {
  DateField,
  DateInput,
  FieldGroup as DateFieldGroup,
  InputPrefix as DateInputPrefix,
  InputSuffix as DateInputSuffix,
  DateSegment,
  TimeField,
  TimeInput,
};

export type {
  DateFieldProps,
  DateSegmentProps,
  DateInputProps,
  TimeFieldProps,
};
