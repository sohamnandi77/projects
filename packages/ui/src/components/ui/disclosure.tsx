import type { VariantProps } from "class-variance-authority";
import type {
  DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosurePanelProps as AriaDisclosurePanelProps,
  DisclosureProps as AriaDisclosureProps,
  ButtonProps,
} from "react-aria-components";
import React from "react";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import {
  UNSTABLE_Disclosure as AriaDisclosure,
  UNSTABLE_DisclosureGroup as AriaDisclosureGroup,
  UNSTABLE_DisclosurePanel as AriaDisclosurePanel,
  Button,
  Heading,
} from "react-aria-components";

import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const disclosureVariants = cva(["group min-w-64"], {
  variants: {
    variant: {
      default: "border-0 border-b last:border-b-0",
      isolated: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DisclosureProps
  extends AriaDisclosureProps,
    VariantProps<typeof disclosureVariants> {
  children: React.ReactNode;
}

function Disclosure({
  children,
  className,
  variant,
  ...props
}: DisclosureProps) {
  return (
    <AriaDisclosure
      {...props}
      className={composeTailwindRenderProps(
        disclosureVariants({ variant }),
        className,
      )}
    >
      {children}
    </AriaDisclosure>
  );
}

export interface DisclosureHeaderProps {
  children: React.ReactNode;
  className?: ButtonProps["className"];
}

function DisclosureHeader({ children, className }: DisclosureHeaderProps) {
  return (
    <Heading className="flex">
      {/* USE DEFAULT BUTTON */}
      <Button
        slot="trigger"
        className={composeTailwindRenderProps(
          cn(
            "group flex flex-1 items-center justify-between rounded-md py-4 font-medium ring-offset-background transition-all hover:underline",
            "disabled:pointer-events-none disabled:opacity-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "outline-none",
          ),
          className,
        )}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            "group-data-[expanded]:rotate-180",
            "group-disabled:opacity-50",
          )}
        />
      </Button>
    </Heading>
  );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode;
}

function DisclosurePanel({
  children,
  className,
  ...props
}: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        "overflow-hidden text-sm transition-all",
        className,
      )}
    >
      {children}
    </AriaDisclosurePanel>
  );
}

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children: React.ReactNode;
}

function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
  return <AriaDisclosureGroup {...props}>{children}</AriaDisclosureGroup>;
}

export { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel };
