import type {
  LabelProps,
  SliderOutputProps,
  SliderProps as SliderPrimitiveProps,
  SliderThumbProps,
  SliderTrackProps,
  TextProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { useContext, useMemo } from "react";
import { useSlotId } from "@react-aria/utils";
import {
  SliderOutput as AriaSliderOutput,
  SliderStateContext as AriaSliderStateContext,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  TextContext as AriaTextContext,
  composeRenderProps,
  Slider as SliderPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { Description, Label } from "@projects/ui/form";

const sliderStyles = tv({
  slots: {
    root: "flex flex-col gap-2 orientation-horizontal:w-full orientation-vertical:h-56 orientation-vertical:items-center disabled:opacity-50",
    track: [
      "group/track relative cursor-pointer rounded-full bg-zinc-200 disabled:cursor-default disabled:bg-muted dark:bg-zinc-800",
      "grow orientation-horizontal:h-1.5 orientation-horizontal:w-full orientation-vertical:w-1.5 orientation-vertical:flex-1",
    ],
    filler: [
      "rounded-full bg-primary group-disabled/track:bg-muted",
      "pointer-events-none absolute group-orientation-horizontal:top-0 group-orientation-horizontal/track:h-full group-orientation-vertical/track:bottom-0 group-orientation-vertical/track:w-full",
    ],
    thumb: [
      "border border-zinc-200 outline-none focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dragging:cursor-grabbing forced-colors:outline-[Highlight]",
      "rounded-full bg-white transition-[width,height]",
      "absolute left-1/2 top-1/2 block !-translate-x-1/2 !-translate-y-1/2",
      "disabled:border disabled:border-bg disabled:bg-muted",
      "orientation-horizontal:h-2 orientation-vertical:w-2",
      "size-[1.15rem] dragging:size-[1.30rem] dragging:border-primary",
    ],
    valueLabel: "text-sm tabular-nums text-muted-fg",
  },
});

const { track, filler, thumb, root, valueLabel } = sliderStyles();

type SliderRootProps = SliderPrimitiveProps;

const SliderRoot = (props: SliderPrimitiveProps) => {
  const descriptionId = useSlotId();

  const value = useMemo(
    () => ({ slots: { description: { id: descriptionId } } }),
    [descriptionId],
  );

  return (
    <AriaTextContext.Provider value={value}>
      <SliderPrimitive
        data-slot="root"
        aria-describedby={descriptionId}
        {...props}
        className={composeRenderProps(props.className, (className) =>
          root({ className }),
        )}
      />
    </AriaTextContext.Provider>
  );
};

interface SliderProps
  extends SliderRootProps,
    VariantProps<typeof sliderStyles> {
  label?: LabelProps["children"];
  description?: TextProps["children"];
  showValue?: boolean | ((value: number[]) => string);
}

const Slider = ({
  label,
  description,
  showValue = true,
  ...props
}: SliderProps) => (
  <SliderRoot {...props}>
    <div className="flex items-center justify-between gap-2">
      {label && <Label>{label}</Label>}
      {(showValue || typeof showValue === "function") && (
        <SliderOutput>
          {({ state }) =>
            typeof showValue === "function"
              ? showValue(state.values)
              : undefined
          }
        </SliderOutput>
      )}
    </div>
    <SliderControls />
    {description && <Description>{description}</Description>}
  </SliderRoot>
);

const SliderControls = (props: SliderTrackProps) => {
  const state = useContext(AriaSliderStateContext);
  return (
    <SliderTrack {...props}>
      <SliderFiller />
      {state?.values.map((idx, i) => <SliderThumb key={idx} index={i} />)}
    </SliderTrack>
  );
};

const SliderTrack = (props: SliderTrackProps) => {
  return (
    <AriaSliderTrack
      {...props}
      className={composeRenderProps(props.className, (className) =>
        track({ className }),
      )}
    />
  );
};

const SliderFiller = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const state = useContext(AriaSliderStateContext);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { orientation, getThumbPercent, values } = state ?? {};

  const getStyle = () => {
    const percent0 = getThumbPercent ? getThumbPercent(0) * 100 : 0;
    const percent1 = getThumbPercent ? getThumbPercent(1) * 100 : 0;

    if (values?.length === 1) {
      return orientation === "horizontal"
        ? { width: `${percent0}%` }
        : { height: `${percent0}%` };
    }

    return orientation === "horizontal"
      ? { left: `${percent0}%`, width: `${Math.abs(percent0 - percent1)}%` }
      : { bottom: `${percent0}%`, height: `${Math.abs(percent0 - percent1)}%` };
  };

  return (
    <div
      {...props}
      style={getStyle()}
      className={filler({ className: props.className })}
    />
  );
};

const SliderThumb = ({ className, ...props }: SliderThumbProps) => {
  return (
    <AriaSliderThumb
      {...props}
      className={composeRenderProps(className, (className) =>
        thumb({ className }),
      )}
    />
  );
};

const SliderOutput = ({ className, ...props }: SliderOutputProps) => {
  return (
    <AriaSliderOutput
      {...props}
      className={composeRenderProps(className, (className) =>
        valueLabel({ className }),
      )}>
      {composeRenderProps(
        props.children,
        (children, { state }) =>
          children ??
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" - "),
      )}
    </AriaSliderOutput>
  );
};

export {
  Slider,
  SliderControls,
  SliderFiller,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderOutput,
};
