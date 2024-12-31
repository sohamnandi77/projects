import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  getLocalTimeZone,
  isWeekend,
  now,
  parseDate,
  parseZonedDateTime,
  today,
} from "@internationalized/date";
import { Calendar1Icon } from "lucide-react";

import type { DateValue } from "@projects/ui";
import { useDateFormatter, useLocale } from "@projects/ui";
import { Button } from "@projects/ui/button";
import {
  DateField,
  DateFieldGroup,
  DateInput,
  DateInputPrefix,
  DateInputSuffix,
  DateSegment,
} from "@projects/ui/date-field";
import { FieldError, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Date Field",
  component: DateField,
  subcomponents: {
    DateInput: DateInput as unknown as React.ComponentType<unknown>,
    DateSegment: DateSegment as unknown as React.ComponentType<unknown>,
    DateInputPrefix: DateInputPrefix as unknown as React.ComponentType<unknown>,
    DateInputSuffix: DateInputSuffix as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "date-and-time"],
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <DateField>
        <Label>Event date</Label>
        <DateFieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </DateFieldGroup>
      </DateField>
    );
  },
};

/**
 * You can also use the date field to select both date and time.
 */
export const DateTimeField: Story = {
  render: function Render() {
    const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
    const [value, setValue] = useState(today);

    return (
      <DateField
        hideTimeZone
        value={value}
        onChange={(value) => {
          if (value) setValue(value);
          else setValue(today);
        }}>
        <Label>Event date</Label>
        <DateFieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </DateFieldGroup>
      </DateField>
    );
  },
};

export const ReadOnly: Story = {
  render: function Render() {
    const now = today(getLocalTimeZone());
    return (
      <DateField
        isReadOnly
        className="mb-2"
        defaultValue={parseDate(now.toString())}>
        <Label>Event date</Label>
        <DateFieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </DateFieldGroup>
      </DateField>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const now = today(getLocalTimeZone());
    return (
      <DateField
        isDisabled
        className="mb-2"
        defaultValue={parseDate(now.toString())}>
        <Label>Event date</Label>
        <DateFieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </DateFieldGroup>
      </DateField>
    );
  },
};

export const Prefix: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <DateField isRequired className="mb-2">
          <Label>Event date</Label>
          <DateFieldGroup>
            <DateInputPrefix>
              <Calendar1Icon className="size-4" />
            </DateInputPrefix>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
        </DateField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Suffix: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <DateField isRequired className="mb-2">
          <Label>Event date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <DateInputSuffix asChild>
              <Calendar1Icon className="size-4" />
            </DateInputSuffix>
          </DateFieldGroup>
        </DateField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <DateField isRequired className="mb-2">
          <Label>Event date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
          <FieldError />
        </DateField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const MinAndMaxValidation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <DateField
          isRequired
          className="mb-2"
          minValue={today(getLocalTimeZone())}
          defaultValue={parseDate("2022-02-03")}>
          <Label>Appointment date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
          <FieldError />
        </DateField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const CustomValidation: Story = {
  render: function Render() {
    const { locale } = useLocale();

    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <DateField
          isRequired
          className="mb-2"
          defaultValue={parseDate("2023-10-28")}
          validate={(date) =>
            isWeekend(date, locale) ? "We are closed on weekends." : null
          }>
          <Label>Appointment date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
          <FieldError />
        </DateField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const now = today(getLocalTimeZone());
    const [value, setValue] = useState<DateValue | null>(
      parseDate(now.toString()),
    );
    const formatter = useDateFormatter({ dateStyle: "full" });

    return (
      <div className="space-y-3">
        <DateField className="mb-2" value={value} onChange={setValue}>
          <Label>Event date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
        </DateField>
        <div className="divide-y [&_p]:py-2">
          <p>
            {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
          </p>
          <p>{value ? value.toString() : "--"}</p>
        </div>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    const now = today(getLocalTimeZone());
    return (
      <div className="space-y-3">
        <DateField className="mb-2" defaultValue={parseDate(now.toString())}>
          <Label>Event date</Label>
          <DateFieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateFieldGroup>
        </DateField>
      </div>
    );
  },
};
