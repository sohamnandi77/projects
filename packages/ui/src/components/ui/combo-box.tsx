import type {
  ComboBoxProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";
import { use } from "react";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronDown, X } from "lucide-react";
import {
  ComboBoxContext,
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  useSlottedContext,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { InputProps } from "./input";
import type { ListBox } from "./list-box";
import { Button } from "./button";
import {
  DropdownItem as ComboBoxItem,
  DropdownSection as ComboBoxSection,
} from "./dropdown";
import { FieldGroup } from "./form";
import { TextFieldInput } from "./input";
import { ListBoxPicker } from "./list-box";
import { PopoverPicker } from "./popover";

const comboBoxStyles = tv({
  slots: {
    base: "group flex w-full flex-col gap-y-1.5",
    chevronButton:
      "h-7 w-8 rounded outline-offset-0 active:bg-transparent hover:bg-transparent pressed:bg-transparent [&_[data-slot=icon]]:text-muted-fg hover:[&_[data-slot=icon]]:text-fg pressed:[&_[data-slot=icon]]:text-fg",
    chevronIcon:
      "size-4 shrink-0 transition duration-200 group-open:rotate-180 group-open:text-fg",
    clearButton:
      "absolute inset-y-0 right-0 flex items-center pr-2 text-muted-fg hover:text-fg focus:outline-none",
  },
});

const { base, chevronButton, chevronIcon, clearButton } = comboBoxStyles();

const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
  const { className, ...rest } = props;
  return (
    <ComboBoxPrimitive
      className={composeTailwindRenderProps(base(), className)}
      {...rest}
    />
  );
};

type ListBoxPickerProps<T extends object> = React.ComponentProps<
  typeof ListBox<T>
>;

interface ListProps<T extends object>
  extends ListBoxPickerProps<T>,
    Omit<PopoverPrimitiveProps, "children" | "className" | "style"> {}

const ComboBoxList = <T extends object>(props: ListProps<T>) => {
  const { children, items, ...rest } = props;
  return (
    <PopoverPicker trigger="ComboBox" isNonModal placement={props.placement}>
      <ListBoxPicker items={items} {...rest}>
        {children}
      </ListBoxPicker>
    </PopoverPicker>
  );
};

const ComboBoxInput = (props: InputProps) => {
  const context = useSlottedContext(ComboBoxContext);

  if (!context) {
    throw new Error("ComboBoxInput must be with in a ComboBox Provider");
  }

  return (
    <FieldGroup className="relative pl-0">
      <TextFieldInput {...props} />
      <Button size="icon" appearance="plain" className={chevronButton()}>
        {!context.inputValue && <ChevronDown className={chevronIcon()} />}
      </Button>
      {context.inputValue && <ComboBoxClearButton />}
    </FieldGroup>
  );
};

const ComboBoxClearButton = () => {
  const state = use(ComboBoxStateContext);

  return (
    <Button
      className={clearButton()}
      slot={null}
      aria-label="Clear"
      onClick={() => {
        state?.setSelectedKey(null);
        state?.open();
      }}>
      <X className="size-4 animate-in" />
    </Button>
  );
};

export { ComboBox, ComboBoxInput, ComboBoxList, ComboBoxItem, ComboBoxSection };

export type { ComboBoxProps, ListBoxPickerProps, ListProps };
