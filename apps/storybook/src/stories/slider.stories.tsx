import type { Meta, StoryObj } from "@storybook/react";
import { useId, useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";

import { Label } from "@projects/ui/label";
import {
  Slider,
  SliderFillTrack,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "@projects/ui/slider";
import { Tooltip, TooltipContent } from "@projects/ui/tooltip";

const meta = {
  title: "Components/Slider",
  component: Slider,
  subcomponents: {
    SliderFillTrack,
    SliderOutput,
    SliderThumb,
    SliderTrack,
  },
  tags: ["autodocs", "controls"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          defaultValue={30}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Opacity</Label>
            <SliderOutput />
          </div>
          <SliderTrack>
            <SliderFillTrack />
            <SliderThumb />
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const SliderTooltip: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          defaultValue={30}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Opacity</Label>
            <SliderOutput />
          </div>
          <SliderTrack>
            {({ state }) => {
              return (
                <>
                  <SliderFillTrack />
                  <Tooltip delay={0}>
                    <TooltipContent>{state.values}</TooltipContent>
                    <SliderThumb />
                  </Tooltip>
                </>
              );
            }}
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const Step: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          formatOptions={{ style: "currency", currency: "USD" }}
          minValue={0}
          maxValue={100}
          step={5}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Amount</Label>
            <SliderOutput />
          </div>
          <SliderTrack>
            <SliderFillTrack />
            <SliderThumb />
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const VerticalOrientation: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          orientation="vertical"
          aria-label="Opacity"
          maxValue={1}
          step={0.01}
          className="flex h-[150px] flex-col items-start gap-2">
          <SliderTrack>
            <SliderFillTrack />
            <SliderThumb />
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          defaultValue={25}
          isDisabled
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Cookies to share</Label>
            <SliderOutput />
          </div>
          <SliderTrack>
            <SliderFillTrack />
            <SliderThumb />
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};

export const SuffixPrefix: Story = {
  render: () => {
    return (
      <div className="w-[550px]">
        <Slider
          defaultValue={25}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Cookies to share</Label>
            <SliderOutput />
          </div>
          <div className="flex w-full items-center justify-between space-x-3">
            <VolumeOff />
            <SliderTrack>
              <SliderFillTrack />
              <SliderThumb />
            </SliderTrack>
            <Volume2 />
          </div>
        </Slider>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [temperature, setTemperature] = useState<number | number[]>(31);
    const [saturation, setSaturation] = useState<number | number[]>([21, 86]);
    const id = useId();

    return (
      <div className="w-[550px] space-y-3">
        <Slider
          value={temperature}
          onChange={(v) => setTemperature(v)}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Temperature</Label>
            <SliderOutput />
          </div>
          <SliderTrack>
            <SliderFillTrack />
            <SliderThumb />
          </SliderTrack>
        </Slider>
        <Slider
          value={saturation}
          onChange={(v) => setSaturation(v)}
          className="flex w-3/5 flex-col items-start gap-2">
          <div className="flex w-full justify-between">
            <Label>Saturation</Label>
            <SliderOutput>
              {({ state }) =>
                state.values
                  .map((_, i) => state.getThumbValueLabel(i))
                  .join(" - ")
              }
            </SliderOutput>
          </div>
          <SliderTrack>
            {({ state }) => {
              return (
                <>
                  <SliderFillTrack />
                  {state.values.map((_, i) => (
                    <SliderThumb key={id} index={i} />
                  ))}
                </>
              );
            }}
          </SliderTrack>
        </Slider>
      </div>
    );
  },
};
