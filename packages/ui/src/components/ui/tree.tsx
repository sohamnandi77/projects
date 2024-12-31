import type {
  TreeItemContentProps,
  TreeItemProps as TreeItemPrimitiveProps,
  TreeProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronRight } from "lucide-react";
import {
  UNSTABLE_TreeItemContent as AriaTreeItemContent,
  Button,
  composeRenderProps,
  UNSTABLE_TreeItem as TreeItemPrimitive,
  UNSTABLE_Tree as TreePrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { CheckboxProps } from "@projects/ui/checkbox";
import { Checkbox } from "@projects/ui/checkbox";

import type { ButtonProps } from "./button";
import type { LabelProps } from "./label";
import { Label } from "./label";

const treeStyles = tv({
  base: "flex max-h-96 min-w-72 cursor-default flex-col overflow-auto rounded-lg border bg-bg py-2 outline-none forced-color-adjust-none [scrollbar-width:thin] lg:text-sm [&::-webkit-scrollbar]:size-0.5",
  variants: {
    isFocusVisible: {
      true: "outline-2 outline-offset-[-1px] outline-primary",
    },
  },
});

const Tree = <T extends object>(props: TreeProps<T>) => {
  const { className, children, ...rest } = props;
  return (
    <TreePrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        treeStyles({
          ...renderProps,
          className,
        }),
      )}
      {...rest}>
      {children}
    </TreePrimitive>
  );
};

const itemStyles = tv({
  base: [
    "p-[0.286rem_0.286rem_0.286rem_0.571rem] pl-[calc((var(--tree-item-level)-1)*20px+0.571rem+var(--padding))] outline-none [--padding:20px] [&_[data-expanded]_[slot=chevron]_[data-slot=icon]]:rotate-90",
    "[&_[slot=chevron]]:outline-none [&_[slot=chevron]_[data-slot=icon]]:text-muted-fg",
    "data-[has-child-rows]:[--padding:0px]",
  ],
  variants: {
    isExpanded: {
      true: "[&_[slot=chevron]_[data-slot=icon]]:rotate-90 [&_[slot=chevron]_[data-slot=icon]]:text-fg [&_[slot=chevron]_[data-slot=icon]]:transition [&_[slot=chevron]_[data-slot=icon]]:duration-200",
    },
    isFocusVisible: {
      true: "focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&_[slot=chevron]_[data-slot=icon]]:text-fg",
    },
    isDisabled: {
      true: "opacity-50 forced-colors:text-[GrayText]",
    },
  },
});

const TreeItem = <T extends object>(props: TreeItemPrimitiveProps<T>) => {
  const { className, children, ...rest } = props;
  return (
    <TreeItemPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({
          ...renderProps,
          className,
        }),
      )}
      {...rest}>
      {children}
    </TreeItemPrimitive>
  );
};

const TreeItemContent = (props: TreeItemContentProps) => {
  const { children, ...rest } = props;
  return (
    <AriaTreeItemContent {...rest}>
      {(renderProps) => (
        <div className="flex items-center">
          {typeof children === "function" ? children(renderProps) : children}
        </div>
      )}
    </AriaTreeItemContent>
  );
};

const TreeItemIndicator = (props: ButtonProps) => {
  const { slot = "chevron", className, ...rest } = props;
  return (
    <Button
      className={composeTailwindRenderProps("relative shrink-0", className)}
      slot={slot}
      {...rest}>
      <ChevronRight data-slot="icon" className="size-4" />
    </Button>
  );
};

const TreeItemCheckbox = (props: CheckboxProps) => {
  const { slot = "selection", ...rest } = props;
  return <Checkbox slot={slot} {...rest} />;
};

const TreeItemLabel = (props: LabelProps) => {
  return <Label {...props} />;
};

export {
  Tree,
  TreeItem,
  TreeItemLabel,
  TreeItemIndicator,
  TreeItemCheckbox,
  TreeItemContent,
};
