import { withRef } from "@udecode/plate-common/react";
import { PlateElement } from "#editor/ui/plate-element";

import { cn } from "@projects/ui/lib/utils";

export const ParagraphElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        className={cn("m-0 px-0 py-1", className)}
        {...props}>
        {children}
      </PlateElement>
    );
  },
);
