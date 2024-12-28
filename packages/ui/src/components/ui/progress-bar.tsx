import type { HTMLMotionProps } from "framer-motion";
import type { ProgressBarProps } from "react-aria-components";
import { useMemo } from "react";
import { getPercentage, PercentageError } from "#ui/lib/get-percentage";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "#ui/lib/utils";
import { motion } from "framer-motion";
import {
  ProgressBar as AriaProgressBar,
  composeRenderProps,
} from "react-aria-components";

interface ProgressBarContextValue {
  /* The percentage value of the progress bar */
  percentage: number;
  /* Whether the progress bar is indeterminate */
  isIndeterminate: ProgressBarProps["isIndeterminate"];
}

const [ProgressBarContext, useProgressBarContext] = createContextFactory<
  ProgressBarContextValue | undefined
>();

const ProgressBarRoot = (props: ProgressBarProps) => {
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
    <ProgressBarContext value={contextValue}>
      <AriaProgressBar
        value={value}
        maxValue={maxValue}
        minValue={minValue}
        className={composeTailwindRenderProps("w-full", className)}
        {...rest}
      />
    </ProgressBarContext>
  );
};

const ProgressBarTrack = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "relative h-2 w-full min-w-64 overflow-hidden rounded-full bg-secondary outline outline-1 -outline-offset-1 outline-transparent",
        className,
      )}
      {...rest}
    />
  );
};

const ProgressBarIndicator = (props: HTMLMotionProps<"div">) => {
  const { className, ...rest } = props;
  const context = useProgressBarContext();

  if (!context) {
    throw new Error("ProgressBarIndicator must be within ProgressBarRoot");
  }

  const { percentage = 0, isIndeterminate = false } = context;

  if (!isIndeterminate) {
    return (
      <motion.div
        className={cn(
          "absolute left-0 top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]",
          className,
        )}
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        {...rest}
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]",
        className,
      )}
      initial={{ left: "0%", width: "40%" }}
      animate={{ left: ["0%", "100%", "0%"] }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
        ease: "easeInOut",
      }}
      {...rest}
    />
  );
};

const ProgressBar = (props: ProgressBarProps) => {
  const { children, ...rest } = props;
  return (
    <ProgressBarRoot {...rest}>
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <ProgressBarTrack>
            <ProgressBarIndicator />
          </ProgressBarTrack>
        </>
      ))}
    </ProgressBarRoot>
  );
};

export {
  ProgressBar,
  ProgressBarRoot,
  ProgressBarTrack,
  ProgressBarIndicator,
  useProgressBarContext,
};
export type { ProgressBarProps };
