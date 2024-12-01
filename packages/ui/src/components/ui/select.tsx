"use client";

import type {
  ButtonProps as AriaButtonProps,
  ListBoxProps as AriaListBoxProps,
  PopoverProps as AriaPopoverProps,
  SelectProps as AriaSelectProps,
  SelectValueProps as AriaSelectValueProps,
  ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

import { FieldError } from "./form";
import { Label } from "./label";
import {
  ListBoxCollection,
  ListBoxHeader,
  ListBoxItem,
  ListBoxSection,
} from "./list-box";
import { Popover } from "./popover";

const Select = AriaSelect;

const SelectItem = ListBoxItem;

const SelectHeader = ListBoxHeader;

const SelectSection = ListBoxSection;

const SelectCollection = ListBoxCollection;

const SelectValue = <T extends object>({
  className,
  ...props
}: AriaSelectValueProps<T>) => (
  <AriaSelectValue
    className={composeRenderProps(className, (className) =>
      cn(
        "line-clamp-1 data-[placeholder]:text-muted-foreground",
        /* Description */
        "[&>[slot=description]]:hidden",
        className,
      ),
    )}
    {...props}
  />
);

const SelectTrigger = ({ className, children, ...props }: AriaButtonProps) => (
  <AriaButton
    className={composeRenderProps(className, (className) =>
      cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-stoke-input bg-background px-3 py-2 text-sm ring-offset-background",
        /* Disabled */
        "disabled:cursor-not-allowed disabled:opacity-50",
        /* Focused */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className,
      ),
    )}
    {...props}
  >
    {composeRenderProps(children, (children) => (
      <>
        {children}
        <ChevronDown aria-hidden="true" className="size-4 opacity-50" />
      </>
    ))}
  </AriaButton>
);

const SelectPopover = ({ className, ...props }: AriaPopoverProps) => (
  <Popover
    className={composeRenderProps(className, (className) =>
      cn("w-[--trigger-width]", className),
    )}
    {...props}
  />
);

const SelectListBox = <T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) => (
  <AriaListBox
    className={composeRenderProps(className, (className) =>
      cn(
        "max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
        className,
      ),
    )}
    {...props}
  />
);

interface JollySelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function JollySelect<T extends object>(props: Readonly<JollySelectProps<T>>) {
  const {
    label,
    description,
    errorMessage,
    children,
    className,
    items,
    ...rest
  } = props;
  return (
    <Select
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className),
      )}
      {...rest}
    >
      <Label>{label}</Label>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      {description && (
        <Text className="text-sm text-muted-foreground" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
      <SelectPopover>
        <SelectListBox items={items}>{children}</SelectListBox>
      </SelectPopover>
    </Select>
  );
}

export {
  JollySelect,
  Select,
  SelectCollection,
  SelectHeader,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectSection,
  SelectTrigger,
  SelectValue,
};
export type { JollySelectProps };
