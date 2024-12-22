import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import { fn } from "@storybook/test";
import { Archive, ArrowLeft, LoaderCircle, Plus, Printer } from "lucide-react";

import type { ButtonProps } from "@projects/ui/button";
import { useToggle } from "@projects/hooks/use-toggle";
import { Button, ButtonOptionsKey } from "@projects/ui/button";
import { Tooltip, TooltipContent } from "@projects/ui/tooltip";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "button"],
  argTypes: {
    variant: {
      control: "select",
    },
    size: {
      control: "select",
    },
    appearance: {
      control: "select",
    },
    shape: {
      control: "select",
    },
    isPending: {
      type: "boolean",
    },
    isDisabled: {
      type: "boolean",
    },
  },
  args: { onClick: fn(), children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A button lets peeps do stuff with clicks, presses, taps, and keystrokes.
 */
export const Basic: Story = {
  render: (args) => (
    <div className="space-x-2">
      {Object.keys(ButtonOptionsKey.variant).map((variant) => (
        <Button
          key={variant}
          {...args}
          variant={variant as ButtonProps["variant"]}
        />
      ))}
    </div>
  ),
};

/**
 * When a button is disabled, it cannot be interacted with and is visually indicated by a disabled state.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <div className="space-x-2">
      {Object.keys(ButtonOptionsKey.variant).map((variant) => (
        <Button
          key={variant}
          {...args}
          variant={variant as ButtonProps["variant"]}
        />
      ))}
    </div>
  ),
};

export const Rounded: Story = {
  args: {
    shape: "circle",
  },
  render: (args) => (
    <div className="space-x-2">
      {Object.keys(ButtonOptionsKey.variant).map((variant) => (
        <Button
          key={variant}
          {...args}
          variant={variant as ButtonProps["variant"]}
        />
      ))}
    </div>
  ),
};

export const withIcon: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <Button {...args}>
      <Archive
        className="opacity-60"
        size={16}
        strokeWidth={2}
        data-slot="icon"
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

export const OnlyIcon: Story = {
  args: {
    variant: "secondary",
    appearance: "outline",
    size: "icon",
  },
  render: (args) => (
    <Button {...args}>
      <Archive
        className="opacity-60"
        size={16}
        strokeWidth={2}
        data-slot="icon"
        aria-hidden="true"
      />
    </Button>
  ),
};

export const withBackButton: Story = {
  args: {
    appearance: "plain",
  },
  render: (args) => (
    <Button {...args} className="group">
      <ArrowLeft
        className="opacity-60 transition-transform group-hover:-translate-x-0.5"
        size={16}
        strokeWidth={2}
        data-slot="icon"
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

/**
 * You can also add loader to the button. This is useful when you want to show a loading state for the button.
 */
export const LoadingButton: Story = {
  args: {
    variant: "primary",
    isDisabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <LoaderCircle
        className="animate-spin"
        size={16}
        strokeWidth={2}
        data-slot="icon"
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

/**
 * A Button can indicate a pending state through the isPending prop. This helps when an action takes time to complete, offering users feedback that the process is ongoing. The pending state communicates the change to assistive technologies and disables interactions, except for focus.
 */
export const PendingButton: Story = {
  args: {
    variant: "primary",
  },
  render: function Render(args) {
    // ! Not a recommend practice try to use newer hooks like `useTransition`, here, we didn't used it as `setTimeout` won’t be marked as Transitions.
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleClick = useCallback(() => {
      setIsLoading(true);
      // Simulate an async operation
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Reset after 1 second
    }, []);

    return (
      <Button
        {...args}
        onClick={handleClick}
        isDisabled={isLoading}
        isPending={isLoading}
        className="group relative disabled:opacity-100">
        <span className="group-pending:text-transparent">Click me</span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              data-slot="icon"
            />
          </div>
        )}
      </Button>
    );
  },
};

export const MessagesButton: Story = {
  args: {
    appearance: "outline",
    variant: "secondary",
  },
  render: (args) => (
    <Button {...args}>
      <span>Messages</span>
      <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-fg">
        18
      </span>
    </Button>
  ),
};

export const PrintButton: Story = {
  args: {
    appearance: "outline",
    variant: "secondary",
  },
  render: (args) => (
    <Button {...args}>
      <Printer
        className="opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        data-slot="icon"
      />
      Print
      <kbd className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-bg px-1 font-[inherit] text-[0.625rem] font-medium text-muted-fg">
        ⌘P
      </kbd>
    </Button>
  ),
};

export const IconButton: Story = {
  args: {
    appearance: "outline",
    variant: "secondary",
  },
  render: function Render(args) {
    const [open, toggle] = useToggle();

    return (
      <Button
        {...args}
        className="group rounded-full"
        appearance="outline"
        size="icon"
        onClick={toggle}
        aria-expanded={open}
        data-slot="icon"
        aria-label={open ? "Close menu" : "Open menu"}>
        <Plus
          className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          data-slot="icon"
        />
      </Button>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    appearance: "outline",
    size: "icon",
    variant: "secondary",
  },
  render: (args) => {
    return (
      <Tooltip delay={100} closeDelay={100}>
        <Button aria-label="Add new item" {...args}>
          <Plus size={16} strokeWidth={2} aria-hidden="true" data-slot="icon" />
        </Button>
        <TooltipContent className="px-2 py-1 text-xs">
          Add new item
        </TooltipContent>
      </Tooltip>
    );
  },
};
