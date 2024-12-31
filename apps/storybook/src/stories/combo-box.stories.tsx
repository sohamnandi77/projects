import type { Meta, StoryObj } from "@storybook/react";

import {
  ComboBox,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxList,
} from "@projects/ui/combo-box";

const meta = {
  title: "Components/Combo Box",
  component: ComboBox,
  subcomponents: { ComboBoxInput, ComboBoxItem, ComboBoxList },
  tags: ["autodocs", "collections"],
  args: {
    children: <></>,
  },
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  {
    id: 1,
    name: "Barbara Kirlin Sr.",
    image_url: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Rosemarie Koch",
    image_url: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Mrs. Reva Heaney Jr.",
    image_url: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Ms. Ettie Abshire DVM",
    image_url: "https://i.pravatar.cc/150?img=4",
  },
  { id: 5, name: "Bria Ziemann", image_url: "https://i.pravatar.cc/150?img=5" },
  {
    id: 6,
    name: "Heloise Borer Sr.",
    image_url: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Miss Jacinthe Gerlach DVM",
    image_url: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Miss Stephania Schaefer Sr.",
    image_url: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Kevon Hackett MD",
    image_url: "https://i.pravatar.cc/150?img=9",
  },
  { id: 10, name: "Tom Ledner", image_url: "https://i.pravatar.cc/150?img=10" },
];

export const Basic: Story = {
  render: () => (
    <ComboBox>
      <ComboBoxInput />
      <ComboBoxList items={users}>
        {(item) => (
          <ComboBoxItem id={item.id} textValue={item.name}>
            {item.name}
          </ComboBoxItem>
        )}
      </ComboBoxList>
    </ComboBox>
  ),
};
