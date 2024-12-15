import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { fn } from "@storybook/test";
import { Archive, ArrowLeft, LoaderCircle, Plus, Printer } from "lucide-react";

import { useToggle } from "@projects/hooks/use-toggle";
import { Button, buttonVariants } from "@projects/ui/button";
import { Tooltip, TooltipContent } from "@projects/ui/tooltip";

import { getArgTypes } from "~/utils/getArgTypes";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    ...getArgTypes(buttonVariants),
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

export const Primary: Story = {
  args: {
    variant: "default",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
  },
  render: (args) => <Button {...args} isDisabled />,
};

export const Rounded: Story = {
  args: {},
  render: (args) => <Button {...args} className="rounded-full" />,
};

export const withIcon: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Archive
        className="-ms-1 me-2 opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

export const OnlyIcon: Story = {
  args: {
    variant: "outline",
    size: "icon",
  },
  render: (args) => (
    <Button {...args}>
      <Archive
        className="opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  ),
};

export const withBackButton: Story = {
  args: {
    variant: "ghost",
    className: "group",
  },
  render: (args) => (
    <Button {...args}>
      <ArrowLeft
        className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

export const LoadingButton: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Button isDisabled {...args}>
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Button
    </Button>
  ),
};

export const PendingButton: Story = {
  args: {
    variant: "default",
  },
  render: (args) => {
    // ! Not a recommend practice try to use newer hooks like `useTransition`, just did it for storybook to show the complete code in stories's show code
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleClick = () => {
      setIsLoading(true);
      // Simulate an async operation
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Reset after 1 second
    };

    return (
      <Button
        {...args}
        onClick={handleClick}
        isDisabled={isLoading}
        isPending={isLoading}
        className="group relative disabled:opacity-100"
      >
        <span className="group-pending:text-transparent">Click me</span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle
              className="animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        )}
      </Button>
    );
  },
};

export const MessagesButton: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Button {...args}>
      <span>Messages</span>
      <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-stroke-secondary px-1 font-[inherit] text-[0.625rem] font-medium text-muted-fg">
        18
      </span>
    </Button>
  ),
};

export const PrintButton: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Button variant="outline" {...args}>
      <Printer
        className="-ms-1 me-2 opacity-60"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Print
      <kbd className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-stroke-secondary bg-bg px-1 font-[inherit] text-[0.625rem] font-medium text-muted-fg/70">
        ⌘P
      </kbd>
    </Button>
  ),
};

export const IconButton: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, toggle] = useToggle();

    return (
      <Button
        {...args}
        className="group rounded-full"
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <Plus
          className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      </Button>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    variant: "outline",
    size: "icon",
  },
  render: (args) => {
    return (
      <Tooltip delay={0} closeDelay={0}>
        <Button aria-label="Add new item" {...args}>
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <TooltipContent className="px-2 py-1 text-xs">
          Add new item
        </TooltipContent>
      </Tooltip>
    );
  },
};
