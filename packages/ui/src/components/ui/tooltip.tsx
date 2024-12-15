import type { ReactNode } from "react";
import type {
  TooltipProps as AriaTooltipProps,
  TooltipRenderProps as AriaTooltipRenderProps,
} from "react-aria-components";
import { Tooltip as AriaTooltip, OverlayArrow } from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

type TooltipRenderProps = AriaTooltipRenderProps & {
  defaultChildren?: ReactNode;
};

interface TooltipContentProps extends Omit<AriaTooltipProps, "children"> {
  children?: ReactNode;
  showArrow?: boolean;
}

const TooltipContent = (props: TooltipContentProps) => {
  const { className, children, showArrow = true, offset = 8, ...rest } = props;

  return (
    <AriaTooltip
      offset={offset}
      className={composeTailwindRenderProps(
        cn(
          "group z-50 overflow-hidden rounded-md border bg-overlay px-3 py-1.5 text-sm text-overlay-fg shadow-md animate-in fade-in-0",
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
    >
      {showArrow && (
        <OverlayArrow>
          jdlks
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaTooltip>
  );
};

export { TooltipContent };

export { TooltipTrigger as Tooltip } from "react-aria-components";

export type { TooltipContentProps, TooltipRenderProps };
