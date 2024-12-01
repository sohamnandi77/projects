import type { Meta, StoryObj } from "@storybook/react";

import { TextField, TextFieldInput } from "@projects/ui/input";

const meta = {
  title: "Components/TextFieldInput",
  component: TextFieldInput,
  subcomponents: {
    TextField: TextField as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "input"],
} satisfies Meta<typeof TextFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
