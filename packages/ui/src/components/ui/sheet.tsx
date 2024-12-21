import type {
  DialogProps,
  DialogTriggerProps,
  Modal,
  ModalOverlayProps as ModalOverlayPrimitiveProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import {
  composeRenderProps,
  DialogTrigger as DialogTriggerPrimitive,
  ModalOverlay,
  Modal as ModalPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIndicator,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const sheetOverlayStyles = tv({
  base: [
    "fixed left-0 top-0 isolate z-50 flex h-[--visual-viewport-height] w-full items-center justify-center p-4",
  ],
  variants: {
    isBlurred: {
      true: "backdrop-blur",
      false: "bg-dark/15 dark:bg-dark/40",
    },
    isEntering: {
      true: "duration-200 ease-out animate-in fade-in",
    },
    isExiting: {
      true: "duration-200 ease-in animate-out fade-out",
    },
  },
});

type Sides = "top" | "bottom" | "left" | "right";
const generateCompoundVariants = (sides: Sides[]) => {
  return sides.map((side) => ({
    side,
    isStack: true,
    className:
      side === "top"
        ? "top-2 inset-x-2 rounded-xl ring-1 border-b-0 ring-dark/5 dark:ring-border"
        : side === "bottom"
          ? "bottom-2 inset-x-2 rounded-xl ring-1 border-t-0 ring-dark/5 dark:ring-border"
          : side === "left"
            ? "left-2 inset-y-2 rounded-xl ring-1 border-r-0 ring-dark/5 dark:ring-border"
            : "right-2 inset-y-2 rounded-xl ring-1 border-l-0 ring-dark/5 dark:ring-border",
  }));
};

const sheetContentStyles = tv({
  base: "fixed z-50 grid gap-4 border-dark/5 bg-overlay text-overlay-fg shadow-lg transition ease-in-out dark:border-border",
  variants: {
    isEntering: {
      true: "duration-300 animate-in ",
    },
    isExiting: {
      true: "duration-200 animate-out",
    },
    side: {
      top: "inset-x-0 top-0 rounded-b-2xl border-b entering:slide-in-from-top exiting:slide-out-to-top",
      bottom:
        "inset-x-0 bottom-0 rounded-t-2xl border-t entering:slide-in-from-bottom exiting:slide-out-to-bottom",
      left: "inset-y-0 left-0 h-auto w-[19rem] overflow-y-auto border-r entering:slide-in-from-left exiting:slide-out-to-left sm:w-3/4 sm:max-w-xs",
      right:
        "inset-y-0 right-0 h-auto w-[19rem] overflow-y-auto border-l entering:slide-in-from-right exiting:slide-out-to-right sm:w-3/4 sm:max-w-xs",
    },
    isStack: {
      true: "",
      false: "",
    },
  },
  compoundVariants: generateCompoundVariants([
    "top",
    "bottom",
    "left",
    "right",
  ]),
});

const Sheet = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogTriggerPrimitive {...props}>{children}</DialogTriggerPrimitive>;
};

interface SheetContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children" | "className">,
    Omit<ModalOverlayPrimitiveProps, "className">,
    VariantProps<typeof sheetOverlayStyles> {
  "aria-label"?: DialogProps["aria-label"];
  "aria-labelledby"?: DialogProps["aria-labelledby"];
  role?: DialogProps["role"];
  closeButton?: boolean;
  isBlurred?: boolean;
  isStack?: boolean;
  side?: Sides;
  classNames?: {
    overlay?: ModalOverlayPrimitiveProps["className"];
    content?: ModalOverlayPrimitiveProps["className"];
  };
}

const SheetContent = ({
  classNames,
  isBlurred = false,
  isDismissable = true,
  side = "right",
  role = "dialog",
  closeButton = true,
  isStack = true,
  ...props
}: SheetContentProps) => {
  const _isDismissable = role === "alertdialog" ? false : isDismissable;
  return (
    <ModalOverlay
      isDismissable={_isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) => {
          return sheetOverlayStyles({
            ...renderProps,
            isBlurred,
            className,
          });
        },
      )}
      {...props}
    >
      <ModalPrimitive
        className={composeRenderProps(
          classNames?.content,
          (className, renderProps) =>
            sheetContentStyles({
              ...renderProps,
              side,
              isStack,
              className,
            }),
        )}
        {...props}
      >
        <Dialog
          role={role}
          aria-label={props["aria-label"] ?? undefined}
          className="h-full"
        >
          {(values) => (
            <>
              {props.children as React.ReactNode}
              {closeButton && (
                <DialogCloseIndicator
                  className="right-2.5 top-2.5"
                  close={values.close}
                  isDismissable={_isDismissable}
                />
              )}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  );
};

export {
  Sheet,
  DialogTrigger as SheetTrigger,
  DialogFooter as SheetFooter,
  SheetContent,
  DialogHeader as SheetHeader,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
  DialogBody as SheetBody,
  DialogClose as SheetClose,
};
