import type {
  FieldErrorProps,
  GroupProps,
  InputProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult,
} from "react-aria-components";
import { focusStyles } from "#ui/lib/style";
import {
  composeRenderProps,
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Text,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import type { AsChildProps, SlotProps } from "./slot";
import { Slot } from "./slot";

interface FieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  "aria-label"?: TextFieldPrimitiveProps["aria-label"];
  "aria-labelledby"?: TextFieldPrimitiveProps["aria-labelledby"];
}

const InputPrefix = (props: SlotProps & AsChildProps) => {
  const { asChild, className, ...rest } = props;
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="prefix"
      className={cn("ml-2.5 text-muted-fg", className)}
      {...rest}
    />
  );
};

const InputSuffix = (props: SlotProps & AsChildProps) => {
  const { asChild, className, ...rest } = props;
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="suffix"
      className={cn("mr-2.5 text-muted-fg", className)}
      {...rest}
    />
  );
};

const inputStyles = tv({
  base: "w-full min-w-0 bg-transparent px-2.5 py-2 text-base text-fg placeholder-muted-fg outline-0 sm:text-sm [&::-ms-reveal]:hidden",
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-50 forced-colors:border-[GrayText]",
    },
  },
});

const Input = (props: InputProps) => {
  const { className, ...rest } = props;
  return (
    <InputPrimitive
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        inputStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  );
};

const Description = (props: TextProps) => {
  const { className, ...rest } = props;
  return (
    <Text
      {...rest}
      slot="description"
      className={cn(
        "text-pretty text-base/6 text-muted-fg sm:text-sm/6",
        className,
      )}
    />
  );
};

const FieldError = (props: FieldErrorProps) => {
  const { className, ...rest } = props;
  return (
    <FieldErrorPrimitive
      {...rest}
      className={composeTailwindRenderProps(
        "text-sm/6 text-danger forced-colors:text-[Mark]",
        className,
      )}
    />
  );
};

const fieldGroupStyles = tv({
  base: [
    "group flex h-10 items-center overflow-hidden rounded-lg border border-input transition duration-200 ease-out",
    "focus-within:ring-4 group-invalid:focus-within:border-danger group-invalid:focus-within:ring-danger/20",
    "[&>[role=progressbar]]:mr-2.5",
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]",
    },
  },
});

const FieldGroup = (props: GroupProps) => {
  const { className, ...rest } = props;
  return (
    <Group
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  );
};

export { Input, Description, FieldError, FieldGroup, InputPrefix, InputSuffix };
export { Form } from "react-aria-components";
export type { FormProps } from "react-aria-components";
export type {
  FieldProps,
  FieldErrorProps,
  TextProps as DescriptionProps,
  GroupProps,
};
