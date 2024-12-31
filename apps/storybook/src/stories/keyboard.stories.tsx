import type { Meta, StoryObj } from "@storybook/react";

import { Keyboard } from "@projects/ui/keyboard";

const meta = {
  title: "Components/Keyboard",
  component: Keyboard,
  tags: ["autodocs", "controls"],
  args: {
    keys: "⌘s",
  },
} satisfies Meta<typeof Keyboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Keyboard keys="⌘s">⌘V</Keyboard>,
};
