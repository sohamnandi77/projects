import type { Meta, StoryObj } from "@storybook/react";

import type { BadgeProps } from "@projects/ui/badge";
import { Badge, BadgeOptionsKey } from "@projects/ui/badge";

import { getArgTypes } from "~/utils/getArgTypes";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs", "statuses"],
  argTypes: {
    ...getArgTypes(BadgeOptionsKey),
  },
  args: {
    children: "Label",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className="space-x-2">
        {Object.keys(BadgeOptionsKey.variant).map((variant) => (
          <Badge
            key={variant}
            {...args}
            variant={variant as BadgeProps["variant"]}
          />
        ))}
      </div>
    );
  },
};

export const Square: Story = {
  args: {
    shape: "square",
  },
  render: (args) => {
    return (
      <div className="space-x-2">
        {Object.keys(BadgeOptionsKey.variant).map((variant) => (
          <Badge
            key={variant}
            {...args}
            variant={variant as BadgeProps["variant"]}
          />
        ))}
      </div>
    );
  },
};
