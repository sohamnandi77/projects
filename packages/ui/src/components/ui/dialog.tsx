import type { VariantProps } from "class-variance-authority";
import type {
  DialogProps as AriaDialogProps,
  HeadingProps as AriaHeadingProps,
  ModalOverlayProps as AriaModalOverlayProps,
  DialogProps,
} from "react-aria-components";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import {
  Button as AriaButton,
  DialogTrigger as AriaDialogTrigger,
  Heading as AriaHeading,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  composeRenderProps,
  Dialog as DialogPrimitive,
} from "react-aria-components";

import type { ButtonProps } from "@projects/ui/button";
import { Button } from "@projects/ui/button";
import { cn } from "@projects/ui/lib/utils";

const Dialog = ({ role, className, ...props }: DialogProps) => {
  return (
    <DialogPrimitive
      role={role ?? "dialog"}
      className={cn([
        "relative flex max-h-[inherit] flex-col overflow-hidden outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
        "sm:[&:has([data-slot=dialog-body])_[data-slot=dialog-footer]]:px-6 sm:[&:has([data-slot=dialog-body])_[data-slot=dialog-header]]:px-6 sm:[&:not(:has([data-slot=dialog-body]))]:px-6",
        "[&:has([data-slot=dialog-body])_[data-slot=dialog-footer]]:px-4 [&:has([data-slot=dialog-body])_[data-slot=dialog-header]]:px-4 [&:not(:has([data-slot=dialog-body]))]:px-4",
        className,
      ])}
      {...props}
    />
  );
};

const sheetVariants = cva(
  [
    "fixed z-50 gap-4 bg-bg shadow-lg transition ease-in-out",
    /* Entering */
    "entering:duration-500 entering:animate-in",
    /* Exiting */
    "exiting:duration-300 exiting:animate-out",
  ],
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b entering:slide-in-from-top exiting:slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 border-t entering:slide-in-from-bottom exiting:slide-out-to-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r entering:slide-in-from-left exiting:slide-out-to-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l entering:slide-in-from-right exiting:slide-out-to-right sm:max-w-sm",
      },
    },
  },
);

const DialogTrigger = AriaDialogTrigger;

const DialogOverlay = ({
  className,
  isDismissable = true,
  ...props
}: AriaModalOverlayProps) => (
  <AriaModalOverlay
    isDismissable={isDismissable}
    className={composeRenderProps(className, (className) =>
      cn(
        "fixed inset-0 z-50 bg-black/80",
        /* Exiting */
        "exiting:duration-300 exiting:animate-out exiting:fade-out-0",
        /* Entering */
        "entering:animate-in entering:fade-in-0",
        className,
      ),
    )}
    {...props}
  />
);

interface DialogContentProps
  extends Omit<React.ComponentProps<typeof AriaModal>, "children">,
    VariantProps<typeof sheetVariants> {
  children?: AriaDialogProps["children"];
  role?: AriaDialogProps["role"];
  closeButton?: boolean;
}

const DialogContent = ({
  className,
  children,
  side,
  role,
  closeButton = true,
  ...props
}: DialogContentProps) => (
  <AriaModal
    className={composeRenderProps(className, (className) =>
      cn(
        side
          ? sheetVariants({ side, className: "h-full p-6" })
          : "fixed left-[50vw] top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border bg-bg p-6 shadow-lg duration-200 entering:animate-in entering:fade-in-0 entering:zoom-in-95 entering:slide-in-from-left-1/2 entering:slide-in-from-top-[48%] exiting:duration-300 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95 exiting:slide-out-to-left-1/2 exiting:slide-out-to-top-[48%] sm:rounded-lg md:w-full",
        className,
      ),
    )}
    {...props}
  >
    <Dialog
      role={role}
      className={cn(!side && "grid h-full gap-4", "h-full outline-none")}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children}
          {closeButton && (
            <AriaButton
              onPress={renderProps.close}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg transition-opacity entering:bg-accent entering:text-muted-fg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </AriaButton>
          )}
        </>
      ))}
    </Dialog>
  </AriaModal>
);

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "relative flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }: AriaHeadingProps) => (
  <AriaHeading
    slot="title"
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div
    data-slot="dialog-body"
    className={cn([
      "flex flex-1 flex-col gap-2 overflow-auto px-4 py-1 sm:px-6",
      "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]",
      className,
    ])}
    {...props}
  />
);

type DialogCloseProps = Omit<ButtonProps, "slot">;

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  (props, ref) => {
    return <Button slot="close" ref={ref} {...props} />;
  },
);

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
};

export type { DialogContentProps, AriaDialogProps as DialogProps };
