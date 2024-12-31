import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@projects/ui/button";
import {
  Menu,
  MenuCheckbox,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuItemDetails,
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
    MenuCheckbox,
    MenuContent,
    MenuItemDetails,
    MenuHeader,
    MenuItem,
    MenuKeyboard,
    MenuPrimitive,
    MenuRadio,
    MenuSection,
    MenuSeparator,
    MenuTrigger,
    SubMenu,
  },
  tags: ["autodocs", "collections"],
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
      <MenuContent placement="bottom">
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Reports</MenuItem>
        <MenuSeparator />
        <SubMenu>
          <MenuItem>Settings</MenuItem>
          <MenuContent>
            <MenuItem>General</MenuItem>
            <MenuItem>Security</MenuItem>
            <MenuSeparator />
            <SubMenu>
              <MenuItem>Privacy</MenuItem>
              <MenuContent>
                <MenuItem>Data Sharing</MenuItem>
                <MenuItem>Cookies</MenuItem>
                <MenuSeparator />
                <SubMenu>
                  <MenuItem>Advanced</MenuItem>
                  <MenuContent>
                    <MenuItem>Encryption</MenuItem>
                    <MenuItem>Access Logs</MenuItem>
                    <MenuItem>API Keys</MenuItem>
                  </MenuContent>
                </SubMenu>
              </MenuContent>
            </SubMenu>
          </MenuContent>
        </SubMenu>
        <MenuItem>Help</MenuItem>
      </MenuContent>
    </Menu>
  ),
};
