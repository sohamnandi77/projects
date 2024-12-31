import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@projects/ui/label";
import {
  Meter,
  MeterIndicator,
  MeterRoot,
  MeterTrack,
} from "@projects/ui/meter";

const meta = {
  title: "Components/Meter",
  component: Meter,
  subcomponents: {
    MeterRoot,
    MeterTrack,
    MeterIndicator,
  },
  tags: ["autodocs", "statuses"],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="w-[300px]">
      <Meter className="group flex flex-col gap-2" value={50}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Storage space</Label>
            <span>{valueText}</span>
          </div>
        )}
      </Meter>
    </div>
  ),
};

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Meter className="group flex flex-col gap-2" value={50} {...args}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Storage space</Label>
            <span>{valueText}</span>
          </div>
        )}
      </Meter>
    </div>
  ),
};

export const DecimalFormat: Story = {
  render: () => (
    <div className="w-[300px]">
      <Meter
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
      </Meter>
    </div>
  ),
};

export const CurrencyFormat: Story = {
  render: () => (
    <div className="w-[300px]">
      <Meter
        className="group flex flex-col gap-2"
        value={150}
        maxValue={1000}
        formatOptions={{
          style: "currency",
          currency: "USD",
        }}>
        {({ valueText }) => (
          <div className="flex w-full justify-between">
            <Label>Progress</Label>
            <span>{valueText}</span>
          </div>
        )}
      </Meter>
    </div>
  ),
};

export const Customization: Story = {
  render: () => (
    <div className="w-[300px]">
      <MeterRoot className="group flex flex-col gap-2" value={60}>
        {({ valueText }) => (
          <>
            <MeterTrack>
              <MeterIndicator className="bg-red-500" />
            </MeterTrack>
            <div className="flex w-full justify-between">
              <Label>Progress</Label>
              <span>{valueText}</span>
            </div>
          </>
        )}
      </MeterRoot>
    </div>
  ),
};
