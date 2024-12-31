import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { Selection } from "@projects/ui";
import { useDragAndDrop, useListData } from "@projects/ui";
import { Description } from "@projects/ui/form";
import {
  GridList,
  GridListEmptyState,
  GridListItem,
} from "@projects/ui/grid-list";

const meta = {
  title: "Components/GridList",
  component: GridList,
  subcomponents: {
    GridListEmptyState,
    GridListItem,
  },
  tags: ["autodocs", "collections"],
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const items = [
      { id: "1", name: "The Beatles" },
      { id: "2", name: "Led Zeppelin" },
      { id: "3", name: "Pink Floyd" },
      { id: "4", name: "Queen" },
      { id: "5", name: "The Rolling Stones" },
      { id: "6", name: "The Who" },
    ];

    return (
      <GridList
        selectionMode="single"
        items={items}
        aria-label="Select your favorite bands"
        className="min-w-64">
        {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
      </GridList>
    );
  },
};

export const MultipleSelection: Story = {
  render: function Render() {
    const items = [
      { id: "1", name: "The Beatles" },
      { id: "2", name: "Led Zeppelin" },
      { id: "3", name: "Pink Floyd" },
      { id: "4", name: "Queen" },
      { id: "5", name: "The Rolling Stones" },
    ];

    return (
      <GridList
        items={items}
        aria-label="Select items"
        selectionMode="multiple"
        className="min-w-64">
        {(item) => <GridListItem>{item.name}</GridListItem>}
      </GridList>
    );
  },
};

export const DragAndDrop: Story = {
  render: function Render() {
    const items = [
      { id: 1, name: "The Beatles" },
      { id: 2, name: "Led Zeppelin" },
      { id: 3, name: "Pink Floyd" },
      { id: 4, name: "Queen" },
      { id: 5, name: "The Rolling Stones" },
      { id: 6, name: "The Beach Boys" },
      { id: 7, name: "The Kinks" },
      { id: 8, name: "The Who" },
    ];

    const list = useListData({
      initialItems: items,
    });
    const { dragAndDropHooks } = useDragAndDrop({
      getItems: (keys) =>
        [...keys].map((key) => ({
          "text/plain": list.getItem(key)?.name ?? "",
        })),
      onReorder(e) {
        if (e.target.dropPosition === "before") {
          list.moveBefore(e.target.key, e.keys);
        } else if (e.target.dropPosition === "after") {
          list.moveAfter(e.target.key, e.keys);
        }
      },
    });

    return (
      <GridList
        items={list.items}
        aria-label="Droppable list"
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}>
        {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
      </GridList>
    );
  },
};

export const RenderEmptyState: Story = {
  render: function Render() {
    return (
      <GridList
        items={[]}
        aria-label="Select items"
        selectionMode="multiple"
        className="min-w-64"
        renderEmptyState={() => (
          <GridListEmptyState>No bands selected</GridListEmptyState>
        )}
      />
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    const items = [
      { id: "1", name: "The Beatles" },
      { id: "2", name: "Led Zeppelin" },
      { id: "3", name: "Pink Floyd" },
      { id: "4", name: "Queen" },
      { id: "5", name: "The Rolling Stones" },
    ];

    return (
      <div>
        <GridList
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          items={items}
          aria-label="Select items"
          selectionMode="multiple"
          className="min-w-64">
          {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
        </GridList>
        <Description className="mt-2 block text-muted-fg [&>strong]:text-fg">
          You have selected:{" "}
          <strong>{Array.from(selectedKeys).join(", ")}</strong>
        </Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const items = [
      { id: "1", name: "The Beatles" },
      { id: "2", name: "Led Zeppelin" },
      { id: "3", name: "Pink Floyd" },
      { id: "4", name: "Queen" },
      { id: "5", name: "The Rolling Stones" },
    ];

    return (
      <div className="space-y-4">
        <GridList
          items={items}
          aria-label="Select your favorite bands"
          selectionMode="multiple"
          className="min-w-64">
          {(item) => (
            <GridListItem
              isDisabled={[2, 5].includes(Number(item.id))}
              id={item.id}>
              {item.name}
            </GridListItem>
          )}
        </GridList>
        <div>
          To disable items via the parent component, you can use the
          disabledKeys prop like this:
        </div>
        <GridList
          items={items}
          disabledKeys={[2, 5]}
          aria-label="Select your favorite bands"
          selectionMode="multiple"
          className="min-w-64">
          {(item) => (
            <GridListItem id={Number(item.id)}>{item.name}</GridListItem>
          )}
        </GridList>
      </div>
    );
  },
};
