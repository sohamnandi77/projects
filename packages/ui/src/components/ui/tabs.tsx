import type {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
} from "react-aria-components";
import { useId } from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { LayoutGroup, motion } from "framer-motion";
import {
  composeRenderProps,
  TabList,
  TabPanel,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const tabsStyles = tv({
  base: "group/tabs flex gap-4 forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
    },
  },
});

const Tabs = (props: TabsProps) => {
  const { className, ...rest } = props;
  return (
    <TabsPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

const tabListStyles = tv({
  base: "flex forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-row gap-x-5 border-b border-border",
      vertical: "flex-col items-start gap-y-4 border-l",
    },
  },
});

const TabsList = <T extends object>(props: TabListProps<T>) => {
  const { className, ...rest } = props;
  const id = useId();
  return (
    <LayoutGroup id={id}>
      <TabList
        {...rest}
        className={composeRenderProps(className, (className, renderProps) =>
          tabListStyles({ ...renderProps, className }),
        )}
      />
    </LayoutGroup>
  );
};

const tabStyles = tv({
  base: [
    "relative flex cursor-default items-center whitespace-nowrap rounded-full text-sm font-medium outline-0 transition *:data-[slot=icon]:mr-2 *:data-[slot=icon]:size-4 hover:text-fg",
    "group-orientation-vertical/tabs:w-full group-orientation-vertical/tabs:py-0 group-orientation-vertical/tabs:pl-4 group-orientation-vertical/tabs:pr-2",
    "group-orientation-horizontal/tabs:pb-3",
  ],
  variants: {
    isSelected: {
      true: "text-fg",
      false: "text-muted-fg",
    },
    isFocused: { true: "text-fg", false: "ring-0" },
    isDisabled: {
      true: "cursor-not-allowed text-muted-fg/50",
    },
  },
});

const TabsTrigger = (props: TabProps) => {
  const { children, href, className, ...rest } = props;
  return (
    <TabPrimitive
      {...rest}
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        tabStyles({
          ...renderProps,
          className: cn(href && "cursor-pointer", className),
        }),
      )}>
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          {children}
          {isSelected && (
            <motion.span
              className={cn(
                "absolute rounded bg-fg",
                // horizontal
                "group-orientation-horizontal/tabs:inset-x-0 group-orientation-horizontal/tabs:-bottom-px group-orientation-horizontal/tabs:h-0.5 group-orientation-horizontal/tabs:w-full",
                // vertical
                "group-orientation-vertical/tabs:left-0 group-orientation-vertical/tabs:h-[calc(100%-10%)] group-orientation-vertical/tabs:w-0.5",
              )}
              layoutId="current-selected"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </>
      ))}
    </TabPrimitive>
  );
};

const TabsContent = (props: TabPanelProps) => {
  const { className, ...rest } = props;
  return (
    <TabPanel
      {...rest}
      className={composeTailwindRenderProps(
        "flex-1 text-sm text-fg focus-visible:outline-0",
        className,
      )}
    />
  );
};

export { Tabs, TabsList, TabsContent, TabsTrigger };

export type { TabsProps, TabListProps, TabProps, TabPanelProps };
