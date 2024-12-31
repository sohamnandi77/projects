import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Bell,
  Eye,
  EyeOff,
  Grid2X2,
  Languages,
  List,
  Moon,
  Pin,
  PinOff,
  Sun,
} from "lucide-react";

import type { Key } from "@projects/ui";
import { Toggle, ToggleGroup } from "@projects/ui/toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  subcomponents: { ToggleGroup },
  tags: ["autodocs", "button"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Toggle>{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
  ),
};

export const Appearance: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle>{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
      <Toggle appearance="outline">
        {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
      </Toggle>
      <Toggle appearance="solid">
        {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
      </Toggle>
    </div>
  ),
};

export const Shape: Story = {
  render: () => (
    <Toggle appearance="outline" shape="circle">
      {({ isSelected }) => <>{isSelected ? "Disabled" : "Enabled"}</>}
    </Toggle>
  ),
};

export const Size: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-2">
        <Toggle appearance="outline" size="icon">
          {({ isSelected }) => <>{isSelected ? <Eye /> : <EyeOff />}</>}
        </Toggle>
        <Toggle appearance="outline" size="sm">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
        <Toggle appearance="outline" size="md">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
        <Toggle appearance="outline" size="lg">
          {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
        </Toggle>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(false);
    return (
      <Toggle size="icon" isSelected={selected} onChange={setSelected}>
        {({ isSelected }) => <>{isSelected ? <PinOff /> : <Pin />}</>}
      </Toggle>
    );
  },
};

export const ToggleGroupBasic: Story = {
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

export const ToggleGroupOrientation: Story = {
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

export const ToggleGroupControlled: Story = {
  render: function Render() {
    const [selected, setSelected] = useState(new Set<Key>(["bold"]));

    return (
      <>
        <ToggleGroup
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}>
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
