import type {
  TreeItemProps as TreeItemPrimitiveProps,
  TreeProps,
} from "react-aria-components";
import { ChevronRight } from "lucide-react";
import {
  UNSTABLE_TreeItemContent as AriaTreeItemContent,
  Button,
  composeRenderProps,
  UNSTABLE_TreeItem as TreeItemPrimitive,
  UNSTABLE_Tree as TreePrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Checkbox } from "@projects/ui/checkbox";

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
      {...rest}
    >
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
      {...rest}
    >
      {children}
    </TreeItemPrimitive>
  );
};

const TreeItemContent = (
  props: React.ComponentProps<typeof AriaTreeItemContent>,
) => {
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

const TreeItemIndicator = () => {
  return (
    <Button className="relative shrink-0" slot="chevron">
      <ChevronRight className="size-5" />
    </Button>
  );
};

const TreeItemCheckbox = () => {
  return <Checkbox slot="selection" />;
};

const TreeItemLabel = (props: React.HtmlHTMLAttributes<HTMLSpanElement>) => {
  return <span {...props} />;
};

export {
  Tree,
  TreeItem,
  TreeItemLabel,
  TreeItemIndicator,
  TreeItemCheckbox,
  TreeItemContent,
};
