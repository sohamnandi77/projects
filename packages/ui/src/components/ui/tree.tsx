import type {
  TreeItemProps as AriaTreeItemProps,
  TreeProps as AriaTreeProps,
  ButtonProps,
} from "react-aria-components";
import { ChevronRightIcon, InfoIcon } from "lucide-react";
import {
  UNSTABLE_Tree as AriaTree,
  UNSTABLE_TreeItem as AriaTreeItem,
  UNSTABLE_TreeItemContent as AriaTreeItemContent,
  Button,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "~/lib/utils";

const TreeItemContent = AriaTreeItemContent;

function Tree<T extends object>({ className, ...props }: AriaTreeProps<T>) {
  return (
    <AriaTree
      className={cn(
        "flex flex-col gap-1 overflow-auto p-1 outline-none",
        className,
      )}
      {...props}
    />
  );
}

function TreeItemExpandButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button slot="chevron" className={cn("outline-none", className)} {...props}>
      <>
        <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[expanded]:rotate-90" />
        {children}
      </>
    </Button>
  );
}

function TreeItemInfoButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      aria-label="Info"
      className={composeTailwindRenderProps(
        cn(
          "ml-auto flex items-center justify-center rounded-md ring-offset-background",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Focus Visible */
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          /* Resets */
          "focus-visible:outline-none",
        ),
        className,
      )}
      {...props}
    >
      <>
        {children}
        <InfoIcon className="size-4 shrink-0" />
      </>
    </Button>
  );
}

function TreeItem<T extends object>({
  className,
  ...props
}: AriaTreeItemProps<T>) {
  return (
    <AriaTreeItem
      className={cn(
        "group relative flex items-center gap-2 rounded-md p-1 pl-[calc((var(--tree-item-level)_-_1)_*_2.25rem)] font-medium outline-none ring-offset-background data-[has-child-rows]:pl-[calc((var(--tree-item-level)_-_1)_*_1.5rem)]",
        /* Disabled */
        "disabled:pointer-events-none disabled:opacity-50",
        /* Focus Visible */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        /* Resets */
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemExpandButton,
  TreeItemInfoButton,
};