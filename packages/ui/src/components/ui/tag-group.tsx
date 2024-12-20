import type {
  TagGroupProps as AriaTagGroupProps,
  TagListProps as AriaTagListProps,
  TagProps as AriaTagProps,
} from "react-aria-components";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { Label } from "@projects/ui/label";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const TagGroup = AriaTagGroup;

function TagList<T extends object>(props: Readonly<AriaTagListProps<T>>) {
  const { className, ...rest } = props;
  return (
    <AriaTagList
      className={composeTailwindRenderProps(
        cn(
          "flex flex-wrap gap-2",
          /* Empty */
          "empty:text-sm empty:text-muted-fg",
        ),
        className,
      )}
      {...rest}
    />
  );
}

const badgeVariants = cva(
  [
    "inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-semibold ring-offset-bg transition-colors",
    /* Focus */
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    /* Disabled */
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-primary text-primary-fg",
          /* Hover */
          "hover:bg-primary/80",
        ],
        secondary: [
          "border-transparent bg-secondary text-secondary-fg",
          /* Hover */
          "hover:bg-secondary/80",
        ],
        error: [
          "border-transparent bg-danger text-danger-fg",
          /* Hover */
          "hover:bg-danger/80",
        ],
        outline: "text-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Tag(props: Readonly<AriaTagProps>) {
  const { children, className, ...rest } = props;
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaTag
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          badgeVariants({
            variant:
              renderProps.selectionMode === "none" || renderProps.isSelected
                ? "default"
                : "secondary",
          }),
          renderProps.allowsRemoving && "pr-1",
          className,
        ),
      )}
      {...rest}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children}
          {renderProps.allowsRemoving && (
            <AriaButton
              slot="remove"
              className={cn(
                "rounded-sm opacity-70 ring-offset-bg transition-opacity",
                /* Hover */
                "hover:opacity-100",
                /* Resets */
                "focus-visible:outline-none",
                className,
              )}
            >
              <XIcon aria-hidden className="size-3" />
            </AriaButton>
          )}
        </>
      ))}
    </AriaTag>
  );
}

interface JollyTagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<AriaTagListProps<T>, "items" | "children" | "renderEmptyState"> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function JollyTagGroup<T extends object>(
  props: Readonly<JollyTagGroupProps<T>>,
) {
  const {
    label,
    description,
    className,
    errorMessage,
    items,
    children,
    renderEmptyState,
    ...rest
  } = props;
  return (
    <TagGroup className={cn("group flex flex-col gap-2", className)} {...rest}>
      <Label>{label}</Label>
      <TagList items={items} renderEmptyState={renderEmptyState}>
        {children}
      </TagList>
      {description && (
        <Text className="text-sm text-muted-fg" slot="description">
          {description}
        </Text>
      )}
      {errorMessage && (
        <Text className="text-sm text-danger" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </TagGroup>
  );
}

export { badgeVariants, JollyTagGroup, Tag, TagGroup, TagList };
export type { JollyTagGroupProps };
