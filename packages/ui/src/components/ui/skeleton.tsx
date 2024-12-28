import React, { isValidElement } from "react";
import { tv } from "tailwind-variants";

import { Slot } from "./slot";

const skeletonStyles = tv({
  base: [
    // reset
    "!pointer-events-none !cursor-default !select-none !border-none !bg-none !box-decoration-clone !bg-clip-border !text-transparent !shadow-none *:!invisible before:!invisible after:!invisible",
    // data-inline-skeleton
    "data-[inline-skeleton]:!font-['Arial'] data-[inline-skeleton]:leading-[0px]",
    // empty
    "empty:block",
    // base
    "shrink-0 animate-pulse",
  ],
  variants: {
    variant: {
      muted: "bg-fg/20",
      lighter: "bg-fg/15",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-sm",
    },
  },
  defaultVariants: {
    variant: "muted",
    shape: "square",
  },
});

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "muted" | "lighter";
  shape?: "circle" | "square";
  isLoading?: boolean;
}

const Skeleton = (props: SkeletonProps) => {
  const {
    shape,
    variant,
    className,
    isLoading = true,
    children,
    ...rest
  } = props;
  const isValidChildren = isValidElement(children);
  const Tag = isValidChildren ? Slot : "span";

  if (!isLoading) return children;

  return (
    <Tag
      aria-hidden
      tabIndex={-1}
      data-inline-skeleton={isValidChildren ? undefined : true}
      className={skeletonStyles({ shape, variant, className })}
      inert={true}
      {...rest}>
      {children}
    </Tag>
  );
};

export { Skeleton };
