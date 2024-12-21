import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "@projects/ui/avatar";

const meta = {
  title: "Components/AvatarGroup",
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

export const Reversed: Story = {
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

export const CenterFocused: Story = {
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
