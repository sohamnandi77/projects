import type { TooltipProps as AriaTooltipProps } from "react-aria-components";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const TooltipTrigger = AriaTooltipTrigger;

const Tooltip = (props: AriaTooltipProps) => {
  const { className, offset = 4, ...rest } = props;
  return (
    <AriaTooltip
      offset={offset}
      className={composeTailwindRenderProps(
        cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0",
          /* Entering */
          "entering:zoom-in-95",
          /* Exiting */
          "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
          /* Placement */
          "placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
        ),
        className,
      )}
      {...rest}
    />
  );
};

export { Tooltip, TooltipTrigger };
