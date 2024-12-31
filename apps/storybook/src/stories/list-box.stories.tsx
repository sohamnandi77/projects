import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { Selection } from "@projects/ui";
import { useDragAndDrop, useListData } from "@projects/ui";
import { Description } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import {
  ListBox,
  ListBoxItem,
  ListBoxItemDetails,
  ListBoxPicker,
  ListBoxSection,
} from "@projects/ui/list-box";

const meta = {
  title: "Components/List Box",
  component: ListBox,
  subcomponents: {
    ListBoxSection,
    ListBoxItemDetails,
    ListBoxItem,
    ListBoxPicker,
  },
  tags: ["autodocs", "collections"],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const rockPopBands = [
      { id: "1", name: "Nirvana" },
      { id: "2", name: "Radiohead" },
      { id: "3", name: "Foo Fighters" },
      { id: "4", name: "Arctic Monkeys" },
      { id: "5", name: "The Strokes" },
    ];
    return (
      <ListBox
        {...args}
        items={rockPopBands}
        selectionMode="single"
        aria-label="Bands">
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </ListBox>
    );
  },
};

export const MultipleSelection: Story = {
  render: function Render() {
    const fruits = [
      {
        id: 1,
        name: "Apple",
      },
      {
        id: 2,
        name: "Banana",
      },
      {
        id: 3,
        name: "Orange",
      },
      {
        id: 4,
        name: "Strawberry",
      },
      {
        id: 5,
        name: "Grapes",
      },
      {
        id: 6,
        name: "Mango",
      },
      {
        id: 7,
        name: "Pineapple",
      },
    ];

    const [selected, setSelected] = useState<Selection>(new Set([3]));

    return (
      <>
        <ListBox
          selectedKeys={selected}
          onSelectionChange={setSelected}
          items={fruits}
          aria-label="Fruits"
          selectionMode="multiple">
          {(fruit) => (
            <ListBoxItem id={fruit.id} textValue={fruit.name}>
              {fruit.name}
            </ListBoxItem>
          )}
        </ListBox>

        {[...selected].length > 0 && (
          <Description className="mt-4 block space-x-2">
            <span>Selected:</span>
            <span>
              {selected === "all" ? "All selected" : [...selected].join(", ")}
            </span>
          </Description>
        )}
      </>
    );
  },
};

export const ItemDetails: Story = {
  render: function Render() {
    const roles = [
      { id: 1, name: "Admin", description: "Has full access to all resources" },
      {
        id: 2,
        name: "Editor",
        description: "Can edit content but has limited access to settings",
      },
      {
        id: 3,
        name: "Viewer",
        description: "Can view content but cannot make changes",
      },
      {
        id: 4,
        name: "Contributor",
        description: "Can contribute content for review",
      },
      {
        id: 5,
        name: "Guest",
        description: "Limited access, mostly for viewing purposes",
      },
    ];

    const [selected, setSelected] = useState<Selection>(new Set([1]));
    return (
      <ListBox
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={roles}
        aria-label="Bands">
        {(item) => (
          <ListBoxItem id={item.id}>
            <ListBoxItemDetails>
              <Label>{item.name}</Label>
              <Description>{item.description}</Description>
            </ListBoxItemDetails>
          </ListBoxItem>
        )}
      </ListBox>
    );
  },
};

export const ListboxSection: Story = {
  render: function Render() {
    const bands = [
      {
        id: 1,
        name: "The Beatles",
        albums: [
          {
            id: 101,
            name: "Abbey Road",
          },
          {
            id: 102,
            name: "Sgt. Pepper's Lonely Hearts Club Band",
          },
          {
            id: 103,
            name: "Revolver",
          },
        ],
      },
      {
        id: 2,
        name: "Led Zeppelin",
        albums: [
          {
            id: 201,
            name: "Led Zeppelin IV",
          },
          {
            id: 202,
            name: "Physical Graffiti",
          },
          {
            id: 203,
            name: "Houses of the Holy",
          },
          {
            id: 204,
            name: "Led Zeppelin II",
          },
        ],
      },
      {
        id: 3,
        name: "Pink Floyd",
        albums: [
          {
            id: 301,
            name: "The Dark Side of the Moon",
          },
          {
            id: 302,
            name: "The Wall",
          },
          {
            id: 303,
            name: "Wish You Were Here",
          },
          {
            id: 304,
            name: "Animals",
          },
          {
            id: 305,
            name: "Meddle",
          },
        ],
      },
      {
        id: 4,
        name: "Queen",
        albums: [
          {
            id: 401,
            name: "A Night at the Opera",
          },
          {
            id: 402,
            name: "News of the World",
          },
          {
            id: 403,
            name: "Sheer Heart Attack",
          },
          {
            id: 404,
            name: "The Game",
          },
          {
            id: 405,
            name: "Jazz",
          },
          {
            id: 406,
            name: "Queen II",
          },
        ],
      },
      {
        id: 5,
        name: "The Rolling Stones",
        albums: [
          {
            id: 501,
            name: "Let It Bleed",
          },
          {
            id: 502,
            name: "Sticky Fingers",
          },
          {
            id: 503,
            name: "Exile on Main St.",
          },
          {
            id: 504,
            name: "Beggars Banquet",
          },
          {
            id: 505,
            name: "Some Girls",
          },
          {
            id: 506,
            name: "Tattoo You",
          },
        ],
      },
      {
        id: 6,
        name: "Nirvana",
        albums: [
          {
            id: 601,
            name: "Nevermind",
          },
          {
            id: 602,
            name: "In Utero",
          },
          {
            id: 603,
            name: "Bleach",
          },
        ],
      },
      {
        id: 7,
        name: "The Doors",
        albums: [
          {
            id: 701,
            name: "The Doors",
          },
          {
            id: 702,
            name: "L.A. Woman",
          },
          {
            id: 703,
            name: "Strange Days",
          },
          {
            id: 704,
            name: "Morrison Hotel",
          },
        ],
      },
      {
        id: 8,
        name: "Radiohead",
        albums: [
          {
            id: 801,
            name: "OK Computer",
          },
          {
            id: 802,
            name: "Kid A",
          },
          {
            id: 803,
            name: "The Bends",
          },
          {
            id: 804,
            name: "In Rainbows",
          },
        ],
      },
      {
        id: 9,
        name: "AC/DC",
        albums: [
          {
            id: 901,
            name: "Back in Black",
          },
          {
            id: 902,
            name: "Highway to Hell",
          },
          {
            id: 903,
            name: "Let There Be Rock",
          },
        ],
      },
      {
        id: 10,
        name: "The Who",
        albums: [
          {
            id: 1001,
            name: "Who's Next",
          },
          {
            id: 1002,
            name: "Tommy",
          },
          {
            id: 1003,
            name: "Quadrophenia",
          },
          {
            id: 1004,
            name: "My Generation",
          },
          {
            id: 1005,
            name: "The Who Sell Out",
          },
        ],
      },
    ];
    return (
      <ListBox items={bands} aria-label="Bands" selectionMode="multiple">
        {(item) => (
          <ListBoxSection items={item.albums} title={item.name} id={item.id}>
            {(album) => <ListBoxItem id={album.id}>{album.name}</ListBoxItem>}
          </ListBoxSection>
        )}
      </ListBox>
    );
  },
};

export const Rearrange: Story = {
  render: function Render() {
    const list = useListData({
      initialItems: [
        { id: "1", name: "Nirvana" },
        { id: "2", name: "Radiohead" },
        { id: "3", name: "Foo Fighters" },
        { id: "4", name: "Arctic Monkeys" },
        { id: "5", name: "The Strokes" },
      ],
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
      <ListBox
        items={list.items}
        aria-label="Bands"
        selectionMode="multiple"
        dragAndDropHooks={dragAndDropHooks}>
        {(item) => <ListBoxItem key={item.id}>{item.name}</ListBoxItem>}
      </ListBox>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const fruits = [
      {
        id: 1,
        name: "Apple",
      },
      {
        id: 2,
        name: "Banana",
      },
      {
        id: 3,
        name: "Orange",
      },
      {
        id: 4,
        name: "Strawberry",
      },
      {
        id: 5,
        name: "Grapes",
      },
      {
        id: 6,
        name: "Mango",
      },
      {
        id: 7,
        name: "Pineapple",
      },
    ];
    const [selected, setSelected] = useState<Selection>(new Set([1]));

    return (
      <>
        <ListBox
          selectedKeys={selected}
          onSelectionChange={setSelected}
          items={fruits}
          aria-label="Fruits"
          selectionMode="single">
          {(fruit) => (
            <ListBoxItem id={fruit.id} textValue={fruit.name}>
              {fruit.name}
            </ListBoxItem>
          )}
        </ListBox>
        <Description className="mt-4 block [&>strong]:font-medium [&>strong]:text-fg">
          Selected: <strong>{selected}</strong>
        </Description>
      </>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const fruits = [
      {
        id: 1,
        name: "Apple",
      },
      {
        id: 2,
        name: "Banana",
      },
      {
        id: 3,
        name: "Orange",
      },
      {
        id: 4,
        name: "Strawberry",
      },
      {
        id: 5,
        name: "Grapes",
      },
      {
        id: 6,
        name: "Mango",
      },
      {
        id: 7,
        name: "Pineapple",
      },
    ];

    return (
      <ListBox
        disabledKeys={[2, 3, 4, 5]}
        items={fruits}
        aria-label="Fruits"
        selectionMode="multiple">
        {(fruit) => <ListBoxItem id={fruit.id}>{fruit.name}</ListBoxItem>}
      </ListBox>
    );
  },
};
