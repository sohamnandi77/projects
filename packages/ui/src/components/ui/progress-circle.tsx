import type { SVGProps } from "react";
import type { ProgressBarProps } from "react-aria-components";
import { useMemo } from "react";
import { getPercentage, PercentageError } from "#ui/lib/get-percentage";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "#ui/lib/utils";
import { composeRenderProps, ProgressBar } from "react-aria-components";

interface ProgressCircleContextValue {
  /* The percentage value of the progress bar */
  percentage: number;
  /* Whether the progress bar is indeterminate */
  isIndeterminate: ProgressBarProps["isIndeterminate"];
}

const [ProgressCircleContext, useProgressCircleContext] = createContextFactory<
  ProgressCircleContextValue | undefined
>();

const c = "50%";
const r = "calc(50% - 2px)";

const ProgressCircleRoot = (props: ProgressBarProps) => {
  const {
    value = 0,
    maxValue = 100,
    minValue = 0,
    className,
    isIndeterminate = false,

    ...rest
  } = props;

  const contextValue = useMemo(() => {
    try {
      const { percentage } = getPercentage(
        value - minValue,
        maxValue - minValue,
      );
      return {
        percentage,
        isIndeterminate,
      };
    } catch (error) {
      if (error instanceof PercentageError) {
        switch (error.type) {
          case "DIVIDE_BY_ZERO_ERROR": {
            throw new Error("minValue must be less than maxValue");
          }

          case "INVALID_NUMERATOR": {
            throw new Error("value & minValue must be a number");
          }

          case "INVALID_DENOMINATOR": {
            throw new Error("maxValue & minValue must be a number");
          }

          case "CALCULATION_ERROR":
          case "INVALID_DECIMAL_PLACES":
          default: {
            throw error;
          }
        }
      }
      // Return a default value when an unknown error occurs
      return { percentage: 0, isIndeterminate };
    }
  }, [value, minValue, maxValue, isIndeterminate]);

  return (
    <ProgressCircleContext value={contextValue}>
      <ProgressBar
        value={value}
        maxValue={maxValue}
        minValue={minValue}
        {...rest}
        className={composeTailwindRenderProps("w-full", className)}
      />
    </ProgressCircleContext>
  );
};

const ProgressCircleTrack = (props: SVGProps<SVGSVGElement>) => {
  const { className, children, ...rest } = props;
  return (
    <svg
      className={cn("size-full shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      data-slot="icon"
      {...rest}>
      <circle
        cx={c}
        cy={c}
        r={r}
        strokeWidth={3}
        stroke="currentColor"
        strokeOpacity={0.25}
      />
      {children}
    </svg>
  );
};

const ProgressCircleIndicator = (props: SVGProps<SVGCircleElement>) => {
  const { className, ...rest } = props;
  const context = useProgressCircleContext();

  if (!context) {
    throw new Error(
      "ProgressCircleIndicator must be within ProgressCircleRoot",
    );
  }

  const { percentage = 0, isIndeterminate = false } = context;
  if (!isIndeterminate) {
    return (
      <circle
        cx={c}
        cy={c}
        r={r}
        strokeWidth={3}
        stroke="currentColor"
        pathLength={100}
        strokeDasharray="100 200"
        strokeDashoffset={100 - percentage}
        strokeLinecap="round"
        transform="rotate(-90)"
        className={cn("origin-center", className)}
        {...rest}
      />
    );
  }

  return (
    <circle
      cx={c}
      cy={c}
      r={r}
      strokeWidth={3}
      stroke="currentColor"
      pathLength={100}
      strokeDasharray="100 200"
      strokeDashoffset={100 - 30}
      strokeLinecap="round"
      className={cn(
        "origin-center animate-[spin_1s_cubic-bezier(0.4,_0,_0.2,_1)_infinite]",
        className,
      )}
      {...rest}
    />
  );
};

const ProgressCircle = (props: ProgressBarProps) => {
  const { children, ...rest } = props;

  return (
    <ProgressCircleRoot {...rest}>
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <ProgressCircleTrack>
            <ProgressCircleIndicator />
          </ProgressCircleTrack>
        </>
      ))}
    </ProgressCircleRoot>
  );
};

export {
  ProgressCircle,
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleIndicator,
};
