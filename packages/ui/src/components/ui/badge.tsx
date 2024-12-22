import type { VariantProps } from "tailwind-variants";
import React from "react";
import { tv } from "tailwind-variants";

const BadgeVariantsKey = {
  variant: "variant",
  shape: "shape",
} as const;

const BadgeOptionsKey = {
  [BadgeVariantsKey.variant]: {
    primary: "primary",
    secondary: "secondary",
    success: "success",
    danger: "danger",
    info: "info",
    warning: "warning",
  },
  [BadgeVariantsKey.shape]: {
    circle: "circle",
    square: "square",
  },
} as const;

const getBadgeVariants = tv({
  base: "inline-flex items-center gap-x-1.5 py-0.5 text-xs/5 font-medium forced-colors:outline [&_[data-slot=icon]]:size-3",
  variants: {
    [BadgeVariantsKey.variant]: {
      [BadgeOptionsKey.variant.primary]:
        "bg-primary/10 text-primary group-hover:bg-primary/15 dark:bg-primary/15 dark:text-primary dark:group-hover:bg-primary/20",
      [BadgeOptionsKey.variant.secondary]:
        "bg-secondary text-secondary-fg group-hover:bg-muted dark:bg-secondary dark:group-hover:bg-muted",
      [BadgeOptionsKey.variant.success]:
        "bg-emerald-500/15 text-emerald-700 group-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20",
      [BadgeOptionsKey.variant.info]:
        "bg-info/15 text-info group-hover:bg-info/20 dark:bg-info/15 dark:group-hover:bg-info/20",
      [BadgeOptionsKey.variant.warning]:
        "bg-warning/10 text-warning-fg group-hover:bg-warning/15 dark:bg-warning/15 dark:text-warning dark:group-hover:bg-warning/20",
      [BadgeOptionsKey.variant.danger]:
        "bg-danger/10 text-danger group-hover:bg-danger/15 dark:bg-danger/15 dark:group-hover:bg-danger/20",
    },
    [BadgeVariantsKey.shape]: {
      [BadgeOptionsKey.shape.square]: "rounded-md px-1.5",
      [BadgeOptionsKey.shape.circle]: "rounded-full px-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    shape: "circle",
  },
});

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof getBadgeVariants>;

const Badge = (props: BadgeProps) => {
  const { children, variant, shape, className, ...rest } = props;
  return (
    <span className={getBadgeVariants({ variant, shape, className })} {...rest}>
      {children}
    </span>
  );
};

export { Badge, getBadgeVariants, BadgeOptionsKey };
export type { BadgeProps };
