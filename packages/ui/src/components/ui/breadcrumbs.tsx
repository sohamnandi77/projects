import type {
  BreadcrumbProps as AriaBreadcrumbProps,
  BreadcrumbsProps as AriaBreadcrumbsProps,
  LinkProps as AriaLinkProps,
} from "react-aria-components";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  Link as AriaLink,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const Breadcrumbs = <T extends object>({
  className,
  ...props
}: AriaBreadcrumbsProps<T>) => (
  <AriaBreadcrumbs
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className,
    )}
    {...props}
  />
);

const BreadcrumbItem = ({ className, ...props }: AriaBreadcrumbProps) => (
  <AriaBreadcrumb
    className={composeTailwindRenderProps(
      "inline-flex items-center gap-1.5 sm:gap-2.5",
      className,
    )}
    {...props}
  />
);

const BreadcrumbLink = ({ className, ...props }: AriaLinkProps) => (
  <AriaLink
    className={composeTailwindRenderProps(
      cn(
        "transition-colors",
        /* Hover */
        "hover:text-foreground",
        /* Disabled */
        "disabled:pointer-events-none disabled:opacity-50",
        /* Current */
        "current:pointer-events-auto current:opacity-100",
      ),
      className,
    )}
    {...props}
  />
);

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </span>
);

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

type BreadcrumbPageProps = Omit<AriaLinkProps, "href">;

const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => (
  <AriaLink
    className={composeTailwindRenderProps(
      "font-normal text-foreground",
      className,
    )}
    {...props}
  />
);

export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Breadcrumbs,
  BreadcrumbSeparator,
};

export type {
  BreadcrumbPageProps,
  AriaBreadcrumbProps as BreadcrumbProps,
  AriaBreadcrumbsProps as BreadcrumbsProps,
};
