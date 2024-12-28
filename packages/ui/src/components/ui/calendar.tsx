import type { ReactChildrenProps } from "#ui/types/index";
import type {
  CalendarCellProps,
  CalendarGridBodyProps,
  CalendarGridHeaderProps,
  CalendarGridProps,
  CalendarHeaderCellProps,
  CalendarProps,
  DateValue,
  RangeCalendarProps,
} from "react-aria-components";
import { focusRing } from "#ui/lib/style";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  Heading as CalendarHeading,
  Calendar as CalendarRoot,
  composeRenderProps,
  RangeCalendar as RangeCalendarRoot,
  RangeCalendarStateContext,
  useLocale,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import type { ButtonProps } from "@projects/ui/button";
import { Button, getButtonVariants } from "@projects/ui/button";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

interface CalendarNavigationIconProps {
  direction: "rtl" | "ltr";
  slot: "previous" | "next";
}

const iconMap = {
  previous: {
    rtl: ChevronRight,
    ltr: ChevronLeft,
  },
  next: {
    rtl: ChevronLeft,
    ltr: ChevronRight,
  },
};

const CalendarNavigationIcon = (props: CalendarNavigationIconProps) => {
  const { direction, slot } = props;
  const IconComponent = iconMap[slot][direction];
  return <IconComponent aria-hidden className="size-4" />;
};

interface CalendarHeaderButtonProps extends ButtonProps {
  slot: "previous" | "next";
}

const CalendarHeaderButton = (props: CalendarHeaderButtonProps) => {
  const { slot, children, className, ...rest } = props;
  const { direction } = useLocale();

  return (
    <Button
      slot={slot}
      className={composeTailwindRenderProps(
        cn(
          getButtonVariants({ variant: "secondary" }),
          "size-7 bg-transparent p-0 opacity-50",
          "hover:opacity-100",
        ),
        className,
      )}
      {...rest}>
      {children ?? <CalendarNavigationIcon slot={slot} direction={direction} />}
    </Button>
  );
};

const CalendarHeader = (props: ReactChildrenProps) => {
  const { children } = props;
  return (
    <header className="flex w-full items-center gap-1 px-1 pb-5 sm:pb-4">
      <CalendarHeaderButton slot="previous" />
      {children ?? (
        <CalendarHeading className="grow text-center text-sm font-medium" />
      )}
      <CalendarHeaderButton slot="next" />
    </header>
  );
};

const CalendarGrid = ({ className, ...props }: CalendarGridProps) => (
  <AriaCalendarGrid
    className={cn(
      "border-separate border-spacing-x-0 border-spacing-y-1 [&_td]:border-collapse [&_td]:px-0",
      className,
    )}
    {...props}
  />
);

const CalendarGridHeader = (props: CalendarGridHeaderProps) => {
  const { className, ...rest } = props;
  return (
    <AriaCalendarGridHeader
      className={cn(
        "text-sm font-semibold text-muted-fg lg:text-xs",
        className,
      )}
      {...rest}
    />
  );
};

const CalendarHeaderCell = (props: CalendarHeaderCellProps) => {
  const { className, ...rest } = props;
  return (
    <AriaCalendarHeaderCell
      className={cn(
        "w-9 rounded-md text-[0.8rem] font-normal text-muted-fg",
        className,
      )}
      {...rest}
    />
  );
};

const CalendarGridBody = (props: CalendarGridBodyProps) => {
  const { className, ...rest } = props;
  return (
    <AriaCalendarGridBody
      className={cn("[&>tr>td]:p-0", className)}
      {...rest}
    />
  );
};

const cellStyles = tv({
  extend: focusRing,
  base: "flex size-10 cursor-default items-center justify-center rounded-full tabular-nums sm:size-9 sm:text-sm forced-colors:outline-0",
  variants: {
    isSelected: {
      false:
        "text-fg hover:bg-secondary-fg/15 pressed:bg-secondary-fg/20 forced-colors:text-[ButtonText]",
      true: "bg-primary text-primary-fg invalid:bg-danger invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:invalid:bg-[Mark]",
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]",
    },
  },
});

const CalendarCell = (props: CalendarCellProps) => {
  const { className, ...rest } = props;
  return (
    <AriaCalendarCell
      className={composeRenderProps(className, (className, renderProps) =>
        cellStyles({
          ...renderProps,
          className,
        }),
      )}
      {...rest}
    />
  );
};

const rangeCellStyles = tv({
  extend: focusRing,
  base: "flex size-full items-center justify-center rounded-full tabular-nums forced-color-adjust-none",
  variants: {
    selectionState: {
      none: "group-hover:bg-secondary-fg/15 group-pressed:bg-secondary-fg/20 forced-colors:group-pressed:bg-[Highlight]",
      middle: [
        "group-hover:bg-primary/20 forced-colors:group-hover:bg-[Highlight]",
        "group-invalid:text-red-500 group-invalid:group-hover:bg-red-200 dark:group-invalid:group-hover:bg-red-900 forced-colors:group-invalid:group-hover:bg-[Mark]",
        "group-pressed:bg-primary forced-colors:text-[HighlightText] forced-colors:group-pressed:bg-[Highlight]",
        "group-invalid:group-pressed:bg-red-300 dark:group-invalid:group-pressed:bg-red-800 forced-colors:group-invalid:group-pressed:bg-[Mark]",
      ],
      cap: "bg-primary text-primary-fg group-invalid:bg-danger group-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-invalid:bg-[Mark]",
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]",
    },
  },
});

interface GetSelectionStateProps {
  isSelected: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;
}

const getSelectionState = (args: GetSelectionStateProps) => {
  const { isSelected, isSelectionStart, isSelectionEnd } = args;
  if (isSelected && (isSelectionStart || isSelectionEnd)) return "cap";
  if (isSelected) return "middle";
  return "none";
};

const RangeCalendarCell = (props: CalendarCellProps) => {
  const { className, children, ...rest } = props;
  return (
    <AriaCalendarCell
      className={composeTailwindRenderProps(
        cn([
          "group size-10 cursor-default outline outline-0 outside-month:text-zinc-300 selection-start:rounded-s-full selection-end:rounded-e-full lg:size-9 lg:text-sm forced-colors:selected:bg-[Highlight] forced-colors:invalid:selected:bg-[Mark]",
          "selected:bg-primary/10 selected:text-primary dark:selected:bg-primary/15 forced-colors:selected:text-[HighlightText]",
          "[td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full",
          "invalid:selected:bg-red-100 dark:invalid:selected:bg-red-700/30",
        ]),
        className,
      )}
      {...rest}>
      {children ??
        (({
          isSelected,
          isSelectionStart,
          isSelectionEnd,
          formattedDate,
          ...renderProps
        }) => {
          const selectionState = getSelectionState({
            isSelected,
            isSelectionStart,
            isSelectionEnd,
          });
          return (
            <span
              className={rangeCellStyles({
                ...renderProps,
                selectionState,
              })}>
              {formattedDate}
            </span>
          );
        })}
    </AriaCalendarCell>
  );
};

function Calendar<T extends DateValue>({
  className,
  ...props
}: Readonly<CalendarProps<T>>) {
  return (
    <CalendarRoot
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
      {...props}>
      <CalendarHeader />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </CalendarRoot>
  );
}

function RangeCalendar<T extends DateValue>(
  props: Readonly<RangeCalendarProps<T>>,
) {
  const { className, ...rest } = props;
  return (
    <RangeCalendarRoot
      className={composeTailwindRenderProps("w-fit", className)}
      {...rest}
      visibleDuration={{ months: 3 }}>
      <CalendarHeader />
      <div style={{ display: "flex", gap: 30, overflow: "auto" }}>
        <CalendarGrid>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <RangeCalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
        <CalendarGrid offset={{ months: 1 }}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <RangeCalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
        <CalendarGrid offset={{ months: 2 }}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <RangeCalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </RangeCalendarRoot>
  );
}

export {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeaderButton,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarRoot,
  RangeCalendar,
  RangeCalendarCell,
  RangeCalendarRoot,
  RangeCalendarStateContext,
};

export type {
  CalendarCellProps,
  CalendarGridBodyProps,
  CalendarGridHeaderProps,
  CalendarGridProps,
  CalendarHeaderCellProps,
  CalendarProps,
  RangeCalendarProps,
};
