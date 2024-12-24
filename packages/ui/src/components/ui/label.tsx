import type { LabelProps } from "react-aria-components";
import { Label as LabelPrimitive } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const Label = (props: LabelProps) => {
  const { className, ...rest } = props;
  return (
    <LabelPrimitive
      {...rest}
      className={cn(
        "w-fit cursor-default text-sm font-medium text-secondary-fg",
        /* Disabled */
        "disabled:cursor-not-allowed disabled:text-muted-fg",
        /* Invalid */
        "group-invalid:text-danger",
        className,
      )}
    />
  );
};

export { Label };

export type { LabelProps };
