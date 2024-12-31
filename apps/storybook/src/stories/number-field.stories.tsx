import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

import { Button } from "@projects/ui/button";
import { Description, Form } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  StepperButton,
  StepperButtonGroup,
} from "@projects/ui/number-field";

const meta = {
  title: "Components/Number Field",
  component: NumberField,
  subcomponents: {
    NumberFieldGroup,
    NumberFieldInput,
    StepperButton,
    StepperButtonGroup,
  },
  tags: ["autodocs", "forms"],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    return (
      <NumberField>
        <Label>Cookies</Label>
        <NumberFieldGroup>
          <NumberFieldInput />
          <StepperButtonGroup orientation="vertical">
            <StepperButton slot="increment">
              <ChevronUp className="size-4 stroke-[2]" />
            </StepperButton>
            <StepperButton slot="decrement">
              <ChevronDown className="size-4 stroke-[2]" />
            </StepperButton>
          </StepperButtonGroup>
        </NumberFieldGroup>
      </NumberField>
    );
  },
};

export const Orientation: Story = {
  render: function Render() {
    return (
      <NumberField>
        <Label>Cookies</Label>
        <NumberFieldGroup>
          <StepperButtonGroup orientation="horizontal">
            <StepperButton slot="decrement">
              <Minus className="size-4 stroke-[2]" />
            </StepperButton>
            <NumberFieldInput />
            <StepperButton slot="increment">
              <Plus className="size-4 stroke-[2]" />
            </StepperButton>
          </StepperButtonGroup>
        </NumberFieldGroup>
      </NumberField>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [number, setNumber] = useState(1280);
    return (
      <div>
        <NumberField value={number} onChange={setNumber}>
          <Label>Width</Label>
          <NumberFieldGroup>
            <StepperButtonGroup orientation="horizontal">
              <StepperButton slot="decrement">
                <Minus className="size-4 stroke-[2]" />
              </StepperButton>
              <NumberFieldInput />
              <StepperButton slot="increment">
                <Plus className="size-4 stroke-[2]" />
              </StepperButton>
            </StepperButtonGroup>
          </NumberFieldGroup>
        </NumberField>
        <Description className="mt-2 block [&>strong]:text-fg">
          You have typed: <strong>{number}</strong>
        </Description>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: function Render() {
    return (
      <NumberField defaultValue={1997}>
        <Label>Width</Label>
        <NumberFieldGroup>
          <StepperButtonGroup orientation="horizontal">
            <StepperButton slot="decrement">
              <Minus className="size-4 stroke-[2]" />
            </StepperButton>
            <NumberFieldInput />
            <StepperButton slot="increment">
              <Plus className="size-4 stroke-[2]" />
            </StepperButton>
          </StepperButtonGroup>
        </NumberFieldGroup>
      </NumberField>
    );
  },
};

export const Validation: Story = {
  render: function Render() {
    return (
      <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <NumberField isRequired>
          <Label>Cookies</Label>
          <NumberFieldGroup>
            <NumberFieldInput />
            <StepperButtonGroup orientation="vertical">
              <StepperButton slot="increment">
                <ChevronUp className="size-4 stroke-[2]" />
              </StepperButton>
              <StepperButton slot="decrement">
                <ChevronDown className="size-4 stroke-[2]" />
              </StepperButton>
            </StepperButtonGroup>
          </NumberFieldGroup>
        </NumberField>
        <NumberField isRequired>
          <Label>Cookies</Label>
          <NumberFieldGroup>
            <StepperButtonGroup orientation="horizontal">
              <StepperButton slot="decrement">
                <Minus className="size-4 stroke-[2]" />
              </StepperButton>
              <NumberFieldInput />
              <StepperButton slot="increment">
                <Plus className="size-4 stroke-[2]" />
              </StepperButton>
            </StepperButtonGroup>
          </NumberFieldGroup>
        </NumberField>
        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <div className="space-y-4">
        <NumberField isDisabled>
          <Label>Cookies</Label>
          <NumberFieldGroup>
            <NumberFieldInput />
            <StepperButtonGroup orientation="vertical">
              <StepperButton slot="increment">
                <ChevronUp className="size-4 stroke-[2]" />
              </StepperButton>
              <StepperButton slot="decrement">
                <ChevronDown className="size-4 stroke-[2]" />
              </StepperButton>
            </StepperButtonGroup>
          </NumberFieldGroup>
        </NumberField>
        <NumberField isDisabled>
          <Label>Cookies</Label>
          <NumberFieldGroup>
            <StepperButtonGroup orientation="horizontal">
              <StepperButton slot="decrement">
                <Minus className="size-4 stroke-[2]" />
              </StepperButton>
              <NumberFieldInput />
              <StepperButton slot="increment">
                <Plus className="size-4 stroke-[2]" />
              </StepperButton>
            </StepperButtonGroup>
          </NumberFieldGroup>
        </NumberField>
      </div>
    );
  },
};
