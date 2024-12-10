import { withRef } from "@projects/editor/lib/withRef";
import { cn } from "@projects/ui/lib/utils";

import { PlateElement } from "./plate-element";

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        as="blockquote"
        className={cn("my-1 border-l-2 pl-3 italic", className)}
        {...props}
      >
        {children}
      </PlateElement>
    );
  },
);
