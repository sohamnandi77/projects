/* eslint-disable tailwindcss/no-custom-classname */
import type { DisclosureProps, LinkProps } from "react-aria-components";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronDown, ChevronRight, Menu, PanelRight } from "lucide-react";
import {
  composeRenderProps,
  Disclosure,
  DisclosurePanel,
  Link,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { useViewport } from "@projects/hooks/use-viewport";

import { Button } from "./button";
import { Sheet, SheetBody, SheetContent } from "./sheet";
import { Tooltip, TooltipContent } from "./tooltip";

interface SidebarContextProps {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar.");
  }

  return context;
}

const Provider = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      isOpen: openProp,
      onOpenChange: setOpenProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile } = useViewport();
    const [openMobile, setOpenMobile] = useState(false);

    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        if (setOpenProp) {
          return setOpenProp(typeof value === "function" ? value(open) : value);
        }

        _setOpen(value);

        // eslint-disable-next-line react-compiler/react-compiler
        document.cookie = `sidebar:state=${open}; path=/; max-age=${60 * 60 * 24 * 7}`;
      },
      [setOpenProp, open],
    );

    const toggleSidebar = useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    return (
      <SidebarContext value={contextValue}>
        <div
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full text-fg [--sidebar-width-icon:3rem] [--sidebar-width:16.5rem] has-[[data-intent=inset]]:bg-secondary/50 dark:has-[[data-intent=inset]]:bg-bg",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext>
    );
  },
);
Provider.displayName = "Provider";

const Inset = ({ className, ...props }: React.ComponentProps<"main">) => {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn([
        [
          "relative flex min-h-svh max-w-full flex-1 flex-col bg-bg",
          "md:peer-data-[intent=inset]:ml-0 md:peer-data-[intent=inset]:rounded-xl md:peer-data-[intent=inset]:bg-tertiary",
          "peer-data-[intent=inset]:min-h-[calc(100svh-theme(spacing.4))] peer-data-[intent=inset]:overflow-hidden peer-data-[intent=inset]:border md:peer-data-[intent=inset]:my-2 md:peer-data-[intent=inset]:mr-2",
        ],
        className,
      ])}
      {...props}
    />
  );
};

const Sidebar = ({
  side = "left",
  intent = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  intent?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "dock" | "none";
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-[--sidebar-width] flex-col bg-tertiary text-fg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet isOpen={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          aria-label="Sidebar"
          data-slot="sidebar"
          data-mobile="true"
          classNames={{
            content: "bg-tertiary text-fg [&>button]:hidden",
          }}
          isStack={intent === "floating"}
          side={side}
        >
          <SheetBody className="p-0 sm:p-0">{children}</SheetBody>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <div
      className="group peer hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-intent={intent}
      data-side={side}
    >
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          intent === "floating" || intent === "inset"
            ? "group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=dock]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          intent === "floating" || intent === "inset"
            ? "p-2 group-data-[collapsible=dock]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=dock]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-slot="sidebar"
          className={cn(
            "flex size-full flex-col bg-tertiary group-data-[intent=floating]:rounded-lg group-data-[intent=floating]:border group-data-[intent=floating]:border-border group-data-[intent=floating]:bg-secondary/50 group-data-[intent=inset]:bg-transparent",
            intent === "inset" || state === "collapsed"
              ? "[&_[data-slot=sidebar-footer]]:border-transparent [&_[data-slot=sidebar-header]]:border-transparent"
              : "[&_[data-slot=sidebar-footer]]:border-t [&_[data-slot=sidebar-header]]:border-b",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const itemStyles = tv({
  base: [
    "group/sidebar-item relative col-span-full grid cursor-pointer items-center rounded-lg leading-6 lg:text-sm [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-muted-fg",
    "text-fg forced-colors:text-[MenuLink]",
  ],
  variants: {
    collapsed: {
      false: "grid-cols-subgrid px-3 py-2 [&>[data-slot=icon]]:mr-2",
    },
    isFocused: {
      true: "outline-none",
    },
    isFocusVisible: {
      true: "bg-muted text-secondary-fg [&:focus-visible_[slot=description]]:text-accent-fg/70",
    },
    isHovered: {
      true: [
        "bg-muted text-secondary-fg [&:focus-visible_[slot=description]]:text-accent-fg/70 [&_.text-muted-fg]:text-secondary-fg/80",
      ],
    },
    isCurrent: {
      true: [
        "bg-primary text-primary-fg [&_.text-muted-fg]:text-primary-fg/80 [&_[data-slot=icon]]:text-primary-fg",
        "[&_.bdx]:bg-primary-fg/20 [&_.bdx]:ring-primary-fg/30",
      ],
    },
    isDisabled: {
      true: "cursor-default text-muted-fg opacity-70",
    },
  },
});

interface ItemProps extends LinkProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string | number | undefined;
  isCurrent?: boolean;
}

const Item = ({
  isCurrent,
  children,
  className,
  icon: Icon,
  ...props
}: ItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state, isMobile } = useContext(SidebarContext)!;
  return state === "collapsed" && !isMobile ? (
    <Tooltip closeDelay={0} delay={0}>
      <Link
        {...props}
        className="col-span-full grid size-9 place-content-center rounded-lg text-muted-fg hover:bg-muted hover:text-secondary-fg focus:outline-none"
      >
        {Icon && <Icon data-slot="icon" />}
        <span className="sr-only">{children as string}</span>
      </Link>
      <TooltipContent intent="inverse" showArrow={false} placement="right">
        {children as string}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Link
      data-slot="sidebar-item"
      aria-current={isCurrent ? "page" : undefined}
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({
          ...renderProps,
          collapsed: state === "collapsed",
          isCurrent,
          className,
        }),
      )}
      {...props}
    >
      {(values) => (
        <>
          {Icon && <Icon data-slot="icon" />}
          <span className="col-start-2 group-data-[collapsible=dock]:hidden">
            {typeof children === "function" ? children(values) : children}
            {props.badge && (
              <div className="absolute inset-y-1/2 right-1.5 grid h-[1.30rem] w-auto -translate-y-1/2 place-content-center rounded-md bg-fg/[0.02] px-1 text-xs font-medium text-muted-fg ring-1 ring-fg/20 dark:bg-fg/10">
                {props.badge}
              </div>
            )}
          </span>
        </>
      )}
    </Link>
  );
};

const Content = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { state } = useSidebar();
  return (
    <div
      data-slot="sidebar-content"
      className={cn([
        "flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=dock]:items-center group-data-[collapsible=dock]:overflow-hidden",
        state === "collapsed" ? "gap-y-6" : "gap-y-2",
        className,
      ])}
      {...props}
    />
  );
};

const navStyles = tv({
  base: "flex h-[3.57rem] w-full items-center justify-between gap-x-2 border-b bg-tertiary px-4 sm:justify-start md:bg-bg",
  variants: {
    isSticky: {
      true: "sticky top-0 z-40",
    },
  },
});

interface NavProps extends React.ComponentProps<"nav"> {
  isSticky?: boolean;
}

const Nav = ({ isSticky = false, className, ...props }: NavProps) => {
  return (
    <nav
      data-slot="sidebar-nav"
      {...props}
      className={navStyles({ isSticky, className })}
    />
  );
};

const Trigger = ({
  className,
  onPress,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      aria-label={props["aria-label"] ?? "Toggle Sidebar"}
      data-slot="sidebar-trigger"
      appearance="plain"
      size="icon"
      className={className}
      onPress={(event) => {
        onPress?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelRight className="hidden md:inline" />
      <Menu className="inline md:hidden" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

const header = tv({
  base: "mb-2 flex flex-col",
  variants: {
    collapsed: {
      false: "px-5 py-4",
      true: "mt-1 px-5 py-4 group-data-[intent=floating]:mt-2 md:mx-auto md:size-9 md:items-center md:justify-center md:rounded-lg md:p-0 md:hover:bg-muted",
    },
  },
});

const Header = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state } = useContext(SidebarContext)!;
  return (
    <div
      data-slot="sidebar-header"
      {...props}
      className={header({ collapsed: state === "collapsed", className })}
      {...props}
    />
  );
};

const footer = tv({
  base: "mt-auto flex flex-col",
  variants: {
    collapsed: {
      false: [
        "p-2 [&_[data-slot=menu-trigger]>[data-slot=avatar]]:-ml-1.5 [&_[data-slot=menu-trigger]]:flex [&_[data-slot=menu-trigger]]:w-full [&_[data-slot=menu-trigger]]:items-center [&_[data-slot=menu-trigger]]:justify-start [&_[data-slot=menu-trigger]]:hover:bg-muted",
      ],
      true: "size-12 items-center justify-center p-1 [&_[data-slot=menu-trigger]]:size-9",
    },
  },
});

const Footer = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state } = useContext(SidebarContext)!;
  return (
    <div
      {...props}
      data-slot="sidebar-footer"
      className={footer({ collapsed: state === "collapsed", className })}
      {...props}
    />
  );
};

interface CollapsibleProps extends DisclosureProps {
  children: React.ReactNode;
  title?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Section = ({
  title,
  className,
  collapsible,
  icon: Icon,
  defaultExpanded,
  ...props
}: CollapsibleProps) => {
  const { state, isMobile } = useSidebar();

  const isExpanded =
    state === "collapsed" ||
    (title ? (collapsible ? (defaultExpanded ?? true) : true) : true);
  return (
    <Disclosure
      data-slot="sidebar-section"
      className={composeTailwindRenderProps(
        cn(
          "col-span-full px-2",
          state === "collapsed" && [title && "px-0", !isMobile && "px-0"],
          state === "expanded" && [
            "[&_[data-slot=sidebar-section]]:px-0",
            title && [
              Icon
                ? "mt-0.5 [&_[data-slot=sidebar-section-panel]]:px-6 [&_[data-slot=sidebar-section-panel]_[data-slot=icon]]:-ml-0.5"
                : "my-2.5",
            ],
          ],
        ),
        className,
      )}
      defaultExpanded={isExpanded}
      {...props}
    >
      {({ isExpanded }) => (
        <>
          {typeof title === "string" && (
            <span className="group-data-[collapsible=dock]:hidden group-data-[collapsible=dock]:opacity-0">
              {collapsible ? (
                <Button
                  slot="trigger"
                  className={({ isHovered }) =>
                    cn(
                      "flex w-full items-center justify-between py-2 leading-6 focus:outline-none [&>.idctr]:size-6 [&>.idctr]:duration-200",
                      Icon
                        ? "px-3 text-fg has-[.idctr]:pr-0.5 lg:py-1.5 lg:text-sm [&_.idctr]:text-muted-fg"
                        : "px-3 text-sm has-[.idctr]:pr-0",
                      isHovered &&
                        Icon &&
                        "relative rounded-lg bg-muted [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-muted-fg [&_.text-muted-fg]:text-secondary-fg/80",
                      isExpanded && !Icon && "[&>.idctr]:rotate-180",
                      isExpanded && Icon && "[&>.idctr]:rotate-90",
                    )
                  }
                >
                  <span className="flex items-center [&>[data-slot=icon]]:mr-2 [&>[data-slot=icon]]:text-muted-fg">
                    {Icon && <Icon data-slot="icon" />}
                    {title}
                  </span>
                  {Icon && <ChevronRight className="idctr" />}
                  {!Icon && <ChevronDown className="idctr" />}
                </Button>
              ) : (
                <h4 className="px-3 py-2 text-sm text-muted-fg">{title}</h4>
              )}
            </span>
          )}
          <DisclosurePanel>
            <div
              data-slot="sidebar-section-panel"
              className={cn(
                "grid gap-y-0.5 group-data-[collapsible=dock]:place-content-center",
                state === "collapsed"
                  ? "group-data-[collapsible=dock]:place-content-center"
                  : "grid-cols-[auto_1fr] [&_[data-slot=sidebar-item]:first-child]:mt-0.5",
              )}
            >
              {props.children}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

const Rail = ({ className, ...props }: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-transparent sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-tertiary",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
};

Sidebar.Provider = Provider;
Sidebar.Inset = Inset;
Sidebar.Header = Header;
Sidebar.Nav = Nav;
Sidebar.Content = Content;
Sidebar.Footer = Footer;
Sidebar.Item = Item;
Sidebar.Section = Section;
Sidebar.Rail = Rail;
Sidebar.Trigger = Trigger;

export { Sidebar, useSidebar };
