import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@projects/ui/heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs", "surfaces"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading level={1}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={2}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={3}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={4}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={5}>The quick brown fox jumps over the lazy dog</Heading>
      <Heading level={6}>The quick brown fox jumps over the lazy dog</Heading>
    </div>
  ),
};

export const LetterSpacing: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading level={5} tracking="tighter">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={5} tracking="tight">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={5} tracking="normal">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={5} tracking="wide">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={5} tracking="wider">
        The quick brown fox jumps over the lazy dog
      </Heading>
      <Heading level={5} tracking="widest">
        The quick brown fox jumps over the lazy dog
      </Heading>
    </div>
  ),
};
