import type { VariantProps } from "class-variance-authority";
import type { LinkProps as AriaLinkProps } from "react-aria-components";
import { Link as AriaLink, composeRenderProps } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

import { getButtonVariants } from "./button";

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
