import type { TextAreaProps as AriaTextAreaProps } from "react-aria-components";
import {
  TextArea as AriaTextArea,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const TextArea = ({ className, ...props }: AriaTextAreaProps) => {
  return (
    <AriaTextArea
      className={composeRenderProps(className, (className) =>
        cn(
          "border-input flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
          /* Focused */
          "data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",
          /* Resets */
          "focus-visible:outline-none",
          className,
        ),
      )}
      {...props}
    />
  );
};

export { TextArea };
