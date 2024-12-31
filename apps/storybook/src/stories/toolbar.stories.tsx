import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  BookImage,
  BoomBox,
  Camera,
  ChevronDown,
  EllipsisVertical,
  Grid,
  Image,
  Italic,
  Link,
  MousePointer2,
  PenBox,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

import { Button } from "@projects/ui/button";
import { Checkbox } from "@projects/ui/checkbox";
import { Menu, MenuContent, MenuItem } from "@projects/ui/menu";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarSeparator,
} from "@projects/ui/toolbar";

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  subcomponents: {
    ToolbarGroup,
    ToolbarItem,
    ToolbarSeparator,
  },
  tags: ["autodocs", "controls"],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Toolbar aria-label="Toolbars" className="rounded-lg border p-2">
      <ToolbarGroup aria-label="Text Formatting Options">
        <ToolbarItem
          defaultSelected
          aria-label="Bold"
          size="icon"
          appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Bold className="size-5 stroke-[3]" />
              ) : (
                <Bold className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Italic" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Italic className="size-5 stroke-[3]" />
              ) : (
                <Italic className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Underline" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Underline className="size-5 stroke-[3]" />
              ) : (
                <Underline className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem
          aria-label="Strikethrough"
          size="icon"
          appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Strikethrough className="size-5 stroke-[3]" />
              ) : (
                <Strikethrough className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Alignment">
        <ToolbarItem aria-label="Align Left" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignLeft className="size-5 stroke-[3]" />
              ) : (
                <AlignLeft className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Align Center" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignCenter className="size-5 stroke-[3]" />
              ) : (
                <AlignCenter className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Align Right" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignRight className="size-5 stroke-[3]" />
              ) : (
                <AlignRight className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Align Justify" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignJustify className="size-5 stroke-[3]" />
              ) : (
                <AlignJustify className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Checkbox>Spell Check</Checkbox>
      <ToolbarGroup className="ml-auto">
        <Menu>
          <Button aria-label="Other options" appearance="outline" size="sm">
            Options...
            <ChevronDown />
          </Button>
          <MenuContent showArrow placement="bottom right">
            <MenuItem>
              <Undo className="size-5" />
              Undo
            </MenuItem>
            <MenuItem>
              <Redo className="size-5" />
              Redo
            </MenuItem>
            <MenuItem>
              <Link className="size-5" />
              Insert Link
            </MenuItem>
            <MenuItem>
              <Image className="size-5" />
              Insert Image
            </MenuItem>
            <MenuItem>
              <Grid className="size-5" />
              Insert Grid
            </MenuItem>
          </MenuContent>
        </Menu>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Orientation: Story = {
  render: () => (
    <Toolbar aria-label="Toolbox" orientation="vertical">
      <ToolbarGroup aria-label="Toolbox">
        <ToolbarItem aria-label="Cursor" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <MousePointer2 className="size-5 stroke-[3]" />
              ) : (
                <MousePointer2 className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Pencil Box" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <PenBox className="size-5 stroke-[3]" />
              ) : (
                <PenBox className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Pencil Box" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <BoomBox className="size-5 stroke-[3]" />
              ) : (
                <BoomBox className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Gallery">
        <ToolbarItem aria-label="Camera" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Camera className="size-5 stroke-[3]" />
              ) : (
                <Camera className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Gallery" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Image className="size-5 stroke-[3]" />
              ) : (
                <Image className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Alignment">
        <ToolbarItem aria-label="Align Left" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignLeft className="size-5 stroke-[3]" />
              ) : (
                <AlignLeft className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Align Left" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignCenter className="size-5 stroke-[3]" />
              ) : (
                <AlignCenter className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem
          aria-label="Align Justify"
          size="icon"
          appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignJustify className="size-5 stroke-[3]" />
              ) : (
                <AlignJustify className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Menu>
          <Button aria-label="Other options" appearance="outline" size="icon">
            <EllipsisVertical />
          </Button>
          <MenuContent showArrow placement="right">
            <MenuItem>
              <Undo className="size-5" />
              Undo
            </MenuItem>
            <MenuItem>
              <Redo className="size-5" />
              Redo
            </MenuItem>
            <MenuItem>
              <Link className="size-5" />
              Insert Link
            </MenuItem>
            <MenuItem>
              <BookImage className="size-5" />
              Insert Image
            </MenuItem>
            <MenuItem>
              <Grid className="size-5" />
              Insert Grid
            </MenuItem>
          </MenuContent>
        </Menu>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toolbar aria-label="Toolbox">
      <ToolbarGroup aria-label="Toolbox">
        <ToolbarItem
          isDisabled
          aria-label="Cursor"
          size="icon"
          appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <MousePointer2 className="size-5 stroke-[3]" />
              ) : (
                <MousePointer2 className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Pencil Box" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <PenBox className="size-5 stroke-[3]" />
              ) : (
                <PenBox className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Pencil Box" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <BoomBox className="size-5 stroke-[3]" />
              ) : (
                <BoomBox className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup isDisabled aria-label="Gallery">
        <ToolbarItem aria-label="Camera" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <Camera className="size-5 stroke-[3]" />
              ) : (
                <Camera className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem aria-label="Gallery" size="icon" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? <Image className="size-5 stroke-[3]" /> : <Image />}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Alignment">
        <ToolbarItem size="icon" aria-label="Align Right" appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignRight className="size-5 stroke-[3]" />
              ) : (
                <AlignRight className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
        <ToolbarItem
          size="icon"
          aria-label="Align Justify"
          appearance="outline">
          {({ isSelected }) => (
            <>
              {isSelected ? (
                <AlignJustify className="size-5 stroke-[3]" />
              ) : (
                <AlignJustify className="size-5" />
              )}
            </>
          )}
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  ),
};
