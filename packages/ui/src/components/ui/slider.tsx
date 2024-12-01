import type {
  SliderOutputProps as AriaSliderOutputProps,
  SliderProps as AriaSliderProps,
  SliderThumbProps as AriaSliderThumbProps,
  SliderTrackProps as AriaSliderTrackProps,
} from "react-aria-components";
import * as React from "react";
import {
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderStateContext as AriaSliderStateContext,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import { labelVariants } from "./label";

const SliderOutput = (props: AriaSliderOutputProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderOutput className={cn(labelVariants(), className)} {...rest} />
  );
};

const Slider = (props: AriaSliderProps) => {
  const { className, orientation = "horizontal", ...rest } = props;
  return (
    <AriaSlider
      className={composeTailwindRenderProps(
        cn("relative flex touch-none select-none items-center", {
          "h-full": orientation === "vertical",
          "w-full": orientation === "horizontal",
        }),
        className,
      )}
      orientation={orientation}
      {...rest}
    />
  );
};

const SliderTrack = (props: AriaSliderTrackProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderTrack
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          {
            "h-2 w-full": renderProps.orientation === "horizontal",
            "h-full w-2": renderProps.orientation === "vertical",
          },
          "relative grow rounded-full bg-secondary",
          /* Disabled */
          "disabled:opacity-50",
          className,
        ),
      )}
      {...rest}
    />
  );
};

const useSliderState = () => {
  const state = React.useContext(AriaSliderStateContext);
  if (state === null) {
    throw new Error("Slider components must be used within a Slider");
  }
  return state;
};

const SliderFillTrack = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  const state = useSliderState();
  const orientation = state.orientation === "vertical" ? "height" : "width";
  return (
    <div
      style={{ [orientation]: state.getThumbPercent(0) * 100 + "%" }}
      className={cn(
        "absolute rounded-full bg-primary",
        {
          "h-full": state.orientation === "horizontal",
          "bottom-0 w-full": state.orientation === "vertical",
        },
        className,
      )}
      {...rest}
    />
  );
};

const SliderThumb = (props: AriaSliderThumbProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderThumb
      className={composeTailwindRenderProps(
        cn(
          "left-1/2 top-1/2 block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors",
          /* Disabled */
          "disabled:pointer-events-none",
          /* Focus Visible */
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ),
        className,
      )}
      {...rest}
    />
  );
};

export { Slider, SliderFillTrack, SliderOutput, SliderThumb, SliderTrack };
