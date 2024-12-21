import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@projects/ui/avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: {
    AvatarImage: AvatarImage as unknown as React.ComponentType<unknown>,
    AvatarFallback: AvatarFallback as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
      <AvatarFallback>SN</AvatarFallback>
    </Avatar>
  ),
};

export const Initials: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>SN</AvatarFallback>
    </Avatar>
  ),
};

export const Icons: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Avatar {...args}>
        <AvatarFallback>
          <User className="size-1/2 stroke-2 text-muted-fg" />
        </AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>
          <ShoppingBag className="size-1/2 stroke-2 text-muted-fg" />
        </AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>J</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const ImageSizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar className="size-4" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="size-6" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="size-8" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="size-12" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="size-14" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="size-16" {...args}>
        <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
    </div>
  ),
};
