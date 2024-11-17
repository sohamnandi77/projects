import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@projects/ui/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@projects/ui/components/ui/popover";
import { useMediaQuery } from "@projects/ui/hooks/use-media-query";

interface BaseProps {
  className?: string;
  children: React.ReactNode;
}

interface CommonProps extends BaseProps {
  asChild?: boolean;
}

type ComponentProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
> = Omit<React.ComponentProps<T>, keyof CommonProps>;

interface RootResponsivePopoverProps extends CommonProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  popoverProps?: ComponentProps<typeof Popover>;
  drawerProps?: ComponentProps<typeof Drawer>;
}

interface ResponsivePopoverTriggerProps extends CommonProps {
  drawerProps?: ComponentProps<typeof DrawerTrigger>;
  popoverProps?: ComponentProps<typeof PopoverTrigger>;
}

interface ResponsivePopoverContentProps extends CommonProps {
  drawerProps?: ComponentProps<typeof DrawerContent> & {
    className?: string;
  };
  popoverProps?: ComponentProps<typeof PopoverContent> & {
    className?: string;
  };
}

// Create a context to store and provide the isDesktop value
const ResponsivePopoverContext = React.createContext<boolean | null>(null);

// Custom hook to use the ResponsivePopoverContext
const useResponsivePopoverContext = () => {
  const context = React.useContext(ResponsivePopoverContext);
  if (context === null) {
    throw new Error(
      "useResponsivePopoverContext must be used within a ResponsivePopoverProvider",
    );
  }
  return context;
};

const ResponsivePopover = ({
  children,
  popoverProps,
  drawerProps,
  ...rest
}: RootResponsivePopoverProps) => {
  const { isDesktop } = useMediaQuery();
  const ResponsivePopoverComponent = isDesktop ? Popover : Drawer;
  const props = isDesktop ? popoverProps : drawerProps;

  return (
    <ResponsivePopoverContext.Provider value={isDesktop}>
      <ResponsivePopoverComponent {...props} {...rest}>
        {children}
      </ResponsivePopoverComponent>
    </ResponsivePopoverContext.Provider>
  );
};

const ResponsivePopoverTrigger = ({
  className,
  children,
  drawerProps,
  popoverProps,
  ...rest
}: ResponsivePopoverTriggerProps) => {
  const isDesktop = useResponsivePopoverContext();
  const ResponsivePopoverTriggerComponent = isDesktop
    ? PopoverTrigger
    : DrawerTrigger;
  const props = isDesktop ? popoverProps : drawerProps;
  return (
    <ResponsivePopoverTriggerComponent
      className={className}
      {...props}
      {...rest}
    >
      {children}
    </ResponsivePopoverTriggerComponent>
  );
};

const ResponsivePopoverContent = ({
  className,
  children,
  drawerProps,
  popoverProps,
  ...rest
}: ResponsivePopoverContentProps) => {
  const isDesktop = useResponsivePopoverContext();
  const ResponsivePopoverContentComponent = isDesktop
    ? PopoverContent
    : DrawerContent;
  const props = isDesktop ? popoverProps : drawerProps;
  return (
    <ResponsivePopoverContentComponent
      className={className}
      {...props}
      {...rest}
    >
      {children}
    </ResponsivePopoverContentComponent>
  );
};

export {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
};
