import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Eye, EyeOff, Plus, X } from "lucide-react";

import { Button } from "@projects/ui/button";
import { Description, Form } from "@projects/ui/form";
import {
  TextField,
  TextFieldGroup,
  TextFieldInput,
  TextFieldInputPrefix,
  TextFieldInputSuffix,
} from "@projects/ui/input";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Text Field",
  component: TextFieldInput,
  subcomponents: { TextField },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof TextFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <TextField value={value} onChange={setValue} className="mb-2">
        <Label>Name</Label>
        <TextFieldGroup>
          <TextFieldInput placeholder="Type something..." />
        </TextFieldGroup>
        <Description className="mt-2 block [&>strong]:text-fg">
          You have typed: <strong>{value}</strong>
        </Description>
      </TextField>
    );
  },
};

export const SuffixAndPrefix: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-4">
        <TextField className="mb-2">
          <Label>Twitter</Label>
          <TextFieldGroup>
            <TextFieldInput placeholder="@" />
            <TextFieldInputSuffix>
              <X className="size-4" />
            </TextFieldInputSuffix>
          </TextFieldGroup>
        </TextField>
        <TextField className="mb-2">
          <Label>Twitter</Label>
          <TextFieldGroup>
            <TextFieldInputPrefix>https://</TextFieldInputPrefix>
            <TextFieldInput />
            <TextFieldInputSuffix>.com</TextFieldInputSuffix>
          </TextFieldGroup>
        </TextField>
      </div>
    );
  },
};

export const SuffixWithButton: Story = {
  render: function Render() {
    return (
      <TextField className="mb-2">
        <Label>Username</Label>
        <TextFieldGroup>
          <TextFieldInput />
          <TextFieldInputSuffix>
            <Button aria-label="New user" appearance="outline">
              <Plus className="size-4" />
            </Button>
          </TextFieldInputSuffix>
        </TextFieldGroup>
      </TextField>
    );
  },
};

export const PasswordField: Story = {
  render: function Render() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <TextField className="mb-2" type={showPassword ? "text" : "password"}>
        <Label>Password</Label>
        <TextFieldGroup>
          <TextFieldInput />
          <TextFieldInputSuffix>
            <Button
              aria-label="New user"
              appearance="outline"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Button>
          </TextFieldInputSuffix>
        </TextFieldGroup>
      </TextField>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <Form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <TextField isRequired>
          <Label>Name</Label>
          <TextFieldGroup>
            <TextFieldInput />
          </TextFieldGroup>
        </TextField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <TextField value={value} onChange={setValue} className="mb-2">
        <Label>Name</Label>
        <TextFieldGroup>
          <TextFieldInput />
        </TextFieldGroup>
        <Description className="mt-2 block [&>strong]:text-fg">
          You have typed: <strong>{value}</strong>
        </Description>
      </TextField>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <TextField defaultValue="John Doe" className="mb-2">
        <Label>Name</Label>
        <TextFieldGroup>
          <TextFieldInput />
        </TextFieldGroup>
      </TextField>
    );
  },
};

export const Readonly: Story = {
  render: function Render() {
    return (
      <TextField isReadOnly className="mb-2">
        <Label>Name</Label>
        <TextFieldGroup>
          <TextFieldInput />
        </TextFieldGroup>
      </TextField>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <TextField isDisabled defaultValue="John Doe" className="mb-2">
        <Label>Name</Label>
        <TextFieldGroup>
          <TextFieldInput />
        </TextFieldGroup>
      </TextField>
    );
  },
};
