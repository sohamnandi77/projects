"use client";

import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps,
} from "react-aria-components";
import React, { useMemo } from "react";
import { X } from "lucide-react";
import {
  Button,
  composeRenderProps,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { badgeIntents, badgeShapes, badgeStyles } from "@projects/ui/badge";
import { Description, Label } from "@projects/ui/form";
import { focusStyles } from "@projects/ui/lib/style";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const intents = {
  primary: {
    base: [
      badgeIntents.primary,
      "[&_[slot=remove]:hover]:bg-primary [&_[slot=remove]:hover]:text-primary-fg",
    ],
    selected: [
      "bg-primary dark:hover:bg-primary dark:bg-primary hover:bg-primary ring-primary ring-inset text-primary-fg dark:text-primary-fg hover:text-primary-fg",
      "[&_[slot=remove]:hover]:bg-primary-fg/80 [&_[slot=remove]:hover]:text-primary",
    ],
  },
  secondary: {
    base: [
      badgeIntents.secondary,
      "[&_[slot=remove]:hover]:bg-fg [&_[slot=remove]:hover]:text-bg",
    ],
    selected: [
      "bg-fg ring-fg/50 text-bg dark:bg-fg/90 dark:text-secondary ring-inset",
      "[&_[slot=remove]:hover]:bg-bg [&_[slot=remove]:hover]:text-secondary-fg",
    ],
  },
  success: {
    base: [
      badgeIntents.success,
      "[&_[slot=remove]:hover]:bg-success [&_[slot=remove]:hover]:text-success-fg",
    ],
    selected: [
      "bg-success dark:bg-success ring-success ring-inset dark:text-success-fg dark:hover:bg-success hover:bg-success text-success-fg hover:text-success-fg",
      "[&_[slot=remove]:hover]:bg-success-fg/80 [&_[slot=remove]:hover]:text-success",
    ],
  },
  warning: {
    base: [
      badgeIntents.warning,
      "[&_[slot=remove]:hover]:bg-warning [&_[slot=remove]:hover]:text-warning-fg",
    ],
    selected: [
      "bg-warning dark:hover:bg-warning dark:bg-warning dark:text-bg hover:bg-warning text-warning-fg hover:text-warning-fg",
      "[&_[slot=remove]:hover]:bg-warning-fg/80 [&_[slot=remove]:hover]:text-warning",
    ],
  },
  danger: {
    base: [
      badgeIntents.danger,
      "[&_[slot=remove]:hover]:bg-danger [&_[slot=remove]:hover]:text-danger-fg",
    ],
    selected: [
      "bg-danger dark:bg-danger dark:hover:bg-danger/90 hover:bg-danger text-danger-fg ring-danger hover:text-danger-fg",
      "[&_[slot=remove]:hover]:bg-danger-fg/80 [&_[slot=remove]:hover]:text-danger",
    ],
  },
};

type RestrictedIntent = "primary" | "secondary";

type Intent = "primary" | "secondary" | "warning" | "danger" | "success";

type Shape = keyof typeof badgeShapes;

interface TagGroupContextValue {
  intent: Intent;
  shape: Shape;
}

const TagGroupContext = React.createContext<TagGroupContextValue>({
  intent: "primary",
  shape: "square",
});

export interface TagGroupProps extends TagGroupPrimitiveProps {
  intent?: Intent;
  shape?: "square" | "circle";
  errorMessage?: string;
  label?: string;
  description?: string;
}

const TagGroup = (props: TagGroupProps) => {
  const { children, label, description, className, intent, shape, ...rest } =
    props;
  const value = useMemo(
    () => ({
      intent: intent ?? "primary",
      shape: shape ?? "square",
    }),
    [intent, shape],
  );

  return (
    <TagGroupPrimitive
      className={cn("flex flex-col flex-wrap", className)}
      {...rest}
    >
      <TagGroupContext value={value}>
        {label && <Label className="mb-1">{label}</Label>}
        {children}
        {description && <Description>{description}</Description>}
      </TagGroupContext>
    </TagGroupPrimitive>
  );
};

const TagList = <T extends object>({
  className,
  ...props
}: TagListProps<T>) => {
  return (
    <TagListPrimitive
      {...props}
      className={composeTailwindRenderProps("flex flex-wrap gap-2", className)}
    />
  );
};

const tagStyles = tv({
  extend: focusStyles,
  base: [badgeStyles.base, "cursor-pointer"],
  variants: {
    isFocused: { true: "ring-1" },
    isDisabled: { true: "cursor-default opacity-50" },
    allowsRemoving: { true: "pr-1" },
  },
});

interface TagProps extends TagPrimitiveProps {
  intent?: Intent;
  shape?: Shape;
}

const TagItem = ({ className, intent, shape, ...props }: TagProps) => {
  const textValue =
    typeof props.children === "string" ? props.children : undefined;
  const groupContext = React.useContext(TagGroupContext);

  return (
    <TagPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (_, renderProps) => {
        const finalIntent = intent ?? groupContext.intent;
        const finalShape = shape ?? groupContext.shape;

        return tagStyles({
          ...renderProps,
          className: cn([
            intents[finalIntent].base,
            badgeShapes[finalShape],
            renderProps.isSelected ? intents[finalIntent].selected : undefined,
          ]),
        });
      })}
    >
      {({ allowsRemoving }) => {
        return (
          <>
            {props.children as React.ReactNode}
            {allowsRemoving && (
              <Button
                slot="remove"
                className={composeTailwindRenderProps(
                  "-mr-0.5 grid size-3.5 place-content-center rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&>[data-slot=icon]]:size-3 [&>[data-slot=icon]]:shrink-0",
                  className as string,
                )}
              >
                <X />
              </Button>
            )}
          </>
        );
      }}
    </TagPrimitive>
  );
};

export { TagGroup, TagItem, TagList, type RestrictedIntent };
