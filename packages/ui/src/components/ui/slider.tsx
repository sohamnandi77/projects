import * as React from "react";
import {
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderOutputProps as AriaSliderOutputProps,
  SliderProps as AriaSliderProps,
  SliderStateContext as AriaSliderStateContext,
  SliderThumb as AriaSliderThumb,
  SliderThumbProps as AriaSliderThumbProps,
  SliderTrack as AriaSliderTrack,
  SliderTrackProps as AriaSliderTrackProps,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

import { labelVariants } from "./field";

const SliderOutput = ({ className, ...props }: AriaSliderOutputProps) => (
  <AriaSliderOutput className={cn(labelVariants(), className)} {...props} />
);

const Slider = ({
  className,
  orientation = "horizontal",
  ...props
}: AriaSliderProps) => (
  <AriaSlider
    className={composeRenderProps(className, (className) =>
      cn(
        "relative flex touch-none select-none items-center",
        {
          "h-full": orientation === "vertical",
          "w-full": orientation === "horizontal",
        },
        className,
      ),
    )}
    orientation={orientation}
    {...props}
  />
);

const SliderTrack = ({ className, ...props }: AriaSliderTrackProps) => (
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
    {...props}
  />
);

const SliderFillTrack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  let state = React.useContext(AriaSliderStateContext)!;
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
      {...props}
    />
  );
};

const SliderThumb = ({ className }: AriaSliderThumbProps) => (
  <AriaSliderThumb
    className={composeRenderProps(className, (className) =>
      cn(
        "left-1/2 top-1/2 block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors",
        /* Disabled */
        "disabled:pointer-events-none",
        /* Focus Visible */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      ),
    )}
  />
);

export { Slider, SliderFillTrack, SliderOutput, SliderThumb, SliderTrack };
