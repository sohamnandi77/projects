import type { ProgressBarProps as ProgressBarPrimitiveProps } from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { motion } from "framer-motion";
import { ProgressBar as ProgressBarPrimitive } from "react-aria-components";

import { Label } from "./form";

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string;
}

const ProgressBar = ({ label, className, ...props }: ProgressBarProps) => {
  return (
    <ProgressBarPrimitive
      {...props}
      className={composeTailwindRenderProps("flex flex-col", className)}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            {label && <Label>{label}</Label>}
            <span className="text-sm tabular-nums text-muted-fg">
              {valueText}
            </span>
          </div>
          <div className="relative h-2 min-w-64 overflow-hidden rounded-full bg-secondary outline outline-1 -outline-offset-1 outline-transparent">
            {!isIndeterminate ? (
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ) : (
              <motion.div
                className="absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]"
                initial={{ left: "0%", width: "40%" }}
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  );
};

export { ProgressBar };
