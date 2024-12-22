import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Bell, Grid2X2, Languages, List, Moon, Sun } from "lucide-react";

import type { Key } from "@projects/ui";
import { Toggle, ToggleGroup } from "@projects/ui/toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  subcomponents: {
    ToggleGroup: ToggleGroup as unknown as React.ComponentType<unknown>,
  },
  tags: ["autodocs", "button"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <ToggleGroup>
      <Toggle>
        <Grid2X2 />
        Grid
      </Toggle>
      <Toggle>
        <List />
        List
      </Toggle>
    </ToggleGroup>
  ),
};

export const Orientation: Story = {
  render: () => (
    <ToggleGroup orientation="vertical">
      <Toggle>
        {({ isSelected }) => (
          <>
            {isSelected ? <Moon className="fill-current" /> : <Sun />}
            {isSelected ? "Dark" : "Light"}Mode
          </>
        )}
      </Toggle>
      <Toggle>
        {({ isSelected }) => (
          <>
            {isSelected ? <Bell className="fill-current" /> : <Bell />}
            Notifications {isSelected ? "On" : "Off"}
          </>
        )}
      </Toggle>
      <Toggle>
        {({ isSelected }) => (
          <>
            {isSelected ? (
              <Languages className="fill-current" />
            ) : (
              <Languages />
            )}
            Always Translate
          </>
        )}
      </Toggle>
    </ToggleGroup>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(new Set<Key>(["bold"]));

    return (
      <>
        <ToggleGroup
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Toggle id="bold">Bold</Toggle>
          <Toggle id="italic">Italic</Toggle>
          <Toggle id="underline">Underline</Toggle>
        </ToggleGroup>

        {[...selected].length > 0 && (
          <p className="mt-4 text-muted-fg">
            Selected:{" "}
            <strong className="font-semibold text-fg">
              {[...selected].join(", ")}
            </strong>
          </p>
        )}
      </>
    );
  },
};
