import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Time } from "@internationalized/date";
import { Clock } from "lucide-react";

import { Button } from "@projects/ui/button";
import {
  DateInput,
  DateInputPrefix,
  DateInputSuffix,
  DateSegment,
  TimeField,
  TimeInput,
} from "@projects/ui/date-field";
import { FieldError, FieldGroup, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { Switch } from "@projects/ui/switch";

const meta = {
  title: "Components/Time Field",
  component: TimeField,
  subcomponents: {
    DateInput,
    DateSegment,
    DateInputPrefix,
    DateInputSuffix,
  },
  tags: ["autodocs", "date-and-time"],
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <TimeField>
        <Label>Event time</Label>
        <FieldGroup>
          <TimeInput>
            {(segment) => <DateSegment segment={segment} />}
          </TimeInput>
        </FieldGroup>
      </TimeField>
    );
  },
};

export const HourCycle: Story = {
  render: function Render() {
    const [hc, setHc] = useState<12 | 24>(24);
    const [value, setValue] = useState<Time | null>(new Time(13, 45));

    return (
      <div className="space-y-4">
        <TimeField
          value={value}
          onChange={(newValue) => setValue(newValue)}
          hourCycle={hc}>
          <Label>Event time</Label>
          <FieldGroup>
            <TimeInput>
              {(segment) => <DateSegment segment={segment} />}
            </TimeInput>
          </FieldGroup>
        </TimeField>
        <Switch
          isSelected={hc === 24}
          onChange={() => setHc((prevHc) => (prevHc === 24 ? 12 : 24))}>
          {hc} hour
        </Switch>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: function Render() {
    return (
      <TimeField isReadOnly className="mb-2" defaultValue={new Time()}>
        <Label>Event time</Label>
        <FieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </FieldGroup>
      </TimeField>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <TimeField isDisabled className="mb-2" defaultValue={new Time()}>
        <Label>Event time</Label>
        <FieldGroup>
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </FieldGroup>
      </TimeField>
    );
  },
};

export const Prefix: Story = {
  render: function Render() {
    return (
      <TimeField defaultValue={new Time()}>
        <Label>Event time</Label>
        <FieldGroup>
          <DateInputPrefix>UTC</DateInputPrefix>
          <TimeInput>
            {(segment) => <DateSegment segment={segment} />}
          </TimeInput>
        </FieldGroup>
      </TimeField>
    );
  },
};

export const Suffix: Story = {
  render: function Render() {
    return (
      <TimeField defaultValue={new Time()}>
        <Label>Event time</Label>
        <FieldGroup>
          <TimeInput>
            {(segment) => <DateSegment segment={segment} />}
          </TimeInput>
          <DateInputSuffix>
            <Clock className="size-4" />
          </DateInputSuffix>
        </FieldGroup>
      </TimeField>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <TimeField isRequired className="mb-2">
          <Label>Event time</Label>
          <FieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </FieldGroup>
          <FieldError />
        </TimeField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const MinAndMaxValidation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <TimeField
          isRequired
          className="mb-2"
          minValue={new Time(9)}
          maxValue={new Time(17)}
          defaultValue={new Time(8)}>
          <Label>Meeting time</Label>
          <FieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </FieldGroup>
          <FieldError />
        </TimeField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const CustomValidation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <TimeField
          isRequired
          className="mb-2"
          validate={(time) =>
            time.minute % 15 !== 0 ? "Meetings start every 15 minutes." : null
          }
          defaultValue={new Time(9, 25)}>
          <Label>Meeting time</Label>
          <FieldGroup>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </FieldGroup>
          <FieldError />
        </TimeField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Time | null>(new Time(11, 45));

    return (
      <div className="space-y-3">
        <TimeField className="mb-2" value={value} onChange={setValue}>
          <Label>Event time</Label>
          <FieldGroup>
            <TimeInput>
              {(segment) => <DateSegment segment={segment} />}
            </TimeInput>
          </FieldGroup>
        </TimeField>
        <div className="[&_p]:py-2">
          <p>{value ? value.toString() : "--"}</p>
        </div>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <div className="space-y-3">
        <TimeField className="mb-2" defaultValue={new Time(9, 25)}>
          <Label>Event time</Label>
          <FieldGroup>
            <TimeInput>
              {(segment) => <DateSegment segment={segment} />}
            </TimeInput>
          </FieldGroup>
        </TimeField>
      </div>
    );
  },
};
