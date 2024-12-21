import type { GridListItemProps, GridListProps } from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { Menu } from "lucide-react";
import {
  GridListItem as AriaGridListItem,
  Button,
  composeRenderProps,
  GridList as GridListPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Checkbox } from "@projects/ui/checkbox";

const gridListStyles = tv({
  base: "relative max-h-96 overflow-auto rounded-lg border [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5 [&>[data-drop-target]]:border [&>[data-drop-target]]:border-primary",
});

const GridList = <T extends object>({
  children,
  className,
  ...props
}: GridListProps<T>) => (
  <GridListPrimitive
    className={composeTailwindRenderProps(gridListStyles(), className)}
    {...props}
  >
    {children}
  </GridListPrimitive>
);

const itemStyles = tv({
  base: "group relative -mb-px flex cursor-default select-none gap-3 border-y px-3 py-2 text-fg outline-none -outline-offset-2 transition first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 lg:text-sm",
  variants: {
    isHovered: { true: "bg-accent-subtle" },
    isSelected: {
      true: "z-20 border-border/50 bg-accent-subtle hover:bg-accent-subtle/50 dark:hover:bg-accent-subtle/60",
    },
    isFocused: {
      true: "outline-none",
    },
    isFocusVisible: {
      true: "bg-accent-subtle outline-none ring-1 ring-primary hover:bg-accent-subtle/70 selected:bg-accent-subtle/80",
    },
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]",
    },
  },
});

const GridListItem = ({ className, ...props }: GridListItemProps) => {
  const textValue =
    typeof props.children === "string" ? props.children : undefined;
  return (
    <AriaGridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {allowsDragging && (
            <Button
              slot="drag"
              className="cursor-grab dragging:cursor-grabbing [&>[data-slot=icon]]:text-muted-fg"
            >
              <Menu />
            </Button>
          )}

          <span
            aria-hidden
            className="absolute inset-y-0 left-0 hidden h-full w-0.5 bg-primary group-selected:block"
          />
          {selectionMode === "multiple" && selectionBehavior === "toggle" && (
            <Checkbox className="-mr-2" slot="selection" />
          )}
          {props.children as React.ReactNode}
        </>
      )}
    </AriaGridListItem>
  );
};

const GridListEmptyState = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="p-6" {...props} />
);

export { GridList, GridListItem, GridListEmptyState };
