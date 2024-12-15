import type { DropZoneProps as AriaDropZoneProps } from "react-aria-components";
import {
  DropZone as AriaDropZone,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const DropZone = ({ className, ...props }: AriaDropZoneProps) => (
  <AriaDropZone
    className={composeRenderProps(className, (className) =>
      cn(
        "flex h-[150px] w-[300px] flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm ring-offset-bg",
        /* Drop Target */
        "data-[drop-target]:border-solid data-[drop-target]:border-primary data-[drop-target]:bg-accent",
        /* Focus Visible */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      ),
    )}
    {...props}
  />
);

export { DropZone };
