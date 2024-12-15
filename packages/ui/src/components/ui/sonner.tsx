import { Toaster as Sonner } from "sonner";

import { useTheme } from "@projects/ui/theme";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg group-[.toaster]:text-fg group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-fg",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-fg",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-fg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
