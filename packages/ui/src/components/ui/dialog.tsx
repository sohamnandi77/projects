import type {
  ButtonProps as ButtonPrimitiveProps,
  DialogProps,
  HeadingProps,
} from "react-aria-components";
import { useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  OverlayTriggerStateContext,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { useViewport } from "@projects/hooks/use-viewport";

import type { ButtonProps } from "./button";
import { Button } from "./button";

const dialogStyles = tv({
  slots: {
    root: [
      "relative flex max-h-[inherit] flex-col overflow-hidden outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:size-0.5",
      "sm:[&:has([data-slot=dialog-body])_[data-slot=dialog-footer]]:px-6 sm:[&:has([data-slot=dialog-body])_[data-slot=dialog-header]]:px-6 sm:[&:not(:has([data-slot=dialog-body]))]:px-6",
      "[&:has([data-slot=dialog-body])_[data-slot=dialog-footer]]:px-4 [&:has([data-slot=dialog-body])_[data-slot=dialog-header]]:px-4 [&:not(:has([data-slot=dialog-body]))]:px-4",
    ],
    header: "relative flex flex-col pb-3 pt-4 sm:pt-6",
    description: "mt-0.5 block text-sm text-muted-fg sm:mt-1",
    body: [
      "flex flex-1 flex-col gap-2 overflow-auto px-4 py-1 sm:px-6",
      "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]",
    ],
    footer:
      "mt-auto flex flex-col-reverse justify-between gap-3 py-4 sm:flex-row sm:pb-6",
    closeIndicator:
      "absolute right-1 top-1 z-50 grid size-8 place-content-center rounded-xl hover:bg-secondary focus:bg-secondary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary sm:right-2 sm:top-2 sm:size-7 sm:rounded-md",
  },
});

const { root, header, description, body, footer, closeIndicator } =
  dialogStyles();

const Dialog = (props: DialogProps) => {
  const { role, className, ...rest } = props;
  return (
    <DialogPrimitive
      role={role ?? "dialog"}
      className={root({ className })}
      {...rest}
    />
  );
};

const DialogTrigger = (props: ButtonPrimitiveProps) => (
  <ButtonPrimitive {...props} />
);

const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      data-slot="dialog-header"
      ref={headerRef}
      className={header({ className })}
      {...rest}>
      {children}
    </div>
  );
};

const titleStyles = tv({
  base: "flex flex-1 items-center text-fg",
  variants: {
    level: {
      1: "text-lg font-semibold sm:text-xl",
      2: "text-lg font-semibold sm:text-xl",
      3: "text-base font-semibold sm:text-lg",
      4: "text-base font-semibold",
    },
  },
});

interface TitleProps extends Omit<HeadingProps, "level"> {
  level?: 1 | 2 | 3 | 4;
}

const DialogTitle = ({ level = 2, className, ...props }: TitleProps) => (
  <Heading
    slot="title"
    level={level}
    className={titleStyles({ level, className })}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={description({ className })} {...props} />
);

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-body" className={body({ className })} {...props} />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);
  return (
    <div
      ref={footerRef}
      data-slot="dialog-footer"
      className={footer({ className })}
      {...props}
    />
  );
};

const DialogClose = ({
  className,
  appearance = "outline",
  ...props
}: ButtonProps) => {
  const state = useContext(OverlayTriggerStateContext);

  if (!state) {
    throw new Error("DialogClose must be with in Dialog Provider");
  }

  return (
    <Button
      className={className}
      appearance={appearance}
      onPress={() => state.close()}
      {...props}
    />
  );
};

interface CloseButtonIndicatorProps {
  className?: string;
  close: () => void;
  isDismissable?: boolean;
}

const DialogCloseIndicator = (props: CloseButtonIndicatorProps) => {
  const { className, isDismissable, close, ...rest } = props;
  const { isMobile } = useViewport();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isMobile]);

  return isDismissable ? (
    <ButtonPrimitive
      ref={buttonRef}
      autoFocus={isMobile ? true : undefined}
      aria-label="Close"
      onPress={close}
      className={closeIndicator({ className })}
      {...rest}>
      <X className="size-4" />
    </ButtonPrimitive>
  ) : null;
};

export {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogCloseIndicator,
};

export type { DialogProps };
