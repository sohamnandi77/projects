import type {
  ButtonProps,
  DisclosureGroupProps as DisclosureGroupPrimitiveProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";
import { createContext, useContext } from "react";
import { cn, composeTailwindRenderProps } from "#ui/lib/utils";
import { ChevronLeft } from "lucide-react";
import {
  DisclosurePanel as AriaDisclosurePanel,
  Button,
  composeRenderProps,
  DisclosureGroup as DisclosureGroupPrimitive,
  Disclosure as DisclosurePrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

interface DisclosureGroupProps extends DisclosureGroupPrimitiveProps {
  hideBorder?: boolean;
  hideIndicator?: boolean;
  className?: string;
}

const DisclosureGroupContext = createContext<DisclosureGroupProps>({});

const DisclosureGroup = ({
  children,
  hideIndicator,
  hideBorder,
  className,
  ...props
}: DisclosureGroupProps) => {
  return (
    <DisclosureGroupPrimitive
      {...props}
      className={({ isDisabled }) =>
        cn([
          isDisabled ? "cursor-not-allowed opacity-75" : "cursor-pointer",
          hideBorder
            ? "[&_[data-slot=accordion-item]]:border-none"
            : "[&_[data-slot=accordion-item]]:border-b",
        ])
      }
    >
      {(values) => (
        <div data-slot="accordion-item-content" className={className}>
          <DisclosureGroupContext value={{ hideIndicator, hideBorder }}>
            {typeof children === "function" ? children(values) : children}
          </DisclosureGroupContext>
        </div>
      )}
    </DisclosureGroupPrimitive>
  );
};

const disclosureStyles = tv({
  base: "group relative flex w-full flex-col",
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-75",
    },
    isExpanded: {
      true: "pb-3",
    },
  },
  compoundVariants: [
    {
      hideBorder: true,
      isExpanded: true,
      className: "pb-2",
    },
  ],
});

const Disclosure = ({ className, ...props }: DisclosureProps) => {
  return (
    <DisclosurePrimitive
      data-slot="accordion-item"
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        disclosureStyles({ ...renderProps, className }),
      )}
    >
      {props.children}
    </DisclosurePrimitive>
  );
};

const accordionTriggerStyles = tv({
  base: [
    "group flex flex-1 items-center gap-x-2 rounded-lg font-medium text-muted-fg aria-expanded:text-fg sm:text-sm",
  ],
  variants: {
    hideBorder: {
      true: "py-2",
      false: "py-3",
    },
    isFocused: {
      true: "text-fg outline-none",
    },
    isOpen: {
      true: "text-fg",
    },
    isDisabled: {
      true: "cursor-default opacity-50",
    },
  },
});

const DisclosureTrigger = ({ className, ...props }: ButtonProps) => {
  const { hideIndicator, hideBorder } = useContext(DisclosureGroupContext);
  return (
    <Button
      {...props}
      slot="trigger"
      className={composeRenderProps(className, (className, renderProps) =>
        accordionTriggerStyles({
          ...renderProps,
          hideBorder,
          className,
        }),
      )}
    >
      {(values) => (
        <>
          {typeof props.children === "function"
            ? props.children(values)
            : props.children}
          {!hideIndicator && (
            <ChevronLeft
              className={cn(
                "ml-auto shrink-0 transition duration-300 group-aria-expanded:-rotate-90",
              )}
            />
          )}
        </>
      )}
    </Button>
  );
};

const DisclosurePanel = ({ className, ...props }: DisclosurePanelProps) => {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps("sm:text-sm", className)}
    >
      {props.children}
    </AriaDisclosurePanel>
  );
};

export { DisclosureGroup, DisclosureTrigger, DisclosurePanel, Disclosure };
