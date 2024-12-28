import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "@projects/ui/avatar";
import { Card } from "@projects/ui/card";
import { Skeleton } from "@projects/ui/skeleton";
import { Switch } from "@projects/ui/switch";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "statuses"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => <Skeleton {...args} className="size-8" />,
};

export const Shape: Story = {
  args: {
    shape: "circle",
  },
  render: (args) => <Skeleton {...args} className="size-8" />,
};

export const WithCard: Story = {
  render: () => (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton className="rounded-full">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/56152437" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Skeleton>
        <div className="space-y-1">
          <Skeleton className="h-3 w-56" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </Card>
  ),
};

export const WithChildren: Story = {
  render: () => (
    <div className="flex gap-4">
      <Skeleton isLoading className="rounded-full">
        <Switch />
      </Skeleton>
      <Skeleton isLoading={false}>
        <Switch />
      </Skeleton>
    </div>
  ),
};

/**
 * When using Skeleton with text, you’d usually wrap the text node itself rather than the parent element. This ensures that the text is replaced with a placeholder of the same size. The difference is especially noticeable when wrapping longer paragraphs:
 */
export const WithText: Story = {
  render: () => (
    <div className="w-[450px]">
      <div className="flex flex-col gap-4">
        <div className="leading-6 tracking-[inhert]">
          <Skeleton isLoading>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            ullam iure accusantium eos dolor! Culpa id aspernatur vel laudantium
            repellat necessitatibus fuga nisi ullam. Eveniet officiis eum
            aliquid a omnis.
          </Skeleton>
        </div>
        <Skeleton isLoading>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            ullam iure accusantium eos dolor! Culpa id aspernatur vel laudantium
            repellat necessitatibus fuga nisi ullam. Eveniet officiis eum
            aliquid a omnis.
          </div>
        </Skeleton>
      </div>
    </div>
  ),
};
