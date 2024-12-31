import type { ListBoxItemProps, SectionProps } from "react-aria-components";
import { cn } from "#ui/lib/utils";
import { Check } from "lucide-react";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  ListBoxSection,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const dropdownItemVariants = tv({
  base: [
    "group relative flex cursor-default select-none items-center gap-x-1.5 rounded-[calc(var(--radius)-1px)] px-2.5 py-2 text-base text-fg outline outline-0 forced-color-adjust-none lg:text-sm forced-colors:text-[LinkText]",
    "has-submenu:open:data-[danger=true]:bg-danger/20 has-submenu:open:data-[danger=true]:text-danger",
    "has-submenu:open:bg-accent has-submenu:open:text-accent-fg [&[data-has-submenu][data-open]_.text-muted-fg]:text-accent-fg [&[data-has-submenu][data-open]_[data-slot=icon]]:text-accent-fg",
    "[&_[data-slot=avatar]]:-mr-0.5 [&_[data-slot=avatar]]:size-6 sm:[&_[data-slot=avatar]]:size-5",
    "[&[data-danger]_[data-slot=icon]]:text-danger/60 [&[data-focused][data-danger]_[data-slot=icon]]:text-danger-fg [&[data-focused]_[data-slot=icon]]:text-accent-fg [&[data-hovered]_[data-slot=icon]]:text-accent-fg [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:text-muted-fg",
    "[&_[data-slot=menu-radio]>[data-slot=icon]]:size-3",
    "forced-colors:[&_[data-slot=icon]]:text-[CanvasText] forced-colors:[&_[data-slot=icon]]:group-data-[focus]:text-[Canvas] ",
  ],
  variants: {
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]",
    },
    isFocused: {
      false: "data-[danger=true]:text-danger",
      true: [
        "bg-accent text-accent-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-[danger=true]:bg-danger data-[danger=true]:text-danger-fg",
        "[&[data-slot=description]]:text-accent-fg [&[data-slot=label]]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80",
      ],
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: "bg-secondary",
    },
  ],
});

const dropdownSectionVariants = tv({
  slots: {
    section:
      "flex flex-col gap-y-0.5 after:block after:h-[5px] after:content-[''] first:mt-[-5px]",
    header:
      "sticky top-[-5px] z-10 -mx-1 -mb-0.5 min-w-[--trigger-width] truncate border-y bg-tertiary px-4 py-2 text-sm font-medium text-muted-fg supports-[-moz-appearance:none]:bg-tertiary [&+*]:mt-1",
  },
});

const { section, header } = dropdownSectionVariants();

interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

type DropdownSectionHeaderProps = React.HTMLAttributes<HTMLElement> &
  React.RefAttributes<object>;

const DropdownSectionHeader = (props: DropdownSectionHeaderProps) => {
  const { className, ...rest } = props;
  return <Header className={header({ className })} {...rest} />;
};

const DropdownSection = <T extends object>(props: DropdownSectionProps<T>) => {
  const { className, items, title, children, ...rest } = props;
  return (
    <ListBoxSection className={section({ className })} {...rest}>
      <DropdownSectionHeader>{title}</DropdownSectionHeader>
      <Collection items={items}>{children}</Collection>
    </ListBoxSection>
  );
};

const DropdownItem = (props: ListBoxItemProps) => {
  const { className, textValue, children, ...rest } = props;
  const newTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <ListBoxItemPrimitive
      textValue={newTextValue}
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemVariants({ ...renderProps, className }),
      )}
      {...rest}>
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-medium">
            {children}
          </span>
          {isSelected && (
            <span className="absolute right-2 top-3 lg:top-2.5">
              <Check />
            </span>
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  );
};

const DropdownItemDetails = (props: React.ComponentProps<"div">) => {
  const { className, ...rest } = props;

  return <div className={cn("flex flex-col gap-y-1", className)} {...rest} />;
};

export {
  DropdownItem,
  DropdownItemDetails,
  DropdownSection,
  dropdownItemVariants,
  dropdownSectionVariants,
};

export type { DropdownSectionProps };
