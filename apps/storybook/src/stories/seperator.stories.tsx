import type { Meta, StoryObj } from "@storybook/react";

import { cn } from "@projects/ui/lib/utils";
import { Separator } from "@projects/ui/separator";

const meta = {
  title: "Components/Separator",
  component: Separator,

  tags: ["autodocs", "surfaces"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">
          React Aria Components
        </h4>
        <p className="text-sm text-muted-fg">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Orientation: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => {
    return (
      <div
        className={cn(
          "flex h-5 items-center",
          args.orientation === "vertical"
            ? "flex-row space-x-2"
            : "flex-col space-y-2",
        )}>
        <div>Blog</div>
        <Separator {...args} />
        <div>Docs</div>
      </div>
    );
  },
};
