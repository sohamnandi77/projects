import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps,
} from "react-aria-components";
import { useMemo } from "react";
import { focusStyles } from "#ui/lib/style";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "#ui/lib/utils";
import { X } from "lucide-react";
import {
  Button,
  composeRenderProps,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const variantStyles = {
  primary: {
    base: [
      "bg-primary/10 text-primary group-hover:bg-primary/15 dark:bg-primary/15 dark:text-primary dark:group-hover:bg-primary/20 ",
      "[&_[slot=remove]:hover]:bg-primary [&_[slot=remove]:hover]:text-primary-fg",
    ],
    selected: [
      "bg-primary text-primary-fg ring-inset ring-primary hover:bg-primary hover:text-primary-fg dark:bg-primary dark:text-primary-fg dark:hover:bg-primary",
      "[&_[slot=remove]:hover]:bg-primary-fg/80 [&_[slot=remove]:hover]:text-primary",
    ],
  },
  secondary: {
    base: [
      "bg-secondary text-secondary-fg group-hover:bg-muted dark:bg-secondary dark:group-hover:bg-muted",
      "[&_[slot=remove]:hover]:bg-fg [&_[slot=remove]:hover]:text-bg",
    ],
    selected: [
      "bg-fg ring-fg/50 text-bg dark:bg-fg/90 dark:text-secondary ring-inset",
      "[&_[slot=remove]:hover]:bg-bg [&_[slot=remove]:hover]:text-secondary-fg",
    ],
  },
  success: {
    base: [
      "bg-emerald-500/15 text-emerald-700 group-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20",
      "[&_[slot=remove]:hover]:bg-success [&_[slot=remove]:hover]:text-success-fg",
    ],
    selected: [
      "bg-success dark:bg-success ring-success ring-inset dark:text-success-fg dark:hover:bg-success hover:bg-success text-success-fg hover:text-success-fg",
      "[&_[slot=remove]:hover]:bg-success-fg/80 [&_[slot=remove]:hover]:text-success",
    ],
  },
  info: {
    base: [
      "bg-info/15 text-info group-hover:bg-info/20 dark:bg-info/15 dark:group-hover:bg-info/20",
      "[&_[slot=remove]:hover]:bg-info [&_[slot=remove]:hover]:text-info-fg",
    ],
    selected: [
      "bg-info dark:hover:bg-info dark:bg-info dark:text-bg hover:bg-info text-info-fg hover:text-info-fg",
      "[&_[slot=remove]:hover]:bg-info-fg/80 [&_[slot=remove]:hover]:text-info",
    ],
  },
  warning: {
    base: [
      "bg-warning/10 text-warning-fg group-hover:bg-warning/15 dark:bg-warning/15 dark:text-warning dark:group-hover:bg-warning/20",
      "[&_[slot=remove]:hover]:bg-warning [&_[slot=remove]:hover]:text-warning-fg",
    ],
    selected: [
      "bg-warning dark:hover:bg-warning dark:bg-warning dark:text-bg hover:bg-warning text-warning-fg hover:text-warning-fg",
      "[&_[slot=remove]:hover]:bg-warning-fg/80 [&_[slot=remove]:hover]:text-warning",
    ],
  },
  danger: {
    base: [
      "bg-danger/10 text-danger group-hover:bg-danger/15 dark:bg-danger/15 dark:group-hover:bg-danger/20",
      "[&_[slot=remove]:hover]:bg-warning-fg/80 [&_[slot=remove]:hover]:text-warning",
    ],
    selected: [
      "bg-danger dark:bg-danger dark:hover:bg-danger/90 hover:bg-danger text-danger-fg ring-danger hover:text-danger-fg",
      "[&_[slot=remove]:hover]:bg-danger-fg/80 [&_[slot=remove]:hover]:text-danger",
    ],
  },
};

type Variant = keyof typeof variantStyles;

type Shape = "square" | "circle";

interface TagGroupContextValue {
  variant: Variant;
  shape: Shape;
}

const [TagGroupContext, useTagGroupContext] = createContextFactory<
  TagGroupContextValue | undefined
>();

interface TagGroupProps extends TagGroupPrimitiveProps {
  variant?: Variant;
  shape?: Shape;
}

const TagGroup = (props: TagGroupProps) => {
  const {
    className,
    variant = "primary",
    shape = "square",
    children,
    ...rest
  } = props;
  const value = useMemo(() => ({ variant, shape }), [variant, shape]);
  return (
    <TagGroupPrimitive
      className={cn("flex flex-col flex-wrap space-y-2", className)}
      {...rest}>
      <TagGroupContext value={value}>{children}</TagGroupContext>
    </TagGroupPrimitive>
  );
};

const TagList = <T extends object>(props: TagListProps<T>) => {
  const { className, ...rest } = props;
  return (
    <TagListPrimitive
      {...rest}
      className={composeTailwindRenderProps("flex flex-wrap gap-2", className)}
    />
  );
};

const tagStyles = tv({
  extend: focusStyles,
  base: [
    "inline-flex items-center gap-x-1.5 py-0.5 text-xs/5 font-medium forced-colors:outline",
    "cursor-pointer",
  ],
  variants: {
    isFocused: { true: "ring-1" },
    isDisabled: { true: "cursor-not-allowed opacity-50" },
    allowsRemoving: { true: "pr-1" },
    shape: {
      square: "rounded-md px-1.5",
      circle: "rounded-full px-2",
    },
  },
});

interface TagProps extends TagPrimitiveProps {
  variant?: Variant;
  shape?: Shape;
}

const Tag = (props: TagProps) => {
  const { className, children, variant, shape, ...rest } = props;
  const textValue = typeof children === "string" ? children : undefined;
  const groupContext = useTagGroupContext();

  if (!groupContext) {
    throw new Error("Tag must be within TagGroup");
  }

  const finalVariant = variant ?? groupContext.variant;
  const finalShape = shape ?? groupContext.shape;

  return (
    <TagPrimitive
      {...rest}
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) => {
        return tagStyles({
          ...renderProps,
          shape: finalShape,
          className: cn([
            variantStyles[finalVariant].base,
            renderProps.isSelected
              ? variantStyles[finalVariant].selected
              : undefined,
            className,
          ]),
        });
      })}>
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children}
          {renderProps.allowsRemoving && (
            <Button
              slot="remove"
              className="-mr-0.5 grid size-3.5 place-content-center rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&>[data-slot=icon]]:size-3 [&>[data-slot=icon]]:shrink-0">
              <X className="size-3" />
            </Button>
          )}
        </>
      ))}
    </TagPrimitive>
  );
};

export type { TagGroupProps, TagProps, TagListProps };
export { Tag, TagList, TagGroup };
