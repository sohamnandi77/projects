import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Label } from "@projects/ui/label";
import {
  ProgressBar,
  ProgressBarIndicator,
  ProgressBarRoot,
  ProgressBarTrack,
} from "@projects/ui/progress-bar";

const meta = {
  title: "Components/Progress Bar",
  component: ProgressBar,
  subcomponents: {
    ProgressBarRoot: ProgressBarRoot as unknown as React.ComponentType<unknown>,
    ProgressBarTrack:
      ProgressBarTrack as unknown as React.ComponentType<unknown>,
    ProgressBarIndicator:
      ProgressBarIndicator as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "statuses"],
} satisfies Meta<typeof ProgressBar>;

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

    return (
      <div className="w-[300px]">
        <ProgressBar className="group flex flex-col gap-2" value={value}>
          {({ valueText }) => (
            <div className="flex w-full justify-between">
              <Label>Loading...</Label>
              <span>{valueText}</span>
            </div>
          )}
        </ProgressBar>
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
      <ProgressBar className="group flex flex-col gap-2" value={50} {...args}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Loading</Label>
            <span>{valueText}</span>
          </div>
        )}
      </ProgressBar>
    </div>
  ),
};

export const DecimalFormat: Story = {
  render: () => (
    <div className="w-[300px]">
      <ProgressBar
        className="group flex flex-col gap-2"
        value={75.25}
        formatOptions={{
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Progress</Label>
            <span>{valueText}</span>
          </div>
        )}
      </ProgressBar>
    </div>
  ),
};

export const CurrencyFormat: Story = {
  render: () => (
    <div className="w-[300px]">
      <ProgressBar
        className="group flex flex-col gap-2"
        value={150}
        maxValue={1000}
        formatOptions={{
          style: "currency",
          currency: "JPY",
        }}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Sending…</Label>
            <span>{valueText}</span>
          </div>
        )}
      </ProgressBar>
    </div>
  ),
};

const getColor = (percentage?: number) => {
  if (!percentage) return "";

  if (percentage < 30) {
    return "bg-danger";
  }

  if (percentage < 50) {
    return "bg-warning";
  }

  if (percentage < 70) {
    return "bg-[#eab308]";
  }

  if (percentage < 80) {
    return "bg-primary";
  }

  return "bg-success";
};

export const Customization: Story = {
  render: function Render() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev < 100 ? prev + 1 : 100));
      }, 200);

      return () => clearInterval(interval);
    }, []);
    return (
      <div className="w-[300px]">
        <ProgressBarRoot className="group flex flex-col gap-2" value={value}>
          {({ valueText, percentage }) => (
            <>
              <ProgressBarTrack>
                <ProgressBarIndicator className={getColor(percentage)} />
              </ProgressBarTrack>
              <div className="flex w-full justify-between">
                <Label>Loading...</Label>
                <span>{valueText}</span>
              </div>
            </>
          )}
        </ProgressBarRoot>
      </div>
    );
  },
};
