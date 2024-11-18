import type {
  CalendarCellProps as AriaCalendarCellProps,
  CalendarGridBodyProps as AriaCalendarGridBodyProps,
  CalendarGridHeaderProps as AriaCalendarGridHeaderProps,
  CalendarGridProps as AriaCalendarGridProps,
  CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
  CalendarProps as AriaCalendarProps,
  DateValue as AriaDateValue,
  RangeCalendarProps as AriaRangeCalendarProps,
} from "react-aria-components";
import * as React from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button as AriaButton,
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
  Text,
  useLocale,
} from "react-aria-components";

import { getButtonVariants } from "@projects/ui/button";
import { cn } from "@projects/ui/lib/utils";

const CalendarRoot = AriaCalendar;

const RangeCalendarRoot = AriaRangeCalendar;

const CalendarHeading = (props: React.HTMLAttributes<HTMLElement>) => {
  const { direction } = useLocale();

  return (
    <header className="flex w-full items-center gap-1 px-1 pb-4" {...props}>
      <AriaButton
        slot="previous"
        className={cn(
          getButtonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50",
          /* Hover */
          "hover:opacity-100",
        )}
      >
        {direction === "rtl" ? (
          <ChevronRight aria-hidden className="size-4" />
        ) : (
          <ChevronLeft aria-hidden className="size-4" />
        )}
      </AriaButton>
      <AriaHeading className="grow text-center text-sm font-medium" />
      <AriaButton
        slot="next"
        className={cn(
          getButtonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50",
          /* Hover */
          "hover:opacity-100",
        )}
      >
        {direction === "rtl" ? (
          <ChevronLeft aria-hidden className="size-4" />
        ) : (
          <ChevronRight aria-hidden className="size-4" />
        )}
      </AriaButton>
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

const CalendarGridHeader = ({ ...props }: AriaCalendarGridHeaderProps) => (
  <AriaCalendarGridHeader {...props} />
);

const CalendarHeaderCell = ({
  className,
  ...props
}: AriaCalendarHeaderCellProps) => (
  <AriaCalendarHeaderCell
    className={cn(
      "w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
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
  const isRange = Boolean(React.useContext(AriaRangeCalendarStateContext));
  return (
    <AriaCalendarCell
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          getButtonVariants({ variant: "ghost" }),
          "relative flex size-9 items-center justify-center p-0 text-sm font-normal",
          /* Disabled */
          renderProps.isDisabled && "text-muted-foreground opacity-50",
          /* Selected */
          renderProps.isSelected &&
            "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          /* Hover */
          renderProps.isHovered &&
            renderProps.isSelected &&
            (renderProps.isSelectionStart ||
              renderProps.isSelectionEnd ||
              !isRange) &&
            "hover:bg-primary hover:text-primary-foreground",
          /* Selection Start/End */
          renderProps.isSelected &&
            isRange &&
            !renderProps.isSelectionStart &&
            !renderProps.isSelectionEnd &&
            "rounded-none bg-accent text-accent-foreground",
          /* Outside Month */
          renderProps.isOutsideMonth &&
            "text-muted-foreground opacity-50 selected:bg-accent/50 selected:text-muted-foreground selected:opacity-30",
          /* Current Date */
          renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
            !renderProps.isSelected &&
            "bg-accent text-accent-foreground",
          /* Unavailable Date */
          renderProps.isUnavailable && "cursor-default text-error",
          renderProps.isInvalid &&
            "bg-error text-error-foreground hover:bg-error hover:text-error-foreground focus:bg-error focus:text-error-foreground",
          className,
        ),
      )}
      {...props}
    />
  );
};

interface CalendarProps<T extends AriaDateValue> extends AriaCalendarProps<T> {
  errorMessage?: string;
}

function Calendar<T extends AriaDateValue>({
  errorMessage,
  className,
  ...props
}: CalendarProps<T>) {
  return (
    <CalendarRoot
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
      {...props}
    >
      <CalendarHeading />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text className="text-sm text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </CalendarRoot>
  );
}

interface RangeCalendarProps<T extends AriaDateValue>
  extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
}

function RangeCalendar<T extends AriaDateValue>({
  errorMessage,
  className,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RangeCalendarRoot
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className),
      )}
      {...props}
    >
      <CalendarHeading />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-error">
          {errorMessage}
        </Text>
      )}
    </RangeCalendarRoot>
  );
}

export {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarRoot,
  RangeCalendar,
  RangeCalendarRoot,
};

export type { CalendarProps, RangeCalendarProps };
