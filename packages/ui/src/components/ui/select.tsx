"use client";

import type { Placement } from "@react-types/overlays";
import type {
  ButtonProps,
  SelectProps as SelectPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import * as React from "react";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Button,
  composeRenderProps,
  Select as SelectPrimitive,
  SelectValue,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  DropdownItem,
  DropdownItemDetails,
  DropdownSection,
} from "@projects/ui/dropdown";
import { Description, FieldError, Label } from "@projects/ui/form";
import { focusStyles } from "@projects/ui/lib/style";
import { ListBoxPicker } from "@projects/ui/list-box";
import { PopoverPicker } from "@projects/ui/popover";

const selectTriggerStyles = tv({
  extend: focusStyles,
  base: [
    "flex h-10 w-full cursor-default items-center gap-4 rounded-lg border border-input bg-bg py-2 pl-3 pr-2 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition group-open:border-ring/85 group-open:ring-4 group-open:ring-ring/20 focus-visible:border-ring/85 focus-visible:ring-4 focus-visible:ring-primary/20 group-disabled:bg-secondary group-disabled:opacity-50 dark:shadow-none [&_[data-slot=icon]]:size-4",
  ],
  variants: {
    isDisabled: {
      false:
        "text-fg group-invalid:border-danger group-invalid:ring-danger/20 forced-colors:group-invalid:border-[Mark]",
      true: "bg-secondary text-muted-fg forced-colors:border-[GrayText] forced-colors:text-[GrayText]",
    },
  },
});

interface SelectProps<T extends object> extends SelectPrimitiveProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  className?: string;
}

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: SelectProps<T>) => {
  return (
    <SelectPrimitive
      {...props}
      className={composeTailwindRenderProps(
        "group flex w-full flex-col gap-y-1.5",
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <>{children as React.ReactNode}</>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SelectPrimitive>
  );
};

interface ListProps<T extends object> {
  items?: Iterable<T>;
  placement?: Placement;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
}

const SelectList = <T extends object>({
  className,
  children,
  items,
  placement,
}: ListProps<T>) => {
  return (
    <PopoverPicker className={className} trigger="Select" placement={placement}>
      <ListBoxPicker aria-label="items" items={items}>
        {children}
      </ListBoxPicker>
    </PopoverPicker>
  );
};

interface TriggerProps extends ButtonProps {
  prefix?: React.ReactNode;
  className?: string;
}

const SelectTrigger = ({ className, ...props }: TriggerProps) => {
  return (
    <Button
      className={composeRenderProps(className, (className, renderProps) =>
        selectTriggerStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {props.prefix && <span className="-mr-1">{props.prefix}</span>}
      <SelectValue className="flex-1 text-base placeholder-shown:text-muted-fg lg:text-sm [&_[slot=description]]:hidden" />
      <ChevronDown
        aria-hidden
        className="size-4 shrink-0 text-muted-fg duration-300 group-open:rotate-180 group-open:text-fg group-disabled:opacity-50 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
      />
    </Button>
  );
};

export {
  Select,
  DropdownItemDetails as SelectOptionDetails,
  DropdownItem as SelectOption,
  DropdownSection as SelectSection,
  SelectTrigger,
  SelectList,
};
