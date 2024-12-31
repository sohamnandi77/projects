import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Label } from "@projects/ui/label";
import { cn } from "@projects/ui/lib/utils";
import {
  ProgressCircle,
  ProgressCircleIndicator,
  ProgressCircleRoot,
  ProgressCircleTrack,
} from "@projects/ui/progress-circle";

const meta = {
  title: "Components/Progress Circle",
  component: ProgressCircle,
  subcomponents: {
    ProgressCircleRoot,
    ProgressCircleTrack,
    ProgressCircleIndicator,
  },
  tags: ["autodocs", "statuses"],
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev < 100 ? prev + 1 : 100));
      }, 200);

      return () => clearInterval(interval);
    }, []);

    const getPercentage = (percentage: number) => {
      if (percentage < 10) return "left-[8.75rem]";
      if (percentage < 100) return "left-[8.5rem]";
      return "left-[8.25rem]";
    };

    return (
      <div className="w-[300px]">
        <ProgressCircle
          className="group relative flex size-20 w-full flex-col gap-2"
          value={value}>
          {({ valueText, percentage = 0 }) => {
            const value = getPercentage(percentage);
            return (
              <div className="flex items-center justify-center">
                <Label>Loading...</Label>
                <span className={cn("absolute top-14", value)}>
                  {valueText}
                </span>
              </div>
            );
          }}
        </ProgressCircle>
      </div>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <ProgressCircle
        className="group flex size-20 flex-col gap-2"
        value={50}
        {...args}>
        {() => (
          <div className="flex w-full justify-between">
            <Label>Loading...</Label>
          </div>
        )}
      </ProgressCircle>
    </div>
  ),
};
