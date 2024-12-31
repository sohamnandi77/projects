import type {
  InputProps,
  TextAreaProps,
  TextFieldProps,
} from "react-aria-components";
import { focusStyles } from "#ui/lib/style";
import {
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import type { GroupProps } from "./form";
import { FieldGroup, Input, InputPrefix, InputSuffix } from "./form";

const TextField = (props: TextFieldProps) => {
  const { className, ...rest } = props;
  return (
    <AriaTextField
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
      {...rest}
    />
  );
};

const TextFieldGroup = (props: GroupProps) => {
  const { className, ...rest } = props;
  return (
    <FieldGroup
      {...rest}
      className={composeTailwindRenderProps(
        cn(
          /* Button */
          "[&_button]:size-7 [&_button]:shrink-0 [&_button]:p-0",
          /* Prefix */
          "[&>[data-slot=prefix]>button]:data-focus-visible:outline-1 [&>[data-slot=prefix]>button]:data-focus-visible:outline-offset-1 [&>[data-slot=prefix]>button]:mr-[calc(var(--spacing)*-1.15)] [&>[data-slot=prefix]>button]:rounded-md",
          /* Suffix */
          "[&>[data-slot=suffix]>button]:mr-[calc(var(--spacing)*-1.15)] [&>[data-slot=suffix]>button]:rounded-md [&>[data-slot=suffix]>button]:focus-visible:outline-1 [&>[data-slot=suffix]>button]:focus-visible:outline-offset-1",
        ),
        className,
      )}
    />
  );
};

const textAreaInputStyles = tv({
  extend: focusStyles,
  base: "outline-hidden data-disabled:opacity-50 min-h-16 w-full min-w-0 rounded-lg border border-input px-2.5 py-2 text-base shadow-sm transition duration-200 field-sizing-content sm:text-sm",
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-50 forced-colors:border-[GrayText]",
    },
  },
});

const TextAreaInput = (props: TextAreaProps) => {
  const { className, ...rest } = props;
  return (
    <AriaTextArea
      className={composeRenderProps(className, (className, renderProps) =>
        textAreaInputStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

export {
  Input as TextFieldInput,
  InputPrefix as TextFieldInputPrefix,
  InputSuffix as TextFieldInputSuffix,
  TextAreaInput,
  TextField,
  TextFieldGroup,
};

export type { TextFieldProps, InputProps, TextAreaProps };
