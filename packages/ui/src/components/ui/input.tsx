import type { InputProps as AriaInputProps } from "react-aria-components";
import {
  Input as AriaInput,
  TextField as AriaTextField,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

const TextField = AriaTextField;

const Input = ({ className, ...props }: AriaInputProps) => {
  return (
    <AriaInput
      className={composeRenderProps(className, (className) =>
        cn(
          "border-input flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-50",
          /* Focused */
          "data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2",
          /* Resets */
          "focus-visible:outline-none",
          className,
        ),
      )}
      {...props}
    />
  );
};

export { Input, TextField };
