import type {
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusButtonStyles } from "@projects/ui/lib/style";

const getButtonVariants = tv({
  extend: focusButtonStyles,
  base: [
    "relative isolate box-border inline-flex items-center justify-center gap-x-2 border font-medium no-underline before:absolute after:absolute",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-1 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--button-icon]",
  ],
  variants: {
    variant: {
      default: [
        "text-primary-fg [--button-bg:theme(colors.primary.DEFAULT)] [--button-border:theme(colors.primary.DEFAULT)] [--button-hover-overlay:theme(colors.white/10%)]",
        "[--button-icon:theme(colors.primary.fg/60%)] active:[--button-icon:theme(colors.primary.fg/80%)] hover:[--button-icon:theme(colors.primary.fg/80%)]",
      ],
      secondary: [
        "text-secondary-fg [--button-bg:theme(colors.secondary.DEFAULT)] [--button-border:theme(colors.secondary.fg/10%)] [--button-hover-overlay:theme(colors.secondary.fg/2.5%)] data-[active]:[--button-border:theme(colors.secondary.fg/15%)] hover:[--button-border:theme(colors.secondary.fg/15%)] dark:[--button-bg:theme(colors.secondary.DEFAULT)]",
        "[--button-icon:theme(colors.muted.fg)] active:[--button-icon:theme(colors.fg)] hover:[--button-icon:theme(colors.fg)]",
      ],
      warning: [
        "text-warning-fg [--button-bg:theme(colors.warning.DEFAULT)] [--button-border:theme(colors.warning.DEFAULT)] [--button-hover-overlay:theme(colors.white/10%)]",
        "[--button-icon:theme(colors.warning.fg/60%)] active:[--button-icon:theme(colors.warning.fg/80%)] hover:[--button-icon:theme(colors.warning.fg/80%)]",
      ],
      danger: [
        "text-white [--button-bg:theme(colors.danger.DEFAULT)] [--button-border:theme(colors.danger.DEFAULT)] [--button-hover-overlay:theme(colors.white/10%)]",
        "[--button-icon:theme(colors.white/60%)] active:[--button-icon:theme(colors.white/80%)] hover:[--button-icon:theme(colors.white/80%)]",
      ],
      success: [
        "text-success-fg [--button-bg:theme(colors.success.DEFAULT)] [--button-border:theme(colors.success.DEFAULT)] [--button-hover-overlay:theme(colors.white/10%)]",
        "[--button-icon:theme(colors.success.fg/60%)] active:[--button-icon:theme(colors.success.fg/80%)] hover:[--button-icon:theme(colors.success.fg/80%)]",
      ],
      info: [
        "text-info-fg [--button-bg:theme(colors.info.DEFAULT)] [--button-border:theme(colors.info.DEFAULT)] [--button-hover-overlay:theme(colors.white/10%)]",
        "[--button-icon:theme(colors.info.fg/60%)] active:[--button-icon:theme(colors.info.fg/80%)] hover:[--button-icon:theme(colors.info.fg/80%)]",
      ],
    },
    appearance: {
      solid: [
        "border-transparent bg-[--button-border]",
        "before:inset-0 before:-z-10 before:bg-[--button-bg] before:shadow before:disabled:shadow-none",
        "after:inset-0 after:-z-10 after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:active:bg-[--button-hover-overlay] after:hover:bg-[--button-hover-overlay] after:disabled:shadow-none",
        "dark:border-white/5 dark:bg-[--button-bg] dark:before:hidden dark:after:-inset-px",
      ],
      outline: [
        "border-border text-fg [--button-icon:theme(colors.muted.fg)]",
        "hover:bg-secondary/90 hover:[--button-icon:theme(colors.fg)]",
        "active:bg-secondary/90 active:[--button-icon:theme(colors.fg)]",
      ],
      plain: [
        "border-transparent text-fg [--button-icon:theme(colors.muted.fg)]",
        "pressed:bg-secondary/90",
        "active:bg-secondary/90 active:[--button-icon:theme(colors.fg)]",
        "hover:bg-secondary/90 hover:[--button-icon:theme(colors.fg)]",
      ],
    },
    size: {
      xs: "h-8 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.1)-1px)] text-xs/4 lg:text-[0.800rem]/4",
      sm: "h-9 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-sm/5 lg:text-sm/5",
      md: "h-10 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing.2)-1px)] text-base lg:text-sm/6",
      lg: "h-10 px-[calc(theme(spacing.4)-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base sm:h-11 sm:px-[calc(theme(spacing.5)-1px)] lg:text-base/7 [&>[data-slot=icon]]:mx-[-3px] sm:[&>[data-slot=icon]]:size-5",
      icon: "size-9 shrink-0 [&_[data-slot=icon]]:text-current",
    },
    shape: {
      square:
        "rounded-lg before:rounded-[calc(theme(borderRadius.lg)-1px)] after:rounded-[calc(theme(borderRadius.lg)-1px)] dark:after:rounded-lg",
      circle:
        "rounded-full before:rounded-[9998px] after:rounded-[9998px] dark:after:rounded-full",
    },
    isDisabled: {
      true: "pointer-events-none cursor-not-allowed opacity-60 forced-colors:disabled:text-[GrayText]",
      false: "forced-colors:disabled:text-[GrayText]",
    },
    isPending: {
      true: "cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "default",
    appearance: "solid",
    size: "md",
    shape: "square",
  },
});

interface ButtonProps
  extends VariantProps<typeof getButtonVariants>,
    AriaButtonProps {
  onClick?: (e: PressEvent) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    onPress,
    onClick,
    variant,
    shape,
    appearance,
    size,
    ...rest
  } = props;
  return (
    <AriaButton
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        getButtonVariants({
          ...renderProps,
          variant,
          appearance,
          size,
          shape,
          className,
        }),
      )}
      onPress={onPress ?? onClick}
      {...rest}
    />
  );
});

export { Button, getButtonVariants };

export type { ButtonProps };
