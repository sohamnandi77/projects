import type { MeterProps as AriaMeterProps } from "react-aria-components";
import { Meter as AriaMeter, composeRenderProps } from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import { Label, labelVariants } from "./label";

interface MeterProps extends AriaMeterProps {
  barClassName?: string;
  fillClassName?: string;
}

const Meter = ({
  className,
  barClassName,
  fillClassName,
  children,
  ...props
}: MeterProps) => (
  <AriaMeter
    className={composeTailwindRenderProps("w-full", className)}
    {...props}
  >
    {composeRenderProps(children, (children, renderProps) => (
      <>
        {children}
        <div
          className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            barClassName,
          )}
        >
          <div
            className={cn(
              "size-full flex-1 bg-primary transition-all",
              fillClassName,
            )}
            style={{
              transform: `translateX(-${100 - (renderProps.percentage || 0)}%)`,
            }}
          />
        </div>
      </>
    ))}
  </AriaMeter>
);

interface JollyMeterProps extends MeterProps {
  label?: string;
  showValue?: boolean;
}

function JollyMeter(props: Readonly<JollyMeterProps>) {
  const { label, className, showValue = true, ...rest } = props;
  return (
    <Meter
      className={composeTailwindRenderProps(
        "group flex flex-col gap-2",
        className,
      )}
      {...rest}
    >
      {({ valueText }) => (
        <div className="flex w-full justify-between">
          <Label>{label}</Label>
          {showValue && <span className={labelVariants()}>{valueText}</span>}
        </div>
      )}
    </Meter>
  );
}

export { JollyMeter, Meter };
export type { JollyMeterProps, MeterProps };
