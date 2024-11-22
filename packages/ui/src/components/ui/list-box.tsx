import type {
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
} from "react-aria-components";
import { forwardRef } from "react";
import { Check } from "lucide-react";
import {
  Collection as AriaCollection,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const ListBoxSection = AriaListBoxSection;

const ListBoxCollection = AriaCollection;

const ListBox = forwardRef<HTMLDivElement, AriaListBoxProps<object>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <AriaListBox
        ref={ref}
        className={composeTailwindRenderProps(
          cn(
            "group overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
            /* Empty */
            "empty:p-6 empty:text-center empty:text-sm",
          ),
          className,
        )}
        {...rest}
      />
    );
  },
);

const ListBoxItem = forwardRef<HTMLDivElement, AriaListBoxItemProps<object>>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <AriaListBoxItem
        ref={ref}
        textValue={
          props.textValue ??
          (typeof children === "string" ? children : undefined)
        }
        className={composeTailwindRenderProps(
          cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
            /* Disabled */
            "disabled:pointer-events-none disabled:opacity-50",
            /* Focused */
            "focus:bg-accent focus:text-accent-foreground",
            /* Hovered */
            "hover:bg-accent hover:text-accent-foreground",
            /* Selection */
            "data-[selection-mode]:pl-8",
          ),
          className,
        )}
        {...rest}
      >
        {composeRenderProps(children, (children, renderProps) => (
          <>
            {renderProps.isSelected && (
              <span className="absolute left-2 flex size-4 items-center justify-center">
                <Check className="size-4" />
              </span>
            )}
            {children}
          </>
        ))}
      </AriaListBoxItem>
    );
  },
);
ListBoxItem.displayName = "ListBoxItem";

function ListBoxHeader(props: React.ComponentProps<typeof AriaHeader>) {
  const { className, ...rest } = props;
  return (
    <AriaHeader
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...rest}
    />
  );
}

export {
  ListBox,
  ListBoxCollection,
  ListBoxHeader,
  ListBoxItem,
  ListBoxSection,
};

export type {
  ListBoxItemProps,
  ListBoxProps,
  ListBoxSectionProps,
} from "react-aria-components";
