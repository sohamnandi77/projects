import type {
  GridListItemProps as AriaGridListItemProps,
  GridListProps as AriaGridListProps,
} from "react-aria-components";
import { GripHorizontal } from "lucide-react";
import {
  Button as AriaButton,
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  composeRenderProps,
} from "react-aria-components";

import { Checkbox } from "@projects/ui/checkbox";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

export function GridList<T extends object>({
  children,
  className,
  ...props
}: AriaGridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        cn(
          "group flex flex-col gap-2 overflow-auto rounded-md border bg-overlay p-1 text-overlay-fg shadow-md outline-none",
          /* Empty */
          "empty:p-6 empty:text-center empty:text-sm",
        ),
        className,
      )}
    >
      {children}
    </AriaGridList>
  );
}

export function GridListItem({
  children,
  className,
  ...props
}: AriaGridListItemProps) {
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem
      textValue={textValue}
      className={composeTailwindRenderProps(
        cn(
          "relative flex w-full cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Focus Visible */
          "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          /* Hovered */
          "hover:bg-accent hover:text-accent-fg",
          /* Selected */
          "selected:bg-accent selected:text-accent-fg",
          /* Dragging */
          "dragging:opacity-60",
        ),
        className,
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {renderProps.allowsDragging && (
            <AriaButton slot="drag">
              <GripHorizontal className="size-4" />
            </AriaButton>
          )}
          {renderProps.selectionMode === "multiple" &&
            renderProps.selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
          {children}
        </>
      ))}
    </AriaGridListItem>
  );
}
