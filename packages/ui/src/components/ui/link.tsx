import type { VariantProps } from "class-variance-authority";
import type { LinkProps as AriaLinkProps } from "react-aria-components";
import { Link as AriaLink, composeRenderProps } from "react-aria-components";

import { getButtonVariants } from "@projects/ui/button";
import { cn } from "@projects/ui/lib/utils";

interface LinkProps
  extends AriaLinkProps,
    VariantProps<typeof getButtonVariants> {}

const Link = ({ className, variant, size, ...props }: LinkProps) => {
  return (
    <AriaLink
      className={composeRenderProps(className, (className) =>
        cn(
          getButtonVariants({
            variant,
            size,
            className,
          }),
        ),
      )}
      {...props}
    />
  );
};

export { Link };
export type { LinkProps };
