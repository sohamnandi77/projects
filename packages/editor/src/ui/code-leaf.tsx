import { PlateLeaf } from "@udecode/plate-common/react";
import { withRef } from "#editor/lib/with-ref";

import { cn } from "@projects/ui/lib/utils";

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateLeaf
        ref={ref}
        asChild
        className={cn(
          "whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm",
          className,
        )}
        {...props}>
        <code>{children}</code>
      </PlateLeaf>
    );
  },
);
