import type {
  SliderOutputProps as AriaSliderOutputProps,
  SliderProps as AriaSliderProps,
  SliderThumbProps as AriaSliderThumbProps,
  SliderTrackProps as AriaSliderTrackProps,
} from "react-aria-components";
import { use, useCallback } from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import {
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderStateContext as AriaSliderStateContext,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const SliderOutput = (props: AriaSliderOutputProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderOutput
      className={composeTailwindRenderProps(
        "text-sm tabular-nums text-muted-fg orientation-horizontal:ml-auto orientation-vertical:mx-auto",
        className,
      )}
      {...rest}
    />
  );
};

const Slider = (props: AriaSliderProps) => {
  const { className, orientation = "horizontal", ...rest } = props;
  return (
    <AriaSlider
      className={composeTailwindRenderProps(
        cn(
          "relative flex touch-none select-none items-center",
          orientation === "vertical" ? "h-full" : "w-full",
        ),
        className,
      )}
      orientation={orientation}
      {...rest}
    />
  );
};

const sliderTrackStyles = tv({
  base: "group/track relative grow rounded-full bg-secondary",
  variants: {
    orientation: {
      vertical: "h-full w-2",
      horizontal: "h-2 w-full",
    },
    isDisabled: { true: "opacity-50" },
  },
});

const SliderTrack = (props: AriaSliderTrackProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderTrack
      className={composeRenderProps(className, (className, renderProps) =>
        sliderTrackStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

const SliderFillTrack = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  const state = use(AriaSliderStateContext);

  if (!state) {
    throw new Error("SliderFillTrack must be used within a Slider component");
  }

  const getStyle = useCallback(() => {
    const percent0 = state.getThumbPercent(0) * 100;
    const percent1 = state.getThumbPercent(1) * 100;

    if (state.values.length === 1) {
      return state.orientation === "horizontal"
        ? { width: `${percent0}%` }
        : { height: `${percent0}%` };
    }

    return state.orientation === "horizontal"
      ? { left: `${percent0}%`, width: `${Math.abs(percent0 - percent1)}%` }
      : { bottom: `${percent0}%`, height: `${Math.abs(percent0 - percent1)}%` };
  }, [state]);

  return (
    <div
      style={getStyle()}
      className={cn(
        "pointer-events-none absolute rounded-full bg-primary",
        "group-orientation-horizontal/track:top-0 group-orientation-horizontal/track:h-full group-orientation-vertical/track:bottom-0 group-orientation-vertical/track:w-full group-disabled/track:opacity-60",
        state.orientation === "horizontal" ? "h-full" : "bottom-0 w-full",
        className,
      )}
      {...rest}
    />
  );
};

const thumbStyles = tv({
  base: [
    "left-1/2 top-1/2 block size-5 rounded-full border-2 border-primary bg-bg ring-offset-bg transition-[width,height]",
  ],
  variants: {
    isFocusVisible: {
      true: "outline-none ring-2 ring-ring ring-offset-2",
    },
    isDragging: {
      true: "cursor-grabbing",
    },
    isDisabled: {
      true: "pointer-events-none opacity-50 forced-colors:border-[GrayText]",
    },
  },
});

const SliderThumb = (props: AriaSliderThumbProps) => {
  const { className, ...rest } = props;
  return (
    <AriaSliderThumb
      className={composeRenderProps(className, (className, renderProps) =>
        thumbStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

export { Slider, SliderTrack, SliderFillTrack, SliderThumb, SliderOutput };
