import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@projects/ui/button";
import { Checkbox, CheckboxGroup } from "@projects/ui/checkbox";
import { Description, FieldError, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Checkbox",
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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

export const Orientation: Story = {
  render: () => {
    return (
      <div className="space-y-3">
        <Label>Settings</Label>
        <CheckboxGroup orientation="horizontal">
          <Checkbox value="notifications">Enable notifications</Checkbox>
          <Checkbox value="auto_update">Auto-update applications</Checkbox>
          <Checkbox value="dark_mode">Enable dark mode</Checkbox>
          <Checkbox value="location_access">Allow location access</Checkbox>
          <Checkbox value="two_factor_auth">
            Enable two-factor authentication
          </Checkbox>
        </CheckboxGroup>
      </div>
    );
  },
};

export const ParentDescription: Story = {
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
        <Description>
          Select your settings which needs to be enabled
        </Description>
      </CheckboxGroup>
    );
  },
};

export const ChildrenDescription: Story = {
  render: () => {
    return (
      <CheckboxGroup>
        <Label>Shipping Method</Label>
        <Checkbox value="basic">
          <div>Basic</div>
          <Description>Basic plan with limited features</Description>
        </Checkbox>
        <Checkbox value="standard">
          <div>Standard</div>
          <Description>Standard plan with more features</Description>
        </Checkbox>
        <Checkbox value="premium">
          <div>Premium</div>
          <Description>Premium plan with all features</Description>
        </Checkbox>
        <Checkbox value="family">
          <div>Family</div>
          <Description>Family plan for multiple users</Description>
        </Checkbox>
        <Checkbox value="student">
          <div>Student</div>
          <Description>Discounted plan for students</Description>
        </Checkbox>
        <Checkbox value="custom">Custom</Checkbox>
        <Description>
          Select your preferred shipping method for the delivery of your items.
        </Description>
      </CheckboxGroup>
    );
  },
};

export const Validation: Story = {
  render: () => {
    return (
      <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <CheckboxGroup className="mb-4" isRequired>
          <Label>Settings</Label>
          <Checkbox value="notifications">Enable notifications</Checkbox>
          <Checkbox value="auto_update">Auto-update applications</Checkbox>
          <Checkbox value="dark_mode">Enable dark mode</Checkbox>
          <Checkbox value="location_access">Allow location access</Checkbox>
          <Checkbox value="two_factor_auth">
            Enable two-factor authentication
          </Checkbox>
          <FieldError />
        </CheckboxGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
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

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <CheckboxGroup defaultValue={["theme", "language"]}>
        <Label>Features</Label>
        <Checkbox value="theme">Theme</Checkbox>
        <Checkbox value="language">Language</Checkbox>
        <Checkbox value="timezone">Timezone</Checkbox>
        <Checkbox value="notifications">Notifications</Checkbox>
        <Checkbox value="privacy">Privacy</Checkbox>
      </CheckboxGroup>
    );
  },
};

export const Indeterminate: Story = {
  render: function Render(args) {
    return (
      <CheckboxGroup defaultValue={["theme", "language"]} {...args}>
        <Label>Features</Label>
        <Checkbox value="theme">Theme</Checkbox>
        <Checkbox value="language">Language</Checkbox>
        <Checkbox isIndeterminate value="timezone">
          Timezone
        </Checkbox>
        <Checkbox value="notifications">Notifications</Checkbox>
        <Checkbox value="privacy">Privacy</Checkbox>
      </CheckboxGroup>
    );
  },
};

export const Readonly: Story = {
  args: { isReadOnly: true },
  render: function Render(args) {
    return (
      <CheckboxGroup defaultValue={["theme", "language"]} {...args}>
        <Label>Features</Label>
        <Checkbox value="theme">Theme</Checkbox>
        <Checkbox value="language">Language</Checkbox>
        <Checkbox value="timezone">Timezone</Checkbox>
        <Checkbox value="notifications">Notifications</Checkbox>
        <Checkbox value="privacy">Privacy</Checkbox>
      </CheckboxGroup>
    );
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: function Render(args) {
    return (
      <CheckboxGroup defaultValue={["theme", "language"]} {...args}>
        <Label>Features</Label>
        <Checkbox value="theme">Theme</Checkbox>
        <Checkbox value="language">Language</Checkbox>
        <Checkbox value="timezone">Timezone</Checkbox>
        <Checkbox value="notifications">Notifications</Checkbox>
        <Checkbox value="privacy">Privacy</Checkbox>
      </CheckboxGroup>
    );
  },
};
