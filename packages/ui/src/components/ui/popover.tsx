import type {
  DialogProps as AriaDialogProps,
  PopoverProps as AriaPopoverProps,
} from "react-aria-components";
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const PopoverTrigger = AriaDialogTrigger;

const Popover = ({ className, offset = 4, ...props }: AriaPopoverProps) => (
  <AriaPopover
    offset={offset}
    className={composeTailwindRenderProps(
      cn(
        "z-50 rounded-md border bg-overlay text-overlay-fg shadow-md outline-none",
        /* Entering */
        "entering:animate-in entering:fade-in-0 entering:zoom-in-95",
        /* Exiting */
        "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
        /* Placement */
        "placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
      ),
      className,
    )}
    {...props}
  />
);

function PopoverDialog(props: Readonly<AriaDialogProps>) {
  const { className, ...rest } = props;
  return (
    <AriaDialog className={cn("p-4 outline outline-0", className)} {...rest} />
  );
}

export { Popover, PopoverDialog, PopoverTrigger };
