import type { Meta, StoryObj } from "@storybook/react";
import type { Key } from "react";
import { useState } from "react";
import { Slash } from "lucide-react";

import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@projects/ui/breadcrumbs";

const meta = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Docs</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const CustomSeperator: Story = {
  args: {},
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Docs</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const Ellipsis: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Docs</BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};

export const DynamicItems: Story = {
  render: () => {
    // Not a recommend practice to define components inside a component, just did it for storybook to show the complete code in stories's show code
    const BreadcrumbItems = () => {
      const [breadcrumbs, setBreadcrumbs] = useState([
        { id: 1, label: "Home" },
        { id: 2, label: "Trendy" },
        { id: 3, label: "March 2022 Assets" },
      ]);

      const navigate = (id: Key) => {
        const i = breadcrumbs.findIndex((item) => item.id === id);
        setBreadcrumbs(breadcrumbs.slice(0, i + 1));
      };

      return (
        <Breadcrumbs items={breadcrumbs} onAction={navigate}>
          {(item) => (
            <BreadcrumbItem className="last:font-normal last:text-foreground last:[&>span]:last:hidden">
              <BreadcrumbLink>{item.label}</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          )}
        </Breadcrumbs>
      );
    };

    return <BreadcrumbItems />;
  },
};

// TODO: Add more stories here
// -> Ellipsis Dropdown
// -> Responsive Ellipsis Dropdown
