import type {
  GroupProps,
  SeparatorProps,
  ToolbarProps,
} from "react-aria-components";
import { createContext, useContext, useMemo } from "react";
import { cva } from "class-variance-authority";
import {
  Toolbar as AriaToolbar,
  composeRenderProps,
  Group,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

import { Separator } from "./separator";
import { Toggle } from "./toggle";

const toolbarVariants = cva("group flex gap-2", {
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
  },
});

const ToolbarContext = createContext<{
  orientation?: ToolbarProps["orientation"];
}>({
  orientation: "horizontal",
});

function Toolbar(props: Readonly<ToolbarProps>) {
  const { className, orientation, ...rest } = props;
  const value = useMemo(() => ({ orientation }), [orientation]);
  return (
    <ToolbarContext.Provider value={value}>
      <AriaToolbar
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          toolbarVariants({ ...renderProps, className }),
        )}
        {...rest}
      />
    </ToolbarContext.Provider>
  );
}

const ToolbarSeparator = ({ className, ...props }: SeparatorProps) => {
  const { orientation } = useContext(ToolbarContext);
  const effectiveOrientation =
    orientation === "vertical" ? "horizontal" : "vertical";
  return (
    <Separator
      orientation={effectiveOrientation}
      className={cn(
        effectiveOrientation === "vertical" ? "mx-1.5" : "my-1.5 w-9",
        className,
      )}
      {...props}
    />
  );
};

const ToolbarGroupContext = createContext<{ isDisabled?: boolean }>({});

const ToolbarGroup = (props: GroupProps) => {
  const { isDisabled, children, ...rest } = props;
  const value = useMemo(() => ({ isDisabled }), [isDisabled]);
  return (
    <ToolbarGroupContext.Provider value={value}>
      <Group
        className={
          "flex gap-2 group-orientation-vertical:flex-col group-orientation-vertical:items-start"
        }
        {...rest}
      >
        {children}
      </Group>
    </ToolbarGroupContext.Provider>
  );
};

const ToolbarItem = (props: React.ComponentProps<typeof Toggle>) => {
  const { isDisabled, ...rest } = props;
  const context = useContext(ToolbarGroupContext);
  const effectiveIsDisabled = isDisabled ?? context.isDisabled;

  return <Toggle isDisabled={effectiveIsDisabled} {...rest} />;
};

export { Toolbar, ToolbarSeparator, ToolbarGroup, ToolbarItem };
export type { ToolbarProps };
