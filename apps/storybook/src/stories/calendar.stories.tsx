import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { DateValue } from "@projects/ui/calendar";
import {
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
  RangeCalendarRoot,
} from "@projects/ui/calendar";
import { cn } from "@projects/ui/lib/utils";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResusableWrapper: Story = {
  render: (args) => <Calendar {...args} />,
};

export const Basic: Story = {
  render: () => {
    return (
      <CalendarRoot aria-label="Appointment date">
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
  },
};

export const CustomHeader: Story = {
  render: () => {
    return (
      <CalendarRoot aria-label="Appointment date">
        <header className="flex w-full items-center gap-1 px-1 pb-4">
          <CalendarHeading className="text-center text-sm font-medium" />
          <CalendarHeaderButton slot="previous" className="ml-auto" />
          <CalendarHeaderButton slot="next" />
        </header>
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
  },
};

export const InternationalCalendars: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<DateValue | null>(null);

    return (
      <>
        <Calendar aria-label="Date" value={date} onChange={setDate} />
        <p className="mt-3">Selected date: {date?.toString()}</p>
      </>
    );
  },
};

export const RangeCalendarStory: Story = {
  render: () => (
    <RangeCalendarRoot className={cn("w-fit")} visibleDuration={{ months: 3 }}>
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
  ),
};

// TODO: ADD Header with month and year dropdown
