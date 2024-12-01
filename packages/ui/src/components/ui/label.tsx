import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Label as AriaLabel } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const labelVariants = cva([
  "text-sm font-medium leading-none",
  /* Disabled */
  "disabled:cursor-not-allowed disabled:opacity-70",
  /* Invalid */
  "group-invalid:text-error",
]);

const Label = forwardRef<
  React.ElementRef<typeof AriaLabel>,
  React.ComponentPropsWithoutRef<typeof AriaLabel>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <AriaLabel ref={ref} className={cn(labelVariants(), className)} {...rest} />
  );
});
Label.displayName = "Label";

export { Label, labelVariants };
