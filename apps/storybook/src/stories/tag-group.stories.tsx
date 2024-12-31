import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { Selection } from "@projects/ui";
import { useListData } from "@projects/ui";
import { Description } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { Tag, TagGroup, TagList } from "@projects/ui/tag-group";

const meta = {
  title: "Components/Tag Group",
  component: TagGroup,
  subcomponents: { TagList, Tag },
  tags: ["autodocs", "collections"],
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const androidBrands = [
      { id: "1", name: "Samsung", available: false },
      { id: "2", name: "OnePlus", available: true },
      { id: "3", name: "Google", available: true },
      { id: "4", name: "Xiaomi", available: false },
    ];

    return (
      <TagGroup selectionMode="multiple">
        <Label>Android Brands</Label>
        <TagList items={androidBrands}>
          {(item) => <Tag>{item.name}</Tag>}
        </TagList>
      </TagGroup>
    );
  },
};

export const WithRemoveButton: Story = {
  render: function Render() {
    const list = useListData({
      initialItems: [
        { id: "1", name: "Ferrari", available: true },
        { id: "2", name: "Lamborghini", available: false },
        { id: "3", name: "Porsche", available: true },
        { id: "4", name: "Bugatti", available: false },
        { id: "5", name: "McLaren", available: true },
        { id: "6", name: "Aston Martin", available: true },
        { id: "7", name: "Bentley", available: false },
        { id: "8", name: "Rolls-Royce", available: true },
        { id: "9", name: "Maserati", available: false },
        { id: "10", name: "Jaguar", available: true },
      ],
    });

    return (
      <TagGroup
        selectionMode="multiple"
        className="max-w-sm"
        onRemove={(keys) => list.remove(...keys)}>
        <TagList items={list.items}>{(item) => <Tag>{item.name}</Tag>}</TagList>
      </TagGroup>
    );
  },
};

export const Variant: Story = {
  render: function Render() {
    const shoes = [
      { id: "1", name: "Nike", available: true },
      { id: "2", name: "Adidas", available: false },
      { id: "3", name: "Puma", available: true },
      { id: "4", name: "Reebok", available: true },
    ];

    const shoesList = useListData({ initialItems: shoes });

    return (
      <div className="max-w-sm space-y-2">
        <TagGroup
          variant="primary"
          aria-label="Primary Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup
          variant="secondary"
          aria-label="Secondary Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup
          variant="success"
          aria-label="Success Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup
          variant="info"
          aria-label="Info Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup
          variant="warning"
          aria-label="Warning Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup
          variant="danger"
          aria-label="Danger Intent"
          selectionMode="multiple"
          onRemove={(keys) => shoesList.remove(...keys)}>
          <TagList items={shoesList.items}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
      </div>
    );
  },
};

export const Shape: Story = {
  render: function Render() {
    const carModels = [
      { id: "1", name: "Tesla Model S", available: true },
      { id: "2", name: "Ford Mustang", available: false },
      { id: "3", name: "Chevrolet Camaro", available: true },
      { id: "4", name: "BMW M3", available: false },
      { id: "5", name: "Audi R8", available: true },
    ];

    return (
      <div className="max-w-sm space-y-6">
        <TagGroup shape="square" variant="danger" selectionMode="multiple">
          <Label>Car Models</Label>
          <TagList items={carModels}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
        <TagGroup shape="circle" variant="warning" selectionMode="multiple">
          <Label>Car Models</Label>
          <TagList items={carModels}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function Render() {
    const fruitList = [
      { id: "1", name: "Apple", available: false },
      { id: "2", name: "Banana", available: true },
      { id: "3", name: "Cherry", available: true },
      { id: "4", name: "Date", available: false },
    ];
    const [selected, setSelected] = useState<Selection>(new Set([]));

    return (
      <div>
        <TagGroup
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}>
          <TagList items={fruitList}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>

        <Description className="mt-2 block text-muted-fg [&>strong]:text-fg">
          You have selected: <strong>{Array.from(selected).join(", ")}</strong>
        </Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const androidBrands = [
      { id: "1", name: "Samsung", available: false },
      { id: "2", name: "OnePlus", available: true },
      { id: "3", name: "Google", available: true },
      { id: "4", name: "Xiaomi", available: false },
    ];

    return (
      <div className="space-y-6">
        <TagGroup
          disabledKeys={androidBrands
            .filter((brand) => !brand.available)
            .map((brand) => brand.id)}
          selectionMode="multiple">
          <Label>Disabled Key</Label>
          <TagList items={androidBrands}>
            {(item) => <Tag>{item.name}</Tag>}
          </TagList>
        </TagGroup>

        <TagGroup selectionMode="multiple">
          <Label>Disabled by Tag</Label>
          <TagList items={androidBrands}>
            {(item) => <Tag isDisabled={item.available}>{item.name}</Tag>}
          </TagList>
        </TagGroup>
      </div>
    );
  },
};
