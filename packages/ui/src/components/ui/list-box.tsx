import type {
  ListBoxItemProps as ListBoxItemPrimitiveProps,
  ListBoxProps as ListBoxPrimitiveProps,
} from "react-aria-components";
import { Check, Menu } from "lucide-react";
import {
  composeRenderProps,
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn } from "@projects/ui/lib/utils";

import {
  DropdownSection,
  DropdownItemDetails as ListBoxItemDetails,
} from "./dropdown";

const listBoxVariants = tv({
  base: "flex max-h-96 w-full min-w-72 flex-col gap-y-1 overflow-y-auto rounded-xl border p-1 shadow-lg outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
});

interface ListBoxProps<T> extends ListBoxPrimitiveProps<T> {
  className?: string;
}

const ListBox = <T extends object>({
  children,
  className,
  ...props
}: ListBoxProps<T>) => (
  <ListBoxPrimitive {...props} className={listBoxVariants({ className })}>
    {children}
  </ListBoxPrimitive>
);

const listBoxItemStyles = tv({
  base: "relative cursor-pointer rounded-[calc(var(--radius)-1px)] p-2 text-base outline-none lg:text-sm",
  variants: {
    isFocusVisible: {
      true: "bg-secondary text-secondary-fg [&:focus-visible_[slot=description]]:text-accent-fg/70 [&:focus-visible_[slot=label]]:text-accent-fg",
    },
    isHovered: {
      true: "bg-accent text-accent-fg [&:hover_[slot=description]]:text-accent-fg/70 [&:hover_[slot=label]]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80",
    },
    isFocused: {
      true: "bg-accent text-accent-fg [&_.text-muted-fg]:text-accent-fg/80 [&_[data-slot=icon]]:text-accent-fg [&_[data-slot=label]]:text-accent-fg",
    },
    isSelected: {
      true: "bg-accent text-accent-fg [&_.text-muted-fg]:text-accent-fg/80 [&_[data-slot=icon]]:text-accent-fg [&_[data-slot=label]]:text-accent-fg",
    },
    isDragging: { true: "cursor-grabbing bg-secondary text-secondary-fg" },
    isDisabled: {
      true: "cursor-default text-muted-fg opacity-70",
    },
  },
});

interface ListBoxItemProps<T extends object>
  extends ListBoxItemPrimitiveProps<T> {
  className?: string;
}

const ListBoxItem = <T extends object>({
  children,
  className,
  ...props
}: ListBoxItemProps<T>) => {
  const textValue = typeof children === "string" ? children : undefined;

  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        listBoxItemStyles({
          ...renderProps,
          className,
        }),
      )}>
      {(values) => (
        <div className="flex items-center gap-2">
          {values.allowsDragging && (
            <Menu
              className={cn(
                "size-4 shrink-0 text-muted-fg transition",
                values.isFocused && "text-fg",
                values.isDragging && "text-fg",
                values.isSelected && "text-accent-fg/70",
              )}
            />
          )}
          <div className="flex flex-col">
            {typeof children === "function" ? children(values) : children}

            {values.isSelected && (
              <span className="absolute right-2 top-3 animate-in lg:top-2.5">
                <Check />
              </span>
            )}
          </div>
        </div>
      )}
    </ListBoxItemPrimitive>
  );
};

type ListBoxPickerProps<T> = ListBoxProps<T>;

const ListBoxPicker = <T extends object>({
  className,
  ...props
}: ListBoxPickerProps<T>) => {
  return (
    <ListBoxPrimitive
      className={cn("max-h-72 overflow-auto p-1 outline-none", className)}
      {...props}
    />
  );
};

const ListBoxSection = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownSection>) => {
  return (
    <DropdownSection
      className={cn(className, "gap-y-1 [&_.lbi:last-child]:-mb-1.5")}
      {...props}
    />
  );
};

export {
  ListBox,
  ListBoxSection,
  ListBoxItemDetails,
  ListBoxItem,
  ListBoxPicker,
  listBoxVariants,
};

export type { ListBoxPickerProps };
