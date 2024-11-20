import type {
  TabListProps as AriaTabListProps,
  TabPanelProps as AriaTabPanelProps,
  TabProps as AriaTabProps,
  TabsProps as AriaTabsProps,
} from "react-aria-components";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

function Tabs(props: Readonly<AriaTabsProps>) {
  const { className, ...rest } = props;
  return (
    <AriaTabs
      className={composeRenderProps(className, (className) =>
        cn(
          "group flex flex-col gap-2",
          /* Orientation */
          "data-[orientation=vertical]:flex-row",
          className,
        ),
      )}
      {...rest}
    />
  );
}

const TabList = <T extends object>(props: AriaTabListProps<T>) => {
  const { className, ...rest } = props;
  return (
    <AriaTabList
      className={composeRenderProps(className, (className) =>
        cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          /* Orientation */
          "data-[orientation=vertical]:h-auto data-[orientation=vertical]:flex-col",
          className,
        ),
      )}
      {...rest}
    />
  );
};

const Tab = (props: AriaTabProps) => {
  const { className, ...rest } = props;
  return (
    <AriaTab
      className={composeRenderProps(className, (className) =>
        cn(
          "inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium outline-none ring-offset-background transition-all",
          /* Focus Visible */
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Selected */
          "data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
          /* Orientation */
          "group-data-[orientation=vertical]:w-full",
          className,
        ),
      )}
      {...rest}
    />
  );
};

const TabPanel = (props: AriaTabPanelProps) => {
  const { className, ...rest } = props;

  return (
    <AriaTabPanel
      className={composeRenderProps(className, (className) =>
        cn(
          "mt-2 ring-offset-background",
          /* Focus Visible */
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        ),
      )}
      {...rest}
    />
  );
};

export { Tab, TabList, TabPanel, Tabs };
