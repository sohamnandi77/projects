import type { Meta, StoryObj } from "@storybook/react";

import { AspectRatio } from "@projects/ui/aspect-ratio";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: {
        type: "number",
        min: 0,
        step: 0.1,
      },
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-96">
      <AspectRatio {...args}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
          alt="Drew Beamer's work"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

const RATIO = ["16x9", "3x2", "4x3", "1x1", "3x4", "2x3", "9x16"] as const;

export const Horizontal: Story = {
  render: () => {
    return (
      <div className="flex w-[1000px] space-x-5">
        {RATIO.map((ratio) => {
          const [width = 1, height = 1] = ratio.split("x").map(Number);
          return (
            <div key={ratio} className="w-full">
              <AspectRatio ratio={width / height}>
                <img
                  src={`https://placehold.co/${width * 100}x${height * 100}/png?text=${height}x${width}`}
                  alt="Sample"
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          );
        })}
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className="flex w-[1000px] space-x-5">
        {RATIO.map((ratio) => {
          const [height = 1, width = 1] = ratio.split("x").map(Number);
          return (
            <div key={ratio} className="w-full">
              <AspectRatio ratio={width / height}>
                <img
                  src={`https://placehold.co/${width * 100}x${height * 100}/png?text=${height}x${width}`}
                  alt="Sample"
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
            </div>
          );
        })}
      </div>
    );
  },
};
