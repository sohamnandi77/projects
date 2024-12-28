import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@projects/ui/button";
import { Checkbox, CheckboxGroup } from "@projects/ui/checkbox";
import { Description, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxGroup: CheckboxGroup as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Checkbox>
      <Label>Enable Notifications</Label>
    </Checkbox>
  ),
};

export const CheckboxDescription: Story = {
  render: () => (
    <Checkbox>
      <Label>Postal Mail</Label>
      <Description>Receive notifications via postal mail</Description>
    </Checkbox>
  ),
};

export const CheckboxInvalid: Story = {
  args: { isInvalid: true },
  render: (args) => (
    <Checkbox {...args}>
      <Label>Postal Mail</Label>
      <Description>Receive notifications via postal mail</Description>
    </Checkbox>
  ),
};

export const ReadOnly: Story = {
  args: { isReadOnly: true },
  render: (args) => (
    <Checkbox {...args}>
      <Label>Postal Mail</Label>
      <Description>Receive notifications via postal mail</Description>
    </Checkbox>
  ),
};

export const CheckboxIndeterminate: Story = {
  args: { isIndeterminate: true },
  render: (args) => (
    <Checkbox {...args}>
      <Label>Postal Mail</Label>
      <Description>Receive notifications via postal mail</Description>
    </Checkbox>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(false);
    return (
      <>
        <Checkbox isSelected={selected} onChange={setSelected}>
          <Label> Receive Updates</Label>
        </Checkbox>
        <Description className="mt-2 block [&>strong]:text-fg">
          You have <strong>{selected ? "enabled" : "disabled"}</strong> the
          option.
        </Description>
      </>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <Checkbox defaultSelected>
        <Label>Receive Updates</Label>
      </Checkbox>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Checkbox isDisabled>
        <Label>Receive Updates</Label>
      </Checkbox>
    );
  },
};

export const CheckboxGroupBasic: Story = {
  render: () => {
    return (
      <CheckboxGroup>
        <Label>Settings</Label>
        <Checkbox value="notifications">Enable notifications</Checkbox>
        <Checkbox value="auto_update">Auto-update applications</Checkbox>
        <Checkbox value="dark_mode">Enable dark mode</Checkbox>
        <Checkbox value="location_access">Allow location access</Checkbox>
        <Checkbox value="two_factor_auth">
          Enable two-factor authentication
        </Checkbox>
      </CheckboxGroup>
    );
  },
};

export const CheckboxGroupValidation: Story = {
  render: () => {
    return (
      <Form onSubmit={(e) => e.preventDefault()}>
        <CheckboxGroup className="mb-4" isRequired>
          <Label>Settings</Label>
          <Checkbox value="notifications">Enable notifications</Checkbox>
          <Checkbox value="auto_update">Auto-update applications</Checkbox>
          <Checkbox value="dark_mode">Enable dark mode</Checkbox>
          <Checkbox value="location_access">Allow location access</Checkbox>
          <Checkbox value="two_factor_auth">
            Enable two-factor authentication
          </Checkbox>
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const CheckboxGroupControlled: Story = {
  render: function Render() {
    const [values, setValues] = useState<string[]>([]);

    return (
      <div className="w-[380px]">
        <CheckboxGroup value={values} onChange={setValues}>
          <Label>Options</Label>
          <Checkbox value="sound">Sound</Checkbox>
          <Checkbox value="wifi">Wi-Fi</Checkbox>
          <Checkbox value="sync">Sync</Checkbox>
        </CheckboxGroup>
        <Description className="mt-2 flex h-10 flex-col gap-y-1 [&>strong]:font-medium [&>strong]:text-fg">
          {values.length > 0 ? (
            <>
              Selected values{" "}
              <strong className="font-medium">{values.join(", ")}</strong>
            </>
          ) : (
            "No values selected"
          )}
        </Description>
      </div>
    );
  },
};
