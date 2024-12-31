import type { Meta, StoryObj } from "@storybook/react";
import { useId, useState } from "react";

import { Button } from "@projects/ui/button";
import { Description, FieldError, Form } from "@projects/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@projects/ui/input-otp";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Input OTP",
  component: InputOTP,
  subcomponents: { InputOTPGroup, InputOTPSlot, InputOTPSeparator },
  tags: ["autodocs", "forms"],
  args: {
    maxLength: 6,
    children: <></>,
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputSlots = Array.from({ length: 6 }, (_, i) => i + 1);

export const Basic: Story = {
  render: function Render() {
    const id = useId();
    return (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          {InputSlots.map((_, index) => (
            <InputOTPSlot key={id} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const Separator: Story = {
  render: function Render() {
    return (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    const id = useId();
    return (
      <div className="space-y-2">
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            {InputSlots.map((_, index) => (
              <InputOTPSlot key={id} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    const id = useId();
    return (
      <Form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
        <Label>One-Time Password</Label>
        <InputOTP required maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            {InputSlots.map((_, index) => (
              <InputOTPSlot key={id} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div>
          <Description>
            Please enter the one-time password sent to your phone.
          </Description>
          <FieldError />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};
