import type { GridListItemProps, GridListProps } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { focusStyles } from "#ui/lib/style";
import {
  composeRenderProps,
  GridList,
  GridListItem,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Checkbox } from "@projects/ui/checkbox";
import { Description, Label } from "@projects/ui/form";

const checkboxCardVariants = tv({
  base: "grid",
  variants: {
    columns: {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
    },
    gap: {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 6,
  },
});

interface CheckboxCardProps<T extends object>
  extends GridListProps<T>,
    VariantProps<typeof checkboxCardVariants> {
  className?: string;
}

const CheckboxCard = <T extends object>(props: CheckboxCardProps<T>) => {
  const {
    columns,
    gap,
    className,
    selectionMode = "multiple",
    ...rest
  } = props;
  return (
    <GridList
      layout={columns === 1 ? "stack" : "grid"}
      selectionMode={selectionMode}
      className={checkboxCardVariants({
        columns,
        gap,
        className,
      })}
      {...rest}
    />
  );
};

const checkboxCardItemStyles = tv({
  extend: focusStyles,
  base: "cursor-pointer rounded-lg border p-4 [&_[slot=title]]:font-medium",
  variants: {
    isSelected: {
      true: [
        "z-20 border-ring/75 bg-accent-subtle hover:border-ring hover:bg-accent-subtle",
        "[&_[slot=title]]:text-accent-subtle-fg",
        "[&_[slot=description]]:text-accent-subtle-fg/70",
      ],
    },
    isFocused: {
      true: "border-ring/80",
    },
    isHovered: {
      true: "bg-secondary/50",
    },
    isDisabled: {
      true: "z-10 cursor-default opacity-80 forced-colors:text-[GrayText] [&_[slot=title]]:text-muted-fg",
    },
  },
});

interface CheckboxCardItemProps
  extends GridListItemProps,
    VariantProps<typeof checkboxCardItemStyles> {
  title: string;
  description?: string;
}

const CheckboxCardItem = (props: CheckboxCardItemProps) => {
  const { children, className, ...rest } = props;
  const textValue = typeof children === "string" ? children : undefined;
  return (
    <GridListItem
      textValue={textValue}
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxCardItemStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {(values) => (
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col pr-8">
            <Label slot="title" htmlFor={textValue}>
              {props.title}
            </Label>
            {props.description && (
              <Description>{props.description}</Description>
            )}
          </div>
          {values.selectionMode === "multiple" &&
            values.selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
        </div>
      )}
    </GridListItem>
  );
};

export { CheckboxCard, CheckboxCardItem };
