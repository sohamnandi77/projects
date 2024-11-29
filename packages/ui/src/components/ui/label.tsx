import type { LabelProps as AriaLabelProps } from "react-aria-components";
import { cva } from "class-variance-authority";
import { Label as AriaLabel } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const labelVariants = cva([
  "text-sm font-medium leading-none",
  /* Disabled */
  "disabled:cursor-not-allowed disabled:opacity-70",
  /* Invalid */
  "group-data-[invalid]:text-error",
]);

const Label = (props: AriaLabelProps) => {
  const { className, ...rest } = props;
  return <AriaLabel className={cn(labelVariants(), className)} {...rest} />;
};

export { Label, labelVariants };
