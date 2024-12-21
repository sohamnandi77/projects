"use client";

import type { TextInputDOMProps } from "@react-types/shared";
import type { TextFieldProps as TextFieldPrimitiveProps } from "react-aria-components";
import * as React from "react";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import {
  Button as ButtonPrimitive,
  TextField as TextFieldPrimitive,
} from "react-aria-components";

import type { FieldProps } from "./form";
import { Description, FieldError, FieldGroup, Input, Label } from "./form";
import { Loader } from "./loader";

type InputType = Exclude<TextInputDOMProps["type"], "password">;

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isPending?: boolean;
  className?: string;
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable: true;
  type: "password";
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
  isRevealable?: never;
  type?: InputType;
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps;

const TextField = ({
  placeholder,
  label,
  description,
  errorMessage,
  prefix,
  suffix,
  isPending,
  className,
  isRevealable,
  type,
  ...props
}: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const inputType = isRevealable
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <TextFieldPrimitive
      type={inputType}
      {...props}
      className={composeTailwindRenderProps(
        "group flex flex-col gap-y-1.5",
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-loading={isPending ? "true" : undefined}>
        {prefix ? (
          // eslint-disable-next-line tailwindcss/no-custom-classname
          <span data-slot="prefix" className="atrs x2e2">
            {prefix}
          </span>
        ) : null}
        <Input placeholder={placeholder} />
        {isRevealable ? (
          <ButtonPrimitive
            type="button"
            aria-label="Toggle password visibility"
            onPress={handleTogglePasswordVisibility}
            className="relative mr-2.5 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&>[data-slot=icon]]:text-muted-fg"
          >
            <>{isPasswordVisible ? <EyeClosed /> : <Eye />}</>
          </ButtonPrimitive>
        ) : isPending ? (
          <Loader variant="spin" data-slot="suffix" />
        ) : suffix ? (
          <span data-slot="suffix">{suffix}</span>
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  );
};

export { TextField, TextFieldPrimitive, type TextFieldProps };
