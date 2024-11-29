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

const Breadcrumbs = <T extends object>(props: AriaBreadcrumbsProps<T>) => {
  const { className, ...rest } = props;
  return (
    <AriaBreadcrumbs
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...rest}
    />
  );
};

const BreadcrumbItem = (props: AriaBreadcrumbProps) => {
  const { className, ...rest } = props;
  return (
    <AriaBreadcrumb
      className={composeTailwindRenderProps(
        "inline-flex items-center gap-1.5 sm:gap-2.5",
        className,
      )}
      {...rest}
    />
  );
};

const BreadcrumbLink = (props: AriaLinkProps) => {
  const { className, ...rest } = props;
  return (
    <AriaLink
      className={composeTailwindRenderProps(
        cn(
          "cursor-pointer transition-colors",
          /* Hover */
          "hover:text-foreground",
          /* Disabled */
          "disabled:pointer-events-none disabled:opacity-50",
          /* Current */
          "current:pointer-events-auto current:opacity-100",
        ),
        className,
      )}
      {...rest}
    />
  );
};

const BreadcrumbSeparator = (props: React.ComponentProps<"span">) => {
  const { children, className, ...rest } = props;
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...rest}
    >
      {children ?? <ChevronRight />}
    </span>
  );
};

const BreadcrumbEllipsis = (props: React.ComponentProps<"span">) => {
  const { className, ...rest } = props;
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...rest}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};

type BreadcrumbPageProps = Omit<AriaLinkProps, "href">;

const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const { className, ...rest } = props;
  return (
    <AriaLink
      className={composeTailwindRenderProps(
        "font-normal text-foreground",
        className,
      )}
      {...rest}
    />
  );
};

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
