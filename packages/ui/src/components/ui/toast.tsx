import type { ToasterProps } from "sonner";
import { cn } from "#ui/lib/utils";
import { Check, CircleAlert, TriangleAlert } from "lucide-react";
import { Toaster as ToasterPrimitive } from "sonner";

import { useTheme } from "@projects/ui/theme";

import { getButtonVariants } from "./button";
import { Loader } from "./loader";

const Toast = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <ToasterPrimitive
      theme={theme as ToasterProps["theme"]}
      className="group"
      icons={{
        info: <CircleAlert />,
        success: <Check />,
        warning: <TriangleAlert />,
        error: <TriangleAlert />,
        loading: <Loader variant="spin" />,
      }}
      toastOptions={{
        unstyled: true,
        closeButton: true,
        classNames: {
          toast: cn(
            "overflow-hidden rounded-xl bg-bg px-4 py-3 text-[0.925rem] font-normal text-fg ring-1 ring-border backdrop-blur-xl dark:ring-inset sm:min-w-[22rem] sm:p-5",
            "[&:has([data-icon])_[data-content]]:ml-5",
            '[&:has([data-button])_[data-close-button="true"]]:hidden',
            "[&:not([data-description])_[data-title]]:font-normal",
            "[&:has([data-description])_[data-title]]:!text-lg [&:has([data-description])_[data-title]]:!font-medium",
            "[&>[data-button=true]]:bottom-4 [&>[data-button]]:absolute",
            "[&>[data-action=true]]:right-4",
            "[&>[data-cancel=true]]:left-4",
          ),
          icon: "absolute top-[1rem] sm:top-[1.50rem]",
          content:
            "[&:not(:has(+button))]:pr-10 [&:has(+button)]:pb-11 md:[&:has(+button)]:pb-9",
          error:
            "bg-danger ring-danger-fg/10 text-white ring-inset [&>[data-close-button=true]>svg]:text-white",
          info: "bg-info ring-info-fg/10 text-info-fg ring-inset [&>[data-close-button=true]>svg]:text-info-fg",
          warning:
            "bg-warning text-warning-fg ring-warning-fg/10 ring-inset [&>[data-close-button=true]>svg]:text-amber-950",
          success:
            "bg-primary ring-primary/50 text-primary-fg ring-inset [&>[data-close-button=true]>svg]:text-primary-fg",
          cancelButton: getButtonVariants({
            className: "",
            size: "xs",
            appearance: "outline",
          }),
          actionButton: getButtonVariants({
            className: "self-end justify-self-end",
            size: "xs",
          }),
          closeButton: cn([
            "absolute left-auto right-2 top-1/2 grid size-8 -translate-y-1/2 place-content-center rounded-md border-0 !bg-transparent hover:!bg-dark/20 dark:hover:!bg-white/20 lg:right-3 [&_svg]:size-5 [&_svg]:text-fg",
          ]),
        },
      }}
      {...props}
    />
  );
};

export { Toast };
