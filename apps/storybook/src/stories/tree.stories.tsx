import type { Meta, StoryObj } from "@storybook/react";

import { Collection } from "@projects/ui";
import {
  Tree,
  TreeItem,
  TreeItemCheckbox,
  TreeItemContent,
  TreeItemIndicator,
  TreeItemLabel,
} from "@projects/ui/tree";

const meta = {
  title: "Components/Tree",
  component: Tree,
  subcomponents: {
    Tree,
    TreeItem,
    TreeItemLabel,
    TreeItemIndicator,
    TreeItemCheckbox,
    TreeItemContent,
  },
  tags: ["autodocs", "collections"],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    interface FileNode {
      id: number;
      title: string;
      children: FileNode[];
    }
    const files: FileNode[] = [
      {
        id: 1,
        title: "Work",
        children: [
          {
            id: 2,
            title: "Reports",
            children: [
              {
                id: 3,
                title: "2023",
                children: [
                  {
                    id: 4,
                    title: "Q1 Report",
                    children: [
                      { id: 5, title: "Summary", children: [] },
                      { id: 6, title: "Details", children: [] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 7,
            title: "Presentations",
            children: [
              {
                id: 8,
                title: "2023 Projects",
                children: [
                  {
                    id: 9,
                    title: "Project A",
                    children: [
                      { id: 10, title: "Draft", children: [] },
                      { id: 11, title: "Final", children: [] },
                    ],
                  },
                  {
                    id: 12,
                    title: "Project B",
                    children: [{ id: 13, title: "Research", children: [] }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 14,
        title: "Personal",
        children: [
          {
            id: 15,
            title: "Hobbies",
            children: [
              {
                id: 16,
                title: "Photography",
                children: [
                  { id: 17, title: "Travel", children: [] },
                  { id: 18, title: "Portraits", children: [] },
                ],
              },
              {
                id: 19,
                title: "Cooking",
                children: [{ id: 20, title: "Recipes", children: [] }],
              },
            ],
          },
        ],
      },
      {
        id: 21,
        title: "Projects",
        children: [
          {
            id: 22,
            title: "Web Development",
            children: [
              {
                id: 23,
                title: "Portfolio",
                children: [
                  { id: 24, title: "Images", children: [] },
                  { id: 25, title: "CSS", children: [] },
                ],
              },
              { id: 26, title: "Landing Page", children: [] },
            ],
          },
          {
            id: 27,
            title: "Mobile Apps",
            children: [{ id: 28, title: "Weather App", children: [] }],
          },
        ],
      },
      {
        id: 29,
        title: "Finance",
        children: [
          {
            id: 30,
            title: "Budget",
            children: [
              {
                id: 31,
                title: "2023",
                children: [
                  { id: 32, title: "January", children: [] },
                  { id: 33, title: "February", children: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 34,
        title: "Health",
        children: [
          {
            id: 35,
            title: "Fitness",
            children: [
              { id: 36, title: "Workouts", children: [] },
              { id: 37, title: "Nutrition", children: [] },
            ],
          },
          { id: 38, title: "Wellness", children: [] },
        ],
      },
    ];

    const renderItem = (item: FileNode): React.ReactNode => {
      return (
        <TreeItem key={item.id} textValue={item.title}>
          <TreeItemContent>
            {item.children.length > 0 && <TreeItemIndicator />}
            <TreeItemCheckbox />
            <TreeItemLabel>{item.title}</TreeItemLabel>
          </TreeItemContent>
          {item.children.length > 0 && (
            <Collection items={item.children}>{renderItem}</Collection>
          )}
        </TreeItem>
      );
    };

    return (
      <Tree
        className="w-full max-w-xl"
        aria-label="Files"
        selectionMode="multiple"
        items={files}>
        {files.map(renderItem)}
      </Tree>
    );
  },
};
