import type {
  InputProps as AriaInputProps,
  ListBoxProps as AriaListBoxProps,
  PopoverProps as AriaPopoverProps,
} from "react-aria-components";
import {
  ComboBox as AriaComboBox,
  Input as AriaInput,
  ListBox as AriaListBox,
  ListBoxItem,
  ListBoxSection,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import { ListBoxCollection, ListBoxHeader } from "./list-box";
import { Popover } from "./popover";

const Combobox = AriaComboBox;

const ComboboxItem = ListBoxItem;

const ComboboxHeader = ListBoxHeader;

const ComboboxSection = ListBoxSection;

const ComboboxCollection = ListBoxCollection;

const ComboboxInput = (props: AriaInputProps) => {
  const { className, ...rest } = props;
  return (
    <AriaInput
      className={composeTailwindRenderProps(
        cn(
          "flex h-10 w-full bg-background px-3 py-2 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",
        ),
        className,
      )}
      {...rest}
    />
  );
};

const ComboboxPopover = (props: AriaPopoverProps) => {
  const { className, ...rest } = props;
  return (
    <Popover
      className={composeTailwindRenderProps(
        "w-[calc(var(--trigger-width)+4px)]",
        className,
      )}
      {...rest}
    />
  );
};

const ComboboxListBox = <T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) => (
  <AriaListBox
    className={composeTailwindRenderProps(
      "max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
      className,
    )}
    {...props}
  />
);

export {
  Combobox,
  ComboboxCollection,
  ComboboxHeader,
  ComboboxInput,
  ComboboxItem,
  ComboboxListBox,
  ComboboxPopover,
  ComboboxSection,
};
