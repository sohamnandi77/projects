import type { IconProps } from "#ui/types/index";
import type { LucideProps } from "lucide-react";
import type {
  TextProps as AlertDescriptionProps,
  HeadingProps as AlertTitleProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { useMemo } from "react";
import { cn, createContextFactory } from "#ui/lib/utils";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { Heading, Text } from "react-aria-components";
import { tv } from "tailwind-variants";

interface IAlertContext {
  variant: NonNullable<AlertProps["variant"]>;
}

const [AlertContext, useAlert] = createContextFactory<IAlertContext>({
  defaultValue: {
    variant: "info",
  },
});

const getAlertVariants = tv({
  base: [
    "relative my-4 w-full overflow-hidden rounded-lg border p-4 leading-4 [&_strong]:font-semibold",
    // Link styles
    "[&_a]:underline [&_a]:hover:underline",
    // Icon styles
    "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7",
  ],
  variants: {
    variant: {
      primary: [
        "border-primary/35 bg-primary/10 leading-4 text-primary [&>svg]:ring-primary/30 [&_a]:text-primary",
      ],
      secondary: [
        "border-border bg-secondary/50 text-secondary-fg [&>svg]:text-secondary-fg [&>svg]:ring-secondary-fg/30 [&_a]:text-secondary-fg",
      ],
      info: [
        "border-info/20 bg-info/5 leading-4 text-info dark:bg-info/10 [&>svg]:ring-info/30",
      ],
      warning:
        "border-warning/50 bg-warning/5 text-warning-fg dark:border-warning/25 dark:text-warning [&>svg]:ring-warning/30 dark:[&>svg]:ring-warning/30",
      danger:
        "border-danger/30 bg-danger/5 text-danger dark:bg-danger/10 [&>svg]:ring-danger/30",
      success: [
        "border-emerald-500/20 bg-emerald-50/50 leading-4 text-emerald-900 [&>svg]:text-emerald-600 [&>svg]:ring-emerald-900/30 dark:[&>svg]:ring-emerald-400/30 [&_a]:text-emerald-600",
        "dark:bg-emerald-500/10 dark:text-emerald-200 dark:[&>svg]:text-emerald-400 dark:[&_a]:text-emerald-50",
      ],
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof getAlertVariants>;

const Alert = (props: AlertProps) => {
  const { className, variant = "info", ...rest } = props;
  const value = useMemo(() => ({ variant }), [variant]);

  return (
    <AlertContext value={value}>
      <div
        role="alert"
        className={getAlertVariants({ variant, className })}
        {...rest}
      />
    </AlertContext>
  );
};

const ICON_MAP: Record<
  NonNullable<AlertProps["variant"]>,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  info: Info,
  warning: CircleAlert,
  danger: CircleAlert,
  success: CircleCheck,
  primary: CircleAlert,
  secondary: CircleAlert,
};

const AlertIcon = (props: IconProps) => {
  const { className, ...rest } = props;
  const { variant = "info" } = useAlert();
  const Icon = ICON_MAP[variant];

  return (
    <Icon
      data-slot="icon"
      className={cn("size-5 rounded-full leading-loose ring-4", className)}
      {...rest}
    />
  );
};

const AlertTitle = (props: AlertTitleProps) => {
  const { className, children, ...rest } = props;
  return (
    <Heading
      data-slot="title"
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...rest}
    >
      {children}
    </Heading>
  );
};

const AlertDescription = (props: AlertDescriptionProps) => {
  const { className, ...rest } = props;
  return (
    <Text
      data-slot="description"
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...rest}
    />
  );
};

export { Alert, AlertIcon, AlertTitle, AlertDescription };

export type { AlertProps, AlertTitleProps, AlertDescriptionProps };
