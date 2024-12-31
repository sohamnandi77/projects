import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "@projects/ui/button";
import { Description, FieldError, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { Radio, RadioGroup } from "@projects/ui/radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  subcomponents: {
    Radio: Radio,
  },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <RadioGroup>
      <Label>Features</Label>
      <Radio value="fs">Font size: Small, Medium, Large</Radio>
      <Radio value="dr">Display resolution: 1080p, 1440p, 4K</Radio>
      <Radio value="ss">Sound settings: Mute, Low, Medium, High</Radio>
      <Radio value="bi">Background image: Default, Custom</Radio>
      <Radio value="ks">Keyboard shortcuts: Enabled, Disabled</Radio>
    </RadioGroup>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div className="space-y-3">
      <Label>Payment Method</Label>
      <RadioGroup orientation="horizontal">
        <Radio value="credit-card">Credit Card</Radio>
        <Radio value="paypal">PayPal</Radio>
        <Radio value="apple-pay">Apple Pay</Radio>
        <Radio value="google-pay">Google Pay</Radio>
        <Radio value="bank-transfer">Bank Transfer</Radio>
      </RadioGroup>
    </div>
  ),
};

export const ParentDescription: Story = {
  render: () => (
    <RadioGroup>
      <Label>Shipping Method</Label>
      <Radio value="standard">Standard</Radio>
      <Radio value="express">Express</Radio>
      <Radio value="overnight">Overnight</Radio>
      <Radio value="international">International</Radio>
      <Radio value="pickup">Pickup</Radio>
      <Description>
        Select your preferred shipping method for the delivery of your items.
      </Description>
    </RadioGroup>
  ),
};

export const ChildrenDescription: Story = {
  render: () => (
    <RadioGroup>
      <Label>Shipping Method</Label>
      <Radio value="basic">
        <div>Basic</div>
        <Description>Basic plan with limited features</Description>
      </Radio>
      <Radio value="standard">
        <div>Standard</div>
        <Description>Standard plan with more features</Description>
      </Radio>
      <Radio value="premium">
        <div>Premium</div>
        <Description>Premium plan with all features</Description>
      </Radio>
      <Radio value="family">
        <div>Family</div>
        <Description>Family plan for multiple users</Description>
      </Radio>
      <Radio value="student">
        <div>Student</div>
        <Description>Discounted plan for students</Description>
      </Radio>
      <Radio value="custom">Custom</Radio>
      <Description>
        Select your preferred shipping method for the delivery of your items.
      </Description>
    </RadioGroup>
  ),
};

export const Validation: Story = {
  render: () => (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <RadioGroup isRequired>
        <Label>Features</Label>
        <Radio value="fs">Font size: Small, Medium, Large</Radio>
        <Radio value="dr">Display resolution: 1080p, 1440p, 4K</Radio>
        <Radio value="ss">Sound settings: Mute, Low, Medium, High</Radio>
        <Radio value="bi">Background image: Default, Custom</Radio>
        <Radio value="ks">Keyboard shortcuts: Enabled, Disabled</Radio>
        <FieldError />
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("");

    return (
      <div className="w-[350px]">
        <RadioGroup value={selected} onChange={setSelected}>
          <Label>Features</Label>
          <Radio value="theme">Theme</Radio>
          <Radio value="language">Language</Radio>
          <Radio value="timezone">Timezone</Radio>
          <Radio value="notifications">Notifications</Radio>
          <Radio value="privacy">Privacy</Radio>
          <Description className="mt-2 block [&>strong]:text-fg">
            You have selected: <strong>{selected}</strong>
          </Description>
        </RadioGroup>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <RadioGroup defaultValue="theme">
        <Label>Features</Label>
        <Radio value="theme">Theme</Radio>
        <Radio value="language">Language</Radio>
        <Radio value="timezone">Timezone</Radio>
        <Radio value="notifications">Notifications</Radio>
        <Radio value="privacy">Privacy</Radio>
      </RadioGroup>
    );
  },
};

export const Readonly: Story = {
  args: { isReadOnly: true },
  render: function Render(args) {
    return (
      <RadioGroup defaultValue="theme" {...args}>
        <Label>Features</Label>
        <Radio value="theme">Theme</Radio>
        <Radio value="language">Language</Radio>
        <Radio value="timezone">Timezone</Radio>
        <Radio value="notifications">Notifications</Radio>
        <Radio value="privacy">Privacy</Radio>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: function Render(args) {
    return (
      <RadioGroup defaultValue="theme" {...args}>
        <Label>Features</Label>
        <Radio value="theme">Theme</Radio>
        <Radio value="language">Language</Radio>
        <Radio value="timezone">Timezone</Radio>
        <Radio value="notifications">Notifications</Radio>
        <Radio value="privacy">Privacy</Radio>
      </RadioGroup>
    );
  },
};
