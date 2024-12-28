import type { MeterProps as AriaMeterProps } from "react-aria-components";
import { useMemo } from "react";
import { getPercentage, PercentageError } from "#ui/lib/get-percentage";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "#ui/lib/utils";
import { motion } from "framer-motion";
import { Meter as AriaMeter, composeRenderProps } from "react-aria-components";

interface MeterContextValue {
  /* The percentage value of the progress bar */
  percentage: number;
  /* Disables the animation of the progress bar */
  disableAnimation?: boolean;
}

const [MeterContext, useMeterContext] = createContextFactory<
  MeterContextValue | undefined
>();

interface MeterProps extends AriaMeterProps {
  /* Disables the animation of the progress bar */
  disableAnimation?: boolean;
}

const MeterRoot = (props: MeterProps) => {
  const {
    value = 0,
    maxValue = 100,
    minValue = 0,
    className,
    disableAnimation = false,
    ...rest
  } = props;

  const contextValue = useMemo(() => {
    try {
      const percentage = getPercentage(value - minValue, maxValue - minValue);

      return { percentage: percentage.percentage, disableAnimation };
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
      return { percentage: 0, disableAnimation };
    }
  }, [value, minValue, maxValue, disableAnimation]);

  return (
    <MeterContext value={contextValue}>
      <AriaMeter
        value={value}
        maxValue={maxValue}
        minValue={minValue}
        className={composeTailwindRenderProps("w-full", className)}
        {...rest}
      />
    </MeterContext>
  );
};

const MeterTrack = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        "relative h-2 w-full min-w-64 overflow-hidden rounded-full bg-muted outline outline-1 -outline-offset-1 outline-transparent",
        className,
      )}
      {...rest}
    />
  );
};

const MeterIndicator = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  const context = useMeterContext();

  if (!context) {
    throw new Error("MeterIndicator must be within MeterRoot");
  }

  const { percentage = 0, disableAnimation = false } = context;

  if (!disableAnimation) {
    return (
      <motion.div
        className={cn(
          "absolute left-0 top-0 h-full bg-primary forced-colors:bg-[Highlight]",
          className,
        )}
        initial={{ width: "0%" }}
        animate={{
          width: `${percentage}%`,
        }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  return (
    <div
      className={cn(
        "size-full flex-1 bg-primary transition-all forced-colors:bg-[Highlight]",
        className,
      )}
      style={{
        transform: `translateX(-${100 - percentage}%)`,
      }}
      {...rest}
    />
  );
};

const Meter = (props: MeterProps) => {
  const { children, ...rest } = props;
  return (
    <MeterRoot {...rest}>
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </>
      ))}
    </MeterRoot>
  );
};

export { Meter, MeterRoot, MeterTrack, MeterIndicator, useMeterContext };
export type { MeterProps };
