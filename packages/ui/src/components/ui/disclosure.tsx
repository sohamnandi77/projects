import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";
import { use } from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  DisclosurePanel as AriaDisclosurePanel,
  Button,
  composeRenderProps,
  DisclosureGroupStateContext,
  Heading,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const disclosureGroupStyles = tv({
  base: ["peer cursor-pointer"],
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-75",
    },
  },
});

function DisclosureGroup(props: Readonly<DisclosureGroupProps>) {
  const { className, ...rest } = props;
  return (
    <AriaDisclosureGroup
      className={composeRenderProps(className, (className, renderProps) =>
        disclosureGroupStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
}

const disclosureStyles = tv({
  base: ["group peer w-full min-w-64 border-border"],
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-70",
    },
    isInGroup: {
      true: "border-0 border-b last:border-b-0",
    },
  },
});

function Disclosure(props: Readonly<DisclosureProps>) {
  const { className, ...rest } = props;
  const isInGroup = use(DisclosureGroupStateContext) !== null;
  return (
    <AriaDisclosure
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        disclosureStyles({ ...renderProps, isInGroup, className }),
      )}
    />
  );
}

const disclosureTriggerStyles = tv({
  base: [
    "group flex w-full flex-1 items-center justify-between rounded-md py-4 font-medium outline-none ring-offset-bg transition-all",
  ],
  variants: {
    isHover: { true: "underline" },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
    },
    isFocused: {
      true: "text-fg outline-0",
    },
    isOpen: {
      true: "text-fg",
    },
    isFocusVisible: {
      true: "text-fg outline-0 ring-2 ring-ring ring-offset-2",
    },
  },
});

function DisclosureTrigger(props: Readonly<ButtonProps>) {
  const { children, className, ...rest } = props;
  return (
    <Heading className="flex">
      <Button
        slot="trigger"
        className={composeRenderProps(className, (className, renderProps) =>
          disclosureTriggerStyles({ ...renderProps, className }),
        )}
        {...rest}>
        {composeRenderProps(children, (children) => (
          <>
            {children}
            <ChevronDown
              data-slot="chevron"
              aria-hidden
              className={cn(
                "ml-auto size-4 shrink-0 transition-transform duration-200",
                "group-expanded:rotate-180",
                "group-disabled:opacity-50",
              )}
            />
          </>
        ))}
      </Button>
    </Heading>
  );
}

function DisclosurePanel(props: Readonly<DisclosurePanelProps>) {
  const { children, className, ...rest } = props;
  return (
    <AriaDisclosurePanel
      {...rest}
      className={composeTailwindRenderProps(
        cn("overflow-hidden text-sm text-muted-fg transition-all"),
        className,
      )}>
      <div className="pb-4 pt-0">{children}</div>
    </AriaDisclosurePanel>
  );
}

export { Disclosure, DisclosureTrigger, DisclosurePanel, DisclosureGroup };
export type {
  DisclosureGroupProps,
  DisclosureProps,
  DisclosurePanelProps,
  ButtonProps as DisclosureTriggerProps,
};
