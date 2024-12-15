import type {
  CalendarCellProps as AriaCalendarCellProps,
  CalendarGridBodyProps as AriaCalendarGridBodyProps,
  CalendarGridProps as AriaCalendarGridProps,
  CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
  CalendarProps as AriaCalendarProps,
  DateValue as AriaDateValue,
  RangeCalendarProps as AriaRangeCalendarProps,
} from "react-aria-components";
import { useContext } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  Heading as AriaHeading,
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarStateContext as AriaRangeCalendarStateContext,
  composeRenderProps,
  useLocale,
} from "react-aria-components";

import type { ButtonProps } from "@projects/ui/button";
import { Button, getButtonVariants } from "@projects/ui/button";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const CalendarRoot = AriaCalendar;

const RangeCalendarRoot = AriaRangeCalendar;

const CalendarHeading = AriaHeading;

const CalendarGridHeader = AriaCalendarGridHeader;

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
          getButtonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50",
          "hover:opacity-100",
        ),
        className,
      )}
      {...rest}
    >
      {children ?? <CalendarNavigationIcon slot={slot} direction={direction} />}
    </Button>
  );
};

const CalendarHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="flex w-full items-center gap-1 px-1 pb-4">
      <CalendarHeaderButton slot="previous" />
      {children ?? (
        <CalendarHeading className="grow text-center text-sm font-medium" />
      )}
      <CalendarHeaderButton slot="next" />
    </header>
  );
};

const CalendarGrid = ({ className, ...props }: AriaCalendarGridProps) => (
  <AriaCalendarGrid
    className={cn(
      "border-separate border-spacing-x-0 border-spacing-y-1",
      className,
    )}
    {...props}
  />
);

const CalendarHeaderCell = ({
  className,
  ...props
}: AriaCalendarHeaderCellProps) => (
  <AriaCalendarHeaderCell
    className={cn(
      "w-9 rounded-md text-[0.8rem] font-normal text-muted-fg",
      className,
    )}
    {...props}
  />
);

const CalendarGridBody = ({
  className,
  ...props
}: AriaCalendarGridBodyProps) => (
  <AriaCalendarGridBody className={cn("[&>tr>td]:p-0", className)} {...props} />
);

const CalendarCell = ({ className, ...props }: AriaCalendarCellProps) => {
  const isRange = Boolean(useContext(AriaRangeCalendarStateContext));
  return (
    <AriaCalendarCell
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          getButtonVariants({ variant: "ghost" }),
          "relative flex size-9 items-center justify-center p-0 text-sm font-normal",
          /* Disabled */
          renderProps.isDisabled && "text-muted-fg opacity-50",
          /* Selected */
          renderProps.isSelected &&
            "bg-primary text-primary-fg focus:bg-primary focus:text-primary-fg",
          /* Hover */
          renderProps.isHovered &&
            renderProps.isSelected &&
            (renderProps.isSelectionStart ||
              renderProps.isSelectionEnd ||
              !isRange) &&
            "hover:bg-primary hover:text-primary-fg",
          /* Selection Start/End */
          renderProps.isSelected &&
            isRange &&
            !renderProps.isSelectionStart &&
            !renderProps.isSelectionEnd &&
            "rounded-none bg-accent text-accent-fg",
          /* Outside Month */
          renderProps.isOutsideMonth &&
            "text-muted-fg opacity-50 selected:bg-accent/50 selected:text-muted-fg selected:opacity-30",
          /* Current Date */
          renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
            !renderProps.isSelected &&
            "bg-accent text-accent-fg",
          /* Unavailable Date */
          renderProps.isUnavailable && "cursor-default text-danger",
          renderProps.isInvalid &&
            "bg-danger text-danger-fg hover:bg-danger hover:text-danger-fg focus:bg-danger focus:text-danger-fg",
          className,
        ),
      )}
      {...props}
    />
  );
};

function Calendar<T extends AriaDateValue>({
  className,
  ...props
}: Readonly<AriaCalendarProps<T>>) {
  return (
    <CalendarRoot
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
      {...props}
    >
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

function RangeCalendar<T extends AriaDateValue>(
  props: Readonly<AriaRangeCalendarProps<T>>,
) {
  const { className, ...rest } = props;
  return (
    <RangeCalendarRoot
      className={composeTailwindRenderProps(cn("w-fit"), className)}
      {...rest}
      visibleDuration={{ months: 3 }}
    >
      <CalendarHeader />
      <div style={{ display: "flex", gap: 30, overflow: "auto" }}>
        <CalendarGrid>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <CalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
        <CalendarGrid offset={{ months: 1 }}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <CalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
        <CalendarGrid offset={{ months: 2 }}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <CalendarCell date={date} />}
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
  RangeCalendarRoot,
  AriaRangeCalendarStateContext as RangeCalendarStateContext,
};

export type {
  AriaCalendarCellProps as CalendarCellProps,
  AriaCalendarGridBodyProps as CalendarGridBodyProps,
  AriaCalendarGridProps as CalendarGridProps,
  AriaCalendarHeaderCellProps as CalendarHeaderCellProps,
  AriaCalendarProps as CalendarProps,
  AriaDateValue as DateValue,
  AriaRangeCalendarProps as RangeCalendarProps,
};
