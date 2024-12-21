import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@projects/ui/button";
import {
  Menu,
  MenuCheckbox,
  MenuContent,
  MenuDropdownItemDetails,
  MenuHeader,
  MenuItem,
  MenuKeyboard,
  MenuPrimitive,
  MenuRadio,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
  SubMenu,
} from "@projects/ui/menu";

const meta = {
  title: "Components/Menu",
  component: Menu,
  subcomponents: {
    MenuCheckbox: MenuCheckbox as unknown as React.ComponentType<unknown>,
    MenuContent: MenuContent as unknown as React.ComponentType<unknown>,
    MenuDropdownItemDetails:
      MenuDropdownItemDetails as unknown as React.ComponentType<unknown>,
    MenuHeader: MenuHeader as unknown as React.ComponentType<unknown>,
    MenuItem: MenuItem as unknown as React.ComponentType<unknown>,
    MenuKeyboard: MenuKeyboard as unknown as React.ComponentType<unknown>,
    MenuPrimitive: MenuPrimitive as unknown as React.ComponentType<unknown>,
    MenuRadio: MenuRadio as unknown as React.ComponentType<unknown>,
    MenuSection: MenuSection as unknown as React.ComponentType<unknown>,
    MenuSeparator: MenuSeparator as unknown as React.ComponentType<unknown>,
    MenuTrigger: MenuTrigger as unknown as React.ComponentType<unknown>,
    SubMenu: SubMenu as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "input"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: null,
  },
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger>Open</MenuTrigger>
      <MenuContent placement="bottom">
        <MenuItem>Inbox</MenuItem>
        <MenuItem>Sent</MenuItem>
        <MenuItem>New Message</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const SubMenuExample: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Menu>
      <Button appearance="outline">Open</Button>
      <MenuContent placement="bottom" className="sm:min-w-48">
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Reports</MenuItem>
        <MenuSeparator />
        <SubMenu>
          <MenuItem>Settings</MenuItem>
          <MenuContent>
            <MenuItem>General</MenuItem>
            <MenuItem>Security</MenuItem>
            <MenuItem>Privacy</MenuItem>
            <MenuItem>Data Sharing</MenuItem>
          </MenuContent>
        </SubMenu>
        <MenuItem>Help</MenuItem>
      </MenuContent>
    </Menu>
  ),
};
