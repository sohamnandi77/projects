import type {
  GroupProps,
  SeparatorProps,
  ToolbarProps,
} from "react-aria-components";
import { createContext, useContext, useMemo } from "react";
import { cn } from "#ui/lib/utils";
import {
  composeRenderProps,
  Group,
  Toolbar as ToolbarPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Separator } from "./separator";
import { Toggle } from "./toggle";

const toolbarStyles = tv({
  base: "group flex gap-2",
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
  },
});

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

const ToolbarContext = createContext<{
  orientation?: ToolbarProps["orientation"];
}>({
  orientation: "horizontal",
});

const Toolbar = ({ orientation = "horizontal", ...props }: ToolbarProps) => {
  const value = useMemo(() => ({ orientation }), [orientation]);
  return (
    <ToolbarContext value={value}>
      <ToolbarPrimitive
        orientation={orientation}
        {...props}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            toolbarStyles({ ...renderProps, className }),
        )}
      />
    </ToolbarContext>
  );
};

const toolbarGroupStyles = tv({
  base: [
    "flex gap-2",
    "group-orientation-vertical:flex-col group-orientation-vertical:items-start",
  ],
});

const ToolbarGroupContext = createContext<{ isDisabled?: boolean }>({});

const ToolbarGroup = ({ isDisabled, ...props }: GroupProps) => {
  const value = useMemo(() => ({ isDisabled }), [isDisabled]);
  return (
    <ToolbarGroupContext value={value}>
      <Group className={toolbarGroupStyles()} {...props}>
        {props.children}
      </Group>
    </ToolbarGroupContext>
  );
};

const ToolbarItem = (props: React.ComponentProps<typeof Toggle>) => {
  const { isDisabled, ...rest } = props;
  const context = useContext(ToolbarGroupContext);
  const effectiveIsDisabled = isDisabled ?? context.isDisabled;

  return <Toggle isDisabled={effectiveIsDisabled} {...rest} />;
};

export { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarItem };
export type { ToolbarProps, GroupProps, SeparatorProps };
