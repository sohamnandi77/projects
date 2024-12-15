import type { ToolbarProps } from "@projects/ui/toolbar";
import { Toolbar } from "@projects/ui/toolbar";

export const FixedToolbar = (props: ToolbarProps) => {
  return (
    <Toolbar
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="supports-backdrop-blur:bg-bg/60 scrollbar-hide sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-stroke bg-bg/95 p-1 backdrop-blur"
      {...props}
    />
  );
};
