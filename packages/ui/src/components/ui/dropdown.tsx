import type {
  ListBoxItemProps,
  SectionProps,
  TextProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  ListBoxSection,
  Text,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const dropdownItemStyles = cva(
  cn([
    "group relative flex cursor-default select-none items-center gap-x-1.5 rounded-[calc(var(--radius)-1px)] px-2.5 py-2 text-base text-foreground outline outline-0 forced-color-adjust-none lg:text-sm forced-colors:text-[LinkText]",
    "has-submenu:open:data-[danger=true]:bg-error/20 has-submenu:open:data-[danger=true]:text-error",
    "has-submenu:open:bg-accent has-submenu:open:text-accent-foreground [&[data-has-submenu][data-open]_.text-muted-foreground]:text-accent-foreground [&[data-has-submenu][data-open]_[data-slot=icon]]:text-accent-foreground",
    "[&_[data-slot=avatar]]:-mr-0.5 [&_[data-slot=avatar]]:size-6 sm:[&_[data-slot=avatar]]:size-5",
    "[&[data-error]_[data-slot=icon]]:text-error/60 [&[data-focused][data-error]_[data-slot=icon]]:text-error-foreground [&[data-focused]_[data-slot=icon]]:text-accent-foreground [&[data-hovered]_[data-slot=icon]]:text-accent-foreground [&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0 [&_[data-slot=icon]]:text-muted-foreground",
    "[&_[data-slot=menu-radio]>[data-slot=icon]]:size-3",
    "forced-colors:[&_[data-slot=icon]]:text-[CanvasText] forced-colors:[&_[data-slot=icon]]:group-data-[focus]:text-[Canvas]",
  ]),
  {
    variants: {
      isOpen: {
        true: "bg-secondary",
      },
      isDisabled: {
        true: "text-muted-foreground forced-colors:text-[GrayText]",
      },
      isFocused: {
        false: "data-[danger=true]:text-error",
        true: [
          "bg-accent text-accent-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
          "data-[danger=true]:bg-error data-[danger=true]:text-error-foreground",
          "[&[data-slot=description]]:text-accent-foreground [&[data-slot=label]]:text-accent-foreground [&_.text-muted-foreground]:text-accent-foreground/80",
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
  },
);

// eslint-disable-next-line tailwindcss/no-custom-classname
const dropdownSectionVariants = cva("", {
  variants: {
    slots: {
      section:
        "flex flex-col gap-y-0.5 after:block after:h-[5px] after:content-[''] first:mt-[-5px]",
      header:
        "bg-tertiary supports-[-moz-appearance:none]:bg-tertiary sticky top-[-5px] z-10 -mx-1 -mb-0.5 min-w-[--trigger-width] truncate border-y px-4 py-2 text-sm font-medium text-muted-foreground [&+*]:mt-1",
    },
  },
});

interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

const DropdownSection = <T extends object>({
  className,
  ...props
}: DropdownSectionProps<T>) => {
  return (
    <ListBoxSection
      className={cn(dropdownSectionVariants({ slots: "section" }), className)}
    >
      {"title" in props && (
        <Header className={dropdownSectionVariants({ slots: "header" })}>
          {props.title}
        </Header>
      )}
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
};

const DropdownItem = ({ className, ...props }: ListBoxItemProps) => {
  const textValue =
    props.textValue ??
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
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

interface DropdownItemSlot extends TextProps {
  label?: TextProps["children"];
  description?: TextProps["children"];
  classNames?: {
    label?: TextProps["className"];
    description?: TextProps["className"];
  };
}

const DropdownItemDetails = ({
  label,
  description,
  classNames,
  ...props
}: DropdownItemSlot) => {
  const { slot, children, title, ...restProps } = props;

  return (
    <div className="flex flex-col gap-y-1" {...restProps}>
      {label && (
        <Text
          slot={slot ?? "label"}
          className={cn("font-medium lg:text-sm", classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? "description"}
          className={cn(
            "text-xs text-muted-foreground",
            classNames?.description,
          )}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  );
};

export {
  DropdownItem,
  dropdownItemStyles,
  DropdownItemDetails,
  DropdownSection,
  dropdownSectionVariants,
};
