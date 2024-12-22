import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";
import * as React from "react";
import {
  composeRenderProps,
  Modal,
  ModalOverlay,
  OverlayArrow,
  PopoverContext,
  Popover as PopoverPrimitive,
  useSlottedContext,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { useViewport } from "@projects/hooks/use-viewport";
import { cn } from "@projects/ui/lib/utils";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const Popover = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogTrigger {...props}>{children}</DialogTrigger>;
};

const PopoverTitle = ({
  level = 2,
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) => (
  <DialogTitle
    className={cn("sm:leading-none", level === 2 && "sm:text-lg", className)}
    {...props}
  />
);

const PopoverHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogHeader className={cn("p-0 sm:pt-0", className)} {...props} />
);

const PopoverFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogFooter className={cn("pb-0 pt-4 sm:pb-0", className)} {...props} />
);

const PopoverBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogBody className={cn("sm:p-0", className)} {...props} />
);

const popoverContentStyles = tv({
  base: [
    "min-w-80 max-w-xs rounded-xl border bg-overlay bg-clip-padding p-4 text-overlay-fg shadow-sm [scrollbar-width:thin] dark:backdrop-saturate-200 sm:max-w-3xl lg:text-sm forced-colors:bg-[Canvas] [&::-webkit-scrollbar]:size-0.5",
  ],
  variants: {
    isMenu: {
      true: {
        true: "p-0",
      },
    },
    isEntering: {
      true: [
        "duration-75 ease-out animate-in fade-in placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1",
      ],
    },
    isExiting: {
      true: "duration-75 ease-in animate-out fade-out placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1",
    },
  },
});

const drawerStyles = tv({
  base: [
    "fixed bottom-0 top-auto z-50 max-h-full w-full max-w-2xl border border-b-transparent bg-overlay outline-none",
  ],
  variants: {
    isMenu: {
      true: "rounded-t-xl p-0 [&_[role=dialog]]:px-0",
      false: "rounded-t-2xl py-4",
    },
    isEntering: {
      true: [
        "[transition:transform_0.5s_cubic-bezier(0.32,_0.72,_0,_1)] [will-change:transform]",
        "duration-200 animate-in fade-in-0 slide-in-from-bottom-56",
        "[transition:translate3d(0,_100%,_0)]",
        "sm:slide-in-from-top-[20%]",
      ],
    },
    isExiting: {
      true: "duration-200 ease-in animate-out slide-out-to-bottom-56",
    },
  },
});

interface PopoverProps
  extends Omit<React.ComponentProps<typeof Modal>, "children">,
    Omit<PopoverPrimitiveProps, "children" | "className">,
    Omit<ModalOverlayProps, "className"> {
  children: React.ReactNode;
  showArrow?: boolean;
  style?: React.CSSProperties;
  respectScreen?: boolean;
  "aria-label"?: DialogProps["aria-label"];
  "aria-labelledby"?: DialogProps["aria-labelledby"];
  className?: string | ((values: { defaultClassName?: string }) => string);
}

const PopoverContent = (props: PopoverProps) => {
  const {
    respectScreen = true,
    children,
    showArrow = true,
    className,
    ...rest
  } = props;
  const { isMobile } = useViewport();
  const popoverContext = useSlottedContext(PopoverContext);

  if (!popoverContext) {
    throw new Error("Popover Content must be inside a Provider");
  }

  const isMenuTrigger = popoverContext.trigger === "MenuTrigger";
  const isSubmenuTrigger = popoverContext.trigger === "SubmenuTrigger";
  const isMenu = isMenuTrigger || isSubmenuTrigger;
  const offset = showArrow ? 12 : 8;
  const effectiveOffset = isSubmenuTrigger ? offset - 5 : offset;

  return isMobile && respectScreen ? (
    <ModalOverlay
      className={cn(
        "fixed left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full bg-overlay/10 [--visual-viewport-vertical-padding:16px]",
        isSubmenuTrigger ? "bg-overlay/10" : "",
      )}
      {...rest}
      isDismissable>
      <Modal
        className={composeRenderProps(className, (className, renderProps) =>
          drawerStyles({ ...renderProps, isMenu, className }),
        )}>
        <Dialog
          aria-label={isMenu ? "Menu" : props["aria-label"]}
          className="touch-none focus:outline-none">
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  ) : (
    <PopoverPrimitive
      offset={effectiveOffset}
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        popoverContentStyles({
          ...renderProps,
          className,
        }),
      )}>
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="block fill-overlay stroke-border group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </PopoverPrimitive>
  );
};

const PopoverPicker = ({ children, className, ...props }: PopoverProps) => {
  return (
    <PopoverPrimitive
      {...props}
      className={composeRenderProps(
        className as PopoverPrimitiveProps["className"],
        (className, renderProps) =>
          popoverContentStyles({
            ...renderProps,
            className: cn(
              "max-h-72 min-w-[--trigger-width] overflow-y-auto p-0",
              className,
            ),
          }),
      )}>
      {children}
    </PopoverPrimitive>
  );
};

export {
  Popover,
  PopoverPrimitive,
  DialogTrigger as PopoverTrigger,
  DialogClose as PopoverClose,
  PopoverContent,
  DialogDescription as PopoverDescription,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverPicker,
  PopoverTitle,
  drawerStyles,
  popoverContentStyles,
};

export type { PopoverProps };
