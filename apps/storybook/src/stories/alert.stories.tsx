import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@projects/ui/alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  subcomponents: {
    AlertIcon: AlertIcon as unknown as React.ComponentType<unknown>,
    AlertTitle: AlertTitle as unknown as React.ComponentType<unknown>,
    AlertDescription:
      AlertDescription as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryAlert: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <div className="md:w-96">
      <Alert {...args}>
        <AlertIcon variant="success" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a primary alert — check it out!
        </AlertDescription>
      </Alert>
    </div>
  ),
};
export const NoIndicator: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <div className="md:w-96">
      <Alert {...args}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a secondary alert — check it out!
        </AlertDescription>
      </Alert>
    </div>
  ),
};
