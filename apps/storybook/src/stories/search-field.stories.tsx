import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@projects/ui/button";
import { Description, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { SearchField, SearchFieldInput } from "@projects/ui/search-field";

const meta = {
  title: "Components/Search Field",
  component: SearchField,
  subcomponents: { SearchFieldInput },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <SearchField>
        <Label>Search</Label>
        <SearchFieldInput />
      </SearchField>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <Form className="space-y-2">
        <SearchField isRequired>
          <Label>Name</Label>
          <SearchFieldInput />
        </SearchField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Pending: Story = {
  args: { isPending: true },
  render: (args) => {
    return (
      <SearchField {...args}>
        <SearchFieldInput />
      </SearchField>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");

    return (
      <SearchField value={value} onChange={setValue}>
        <SearchFieldInput />
        <Description className="mt-2 block [&>strong]:text-fg">
          You have typed: <strong>{value}</strong>
        </Description>
      </SearchField>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <SearchField defaultValue="Hello">
        <SearchFieldInput />
      </SearchField>
    );
  },
};

export const Readonly: Story = {
  args: { isReadOnly: true },
  render: (args) => {
    return (
      <SearchField {...args}>
        <SearchFieldInput />
      </SearchField>
    );
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => {
    return (
      <SearchField {...args}>
        <SearchFieldInput />
      </SearchField>
    );
  },
};
