import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Description } from "@projects/ui/form";
import { Switch } from "@projects/ui/switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs", "controls"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return <Switch>Switch Theme</Switch>;
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [darkMode, setDarkMode] = useState(false);

    return (
      <>
        <Switch isSelected={darkMode} onChange={setDarkMode} value="dark_mode">
          Enable Dark Mode
        </Switch>

        <Description className="mt-2 block [&>strong]:text-fg">
          Dark Mode is <strong>{darkMode ? "enabled" : "disabled"}</strong>
        </Description>
      </>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return <Switch isDisabled>Dark Mode</Switch>;
  },
};
