import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@projects/ui/avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: {
    AvatarImage,
    AvatarFallback,
  },
  tags: ["autodocs", "media"],
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

export const AvatarGroup: Story = {
  render: (args) => (
    <div className="flex -space-x-3 *:ring *:ring-fg">
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-01.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-02.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-03.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const GroupReversed: Story = {
  render: (args) => (
    <div className="flex flex-row-reverse justify-end -space-x-3 space-x-reverse *:ring *:ring-fg">
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-04.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-05.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-06.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const GroupCenterFocused: Story = {
  render: (args) => (
    <div className="z-0 flex items-center -space-x-2 *:ring *:ring-fg">
      <Avatar className="z-0 size-8" {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-07.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="z-10 size-10" {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-08.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="z-20 size-14" {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-09.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="z-10 size-10" {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-10.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
      <Avatar className="z-0 size-8" {...args}>
        <AvatarImage src="https://mynaui.com/avatars/avatar-11.jpg" />
        <AvatarFallback>SN</AvatarFallback>
      </Avatar>
    </div>
  ),
};
