import type { ToolbarProps } from "react-aria-components";
import { Toolbar as AriaToolbar } from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

export function Toolbar(props: Readonly<ToolbarProps>) {
  const { className, ...rest } = props;
  return (
    <AriaToolbar
      className={composeTailwindRenderProps(
        cn(
          "flex gap-2",
          /* Orientation */
          "orientation-vertical:flex-col",
        ),
        className,
      )}
      {...rest}
    />
  );
}
