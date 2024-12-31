import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@projects/ui/button";
import { Description, Form } from "@projects/ui/form";
import { TextAreaInput, TextField } from "@projects/ui/input";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Text Area",
  component: TextAreaInput,
  subcomponents: { TextField },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-[350px]">
        <TextField value={value} onChange={setValue} className="mb-2">
          <Label>Name</Label>
          <TextAreaInput placeholder="Type something..." />
          <Description className="mt-2 block [&>strong]:text-fg">
            You have typed: <strong>{value}</strong>
          </Description>
        </TextField>
      </div>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <div className="w-[350px]">
        <Form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <TextField isRequired>
            <Label>Name</Label>
            <TextAreaInput />
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="w-[350px]">
        <TextField value={value} onChange={setValue} className="mb-2">
          <Label>Name</Label>
          <TextAreaInput />
          <Description className="mt-2 block [&>strong]:text-fg">
            You have typed: <strong>{value}</strong>
          </Description>
        </TextField>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <div className="w-[350px]">
        <TextField defaultValue="John Doe" className="mb-2">
          <Label>Name</Label>
          <TextAreaInput />
        </TextField>
      </div>
    );
  },
};

export const Readonly: Story = {
  render: function Render() {
    return (
      <div className="w-[350px]">
        <TextField isReadOnly className="mb-2">
          <Label>Name</Label>
          <TextAreaInput />
        </TextField>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <div className="w-[350px]">
        <TextField isDisabled defaultValue="John Doe" className="mb-2">
          <Label>Name</Label>
          <TextAreaInput />
        </TextField>
      </div>
    );
  },
};
