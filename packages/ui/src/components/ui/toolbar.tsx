import type { ToolbarProps } from "react-aria-components";
import {
  Toolbar as AriaToolbar,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

export function Toolbar(props: Readonly<ToolbarProps>) {
  return (
    <AriaToolbar
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "flex gap-2",
          /* Orientation */
          "orientation-vertical:flex-col",
          className,
        ),
      )}
    />
  );
}
