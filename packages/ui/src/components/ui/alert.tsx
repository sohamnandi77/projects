import type {
  TextProps as AlertDescriptionProps,
  HeadingProps as AlertTitleProps,
} from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { cn } from "#ui/lib/utils";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { Heading, Text } from "react-aria-components";
import { tv } from "tailwind-variants";

const alertVariants = tv({
  base: [
    "relative w-full rounded-lg border p-4  [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-fg [&>svg~*]:pl-7",
  ],
  variants: {
    variant: {
      primary: [
        "border-primary/35 bg-primary/10 text-primary [&>svg]:text-primary [&>svg]:ring-primary/30",
      ],
      secondary: [
        "border-border bg-secondary/50 text-secondary-fg [&>svg]:text-secondary-fg [&>svg]:ring-secondary-fg/10",
      ],
      info: [
        "border-info/20 bg-info/5 text-info [&>svg]:text-info [&>svg]:ring-info/30",
      ],
      warning:
        "border-warning/50 bg-warning/5 text-warning [&>svg]:text-warning [&>svg]:ring-warning/30",
      danger:
        "border-danger/50 bg-danger/5 text-danger [&>svg]:text-danger [&>svg]:ring-danger/30",
      success:
        "border-success/50 bg-success/5 text-success [&>svg]:text-success [&>svg]:ring-success/30",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

const Alert = (props: AlertProps) => {
  const { className, variant = "info", ...rest } = props;
  return (
    <div
      role="alert"
      className={alertVariants({ variant, className })}
      {...rest}
    />
  );
};

const ICON_MAP: Record<
  NonNullable<AlertProps["variant"]>,
  React.ElementType
> = {
  info: Info,
  warning: CircleAlert,
  danger: CircleAlert,
  success: CircleCheck,
  primary: CircleAlert,
  secondary: CircleAlert,
};

type AlertIconProps = React.SVGProps<SVGSVGElement> & {
  variant?: AlertProps["variant"];
};

const AlertIcon = (props: AlertIconProps) => {
  const { className, variant = "info", ...rest } = props;
  const Icon = ICON_MAP[variant];

  return (
    <Icon
      slot="icon"
      className={cn("size-5 rounded-full leading-loose ring-4", className)}
      {...rest}
    />
  );
};

const AlertTitle = (props: AlertTitleProps) => {
  const { className, children, ...rest } = props;
  return (
    <Heading
      slot="title"
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
      slot="description"
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...rest}
    />
  );
};

export { Alert, AlertIcon, AlertTitle, AlertDescription };

export type {
  AlertProps,
  AlertIconProps,
  AlertTitleProps,
  AlertDescriptionProps,
};
