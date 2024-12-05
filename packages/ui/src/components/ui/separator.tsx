import type { SeparatorProps as AriaSeparatorProps } from "react-aria-components";
import { forwardRef } from "react";
import { Separator as AriaSeparator } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const Separator = forwardRef<
  React.ElementRef<typeof AriaSeparator>,
  AriaSeparatorProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AriaSeparator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...rest}
    />
  );
});

export { Separator };
