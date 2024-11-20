import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button, buttonVariants } from "@projects/ui/button";

import { getArgTypes } from "~/utils/getArgTypes";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    ...getArgTypes(buttonVariants),
  },
  args: { onClick: fn(), children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};
