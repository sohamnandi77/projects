import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@projects/ui/button";
import { Link } from "@projects/ui/link";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs", "navigation"],
  args: {
    target: "_blank",
    href: "https://example.com",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => <Link {...args}>Label</Link>,
};

export const AsAButton: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <div className="flex gap-2">
      <Link {...args}>
        <Button>Link</Button>
      </Link>
      <Link>
        <Button appearance="outline">Link</Button>
      </Link>
      <Link>
        <Button appearance="plain" shape="circle">
          Link
        </Button>
      </Link>
    </div>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Link {...args} variant="primary">
        This is a Primary Link
      </Link>
      <Link {...args} variant="secondary">
        This is a Secondary Link
      </Link>
      <Link {...args} variant="unstyled">
        This is a Unstyled Link
      </Link>
      <Link {...args} variant="primary-hover">
        This is a Primary-hover Link
      </Link>
      <Link {...args} variant="danger">
        This is a Danger Link
      </Link>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    isDisabled: true,
  },
  render: (args) => <Link {...args}>Link </Link>,
};
