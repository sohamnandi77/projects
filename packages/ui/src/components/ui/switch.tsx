import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import {
  Switch as AriaSwitch,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const Switch = ({ children, className, ...props }: AriaSwitchProps) => (
  <AriaSwitch
    className={composeTailwindRenderProps(
      cn(
        "group inline-flex items-center gap-2 text-sm font-medium leading-none disabled:cursor-not-allowed disabled:opacity-70",
      ),
      className,
    )}
    {...props}
  >
    {composeRenderProps(children, (children) => (
      <>
        <div
          className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            /* Focus Visible */
            "group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
            /* Disabled */
            "group-disabled:cursor-not-allowed group-disabled:opacity-50",
            /* Selected */
            "bg-input group-selected:bg-primary",
            /* Readonly */
            "group-readonly:cursor-default",
            /* Resets */
            "focus-visible:outline-none",
          )}
        >
          <div
            className={cn(
              "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
              /* Selected */
              "translate-x-0 group-selected:translate-x-5",
            )}
          />
        </div>
        {children}
      </>
    ))}
  </AriaSwitch>
);

export { Switch };
