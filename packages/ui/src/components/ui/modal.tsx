import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import {
  composeRenderProps,
  ModalOverlay as ModalOverlayPrimitive,
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

const modalOverlayStyles = tv({
  base: [
    "fixed left-0 top-0 isolate z-50 h-[--visual-viewport-height] w-full",
    "flex items-end text-center sm:block",
    "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
  ],
  variants: {
    isBlurred: {
      true: "backdrop-blur",
      false: "bg-dark/15 dark:bg-dark/40",
    },
    isEntering: {
      true: "ease-out animate-in fade-in",
    },
    isExiting: {
      true: "duration-200 ease-in animate-out fade-out",
    },
  },
});
const modalContentStyles = tv({
  base: [
    "max-h-full w-full rounded-t-2xl bg-overlay text-left align-middle text-overlay-fg shadow-lg ring-1 ring-dark/5",
    "overflow-hidden dark:ring-border sm:rounded-2xl",
    "sm:fixed sm:left-[50vw] sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
  ],
  variants: {
    isEntering: {
      true: [
        "duration-200 ease-out animate-in slide-in-from-bottom-[20%]",
        "sm:slide-in-from-left-1/2 sm:slide-in-from-top-[80%]",
      ],
    },
    isExiting: {
      true: [
        "duration-200 ease-in animate-out slide-out-to-bottom-56",
        "sm:slide-out-to-left-1/2 sm:exiting:slide-out-to-top-[80%]",
      ],
    },
    size: {
      xs: "sm:max-w-xs",
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg sm:has-[[role=alertdialog]]:max-w-lg sm:has-[[role=dialog]]:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

type ModalProps = DialogTriggerProps;
const Modal = (props: ModalProps) => {
  return <DialogTrigger {...props} />;
};

interface ModalContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children">,
    Omit<ModalOverlayProps, "className">,
    VariantProps<typeof modalContentStyles> {
  "aria-label"?: DialogProps["aria-label"];
  "aria-labelledby"?: DialogProps["aria-labelledby"];
  role?: DialogProps["role"];
  closeButton?: boolean;
  isBlurred?: boolean;
  classNames?: {
    overlay?: ModalOverlayProps["className"];
    content?: ModalOverlayProps["className"];
  };
}

const ModalContent = ({
  classNames,
  isDismissable = true,
  isBlurred = false,
  children,
  size,
  role,
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const _isDismissable = role === "alertdialog" ? false : isDismissable;
  return (
    <ModalOverlayPrimitive
      isDismissable={_isDismissable}
      className={composeRenderProps(
        classNames?.overlay,
        (className, renderProps) => {
          return modalOverlayStyles({
            ...renderProps,
            isBlurred,
            className,
          });
        },
      )}
      {...props}>
      <ModalPrimitive
        className={composeRenderProps(
          classNames?.content,
          (className, renderProps) =>
            modalContentStyles({
              ...renderProps,
              size,
              className,
            }),
        )}
        {...props}>
        {(values) => (
          <Dialog role={role}>
            {typeof children === "function" ? children(values) : children}
            {closeButton && (
              <DialogCloseIndicator
                // eslint-disable-next-line @typescript-eslint/unbound-method
                close={values.state.close}
                isDismissable={_isDismissable}
              />
            )}
          </Dialog>
        )}
      </ModalPrimitive>
    </ModalOverlayPrimitive>
  );
};

export {
  Modal,
  DialogTrigger as ModalTrigger,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
  DialogDescription as ModalDescription,
  DialogFooter as ModalFooter,
  DialogBody as ModalBody,
  DialogClose as ModalClose,
  ModalContent,
  modalOverlayStyles,
  modalContentStyles,
};
