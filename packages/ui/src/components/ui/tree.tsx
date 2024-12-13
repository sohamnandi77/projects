import type {
  TreeItemProps as AriaTreeItemProps,
  TreeProps as AriaTreeProps,
  ButtonProps,
} from "react-aria-components";
import { ChevronRightIcon } from "lucide-react";
import {
  UNSTABLE_Tree as AriaTree,
  UNSTABLE_TreeItem as AriaTreeItem,
  UNSTABLE_TreeItemContent as AriaTreeItemContent,
  Button,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const TreeItemContent = AriaTreeItemContent;

function Tree<T extends object>(props: Readonly<AriaTreeProps<T>>) {
  const { className, ...rest } = props;
  return (
    <AriaTree
      className={composeTailwindRenderProps(
        "flex flex-col gap-1 overflow-auto p-1 outline-none",
        className,
      )}
      {...rest}
    />
  );
}

function TreeItemExpandButton(props: Readonly<ButtonProps>) {
  const { className, children, ...rest } = props;
  return (
    <Button
      slot="chevron"
      className={composeTailwindRenderProps("outline-none", className)}
      {...rest}
    >
      {(renderProps) => (
        <>
          <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-200 group-expanded:rotate-90" />
          {typeof children === "function" ? children(renderProps) : children}
        </>
      )}
    </Button>
  );
}

function TreeItemInfoButton(props: Readonly<ButtonProps>) {
  const { className, children, ...rest } = props;
  return (
    <Button
      aria-label="Info"
      className={composeTailwindRenderProps(
        cn(
          "ml-auto flex items-center justify-center rounded-md ring-offset-background",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Resets */
          "focus-visible:outline-none",
          /* Focus Visible */
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ),
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}

function TreeItem<T extends object>(props: Readonly<AriaTreeItemProps<T>>) {
  const { className, ...rest } = props;
  return (
    <AriaTreeItem
      className={composeTailwindRenderProps(
        cn(
          "group relative flex items-center gap-2 rounded-md p-1 pl-[calc((var(--tree-item-level)_-_1)_*_2.25rem)] font-medium outline-none ring-offset-background data-[has-child-rows]:pl-[calc((var(--tree-item-level)_-_1)_*_1.5rem)]",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Resets */
          "focus-visible:outline-none",
          /* Focus Visible */
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ),
        className,
      )}
      {...rest}
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
