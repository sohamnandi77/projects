import type {
  InputProps as AriaInputProps,
  TextAreaProps as AriaTextAreaProps,
} from "react-aria-components";
import { forwardRef } from "react";
import {
  Input as AriaInput,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const TextField = AriaTextField;

const TextFieldInput = forwardRef<HTMLInputElement, AriaInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <AriaInput
        ref={ref}
        className={composeTailwindRenderProps(
          cn(
            "flex h-10 w-full rounded-md border border-stroke-secondary bg-bg px-3 py-2 text-sm ring-offset-bg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-fg",
            /* Disabled */
            "disabled:cursor-not-allowed disabled:opacity-50",
            /* Focused */
            "focus:border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            /* Resets */
            "focus-visible:outline-none",
            /* Invalid / Error */
            "invalid:border-danger",
          ),
          className,
        )}
        {...props}
      />
    );
  },
);
TextFieldInput.displayName = "TextFieldInput";

const TextAreaInput = (props: AriaTextAreaProps) => {
  const { className, ...rest } = props;
  return (
    <AriaTextArea
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-bg px-3 py-2 text-sm ring-offset-bg placeholder:text-muted-fg",
          /* Resets */
          "focus-visible:outline-none",
          /* Focused */
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",
          /* Invalid / Error */
          "invalid:border-danger",
          className,
        ),
      )}
      {...rest}
    />
  );
};

export { TextAreaInput, TextField, TextFieldInput };
