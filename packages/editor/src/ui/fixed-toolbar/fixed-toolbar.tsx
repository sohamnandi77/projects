import type { ToolbarProps } from "@projects/ui/toolbar";
import { Toolbar } from "@projects/ui/toolbar";

export const FixedToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar
      className="supports-backdrop-blur:bg-background/60 border-b-border scrollbar-hide sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b bg-background/95 p-1 backdrop-blur"
      {...props}
    />
  );
};
