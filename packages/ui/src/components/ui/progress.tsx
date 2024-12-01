import type { ProgressBarProps as AriaProgressBarProps } from "react-aria-components";
import {
  ProgressBar as AriaProgressBar,
  composeRenderProps,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

import { Label, labelVariants } from "./label";

interface ProgressProps extends AriaProgressBarProps {
  barClassName?: string;
  fillClassName?: string;
}

const Progress = ({
  className,
  barClassName,
  fillClassName,
  children,
  ...props
}: ProgressProps) => (
  <AriaProgressBar
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
              transform: `translateX(-${100 - (renderProps.percentage ?? 0)}%)`,
            }}
          />
        </div>
      </>
    ))}
  </AriaProgressBar>
);

interface JollyProgressBarProps extends ProgressProps {
  label?: string;
  showValue?: boolean;
}

function JollyProgressBar(props: Readonly<JollyProgressBarProps>) {
  const { label, className, showValue = true, ...rest } = props;
  return (
    <Progress
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
    </Progress>
  );
}

export { JollyProgressBar, Progress };
export type { JollyProgressBarProps, ProgressProps };
