import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "@projects/ui/calendar";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => <Calendar {...args} />,
};
