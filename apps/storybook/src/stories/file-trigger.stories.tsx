import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Folder } from "lucide-react";

import { Button } from "@projects/ui/button";
import { FileTrigger } from "@projects/ui/file-trigger";
import { Description } from "@projects/ui/form";

const meta = {
  title: "Components/File Trigger",
  component: FileTrigger,
  tags: ["autodocs", "button"],
} satisfies Meta<typeof FileTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <FileTrigger>
      <Button variant="secondary">
        <Folder className="size-4" />
        <span>Browse a files</span>
      </Button>
    </FileTrigger>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [file, setFile] = useState<string[] | null>(null);

    return (
      <div className="space-y-3">
        <FileTrigger
          onSelect={(e) => {
            const files = Array.from(e ?? []);
            const filenames = files.map((file) => file.name);
            setFile(filenames);
          }}>
          <Button variant="secondary">
            <Folder className="size-4" />
            <span>Browse a files</span>
          </Button>
        </FileTrigger>
        {file?.length && (
          <Description className="mt-2 block max-w-60 truncate [&>strong]:font-medium [&>strong]:text-fg">
            Your file: <strong>{file}</strong>
          </Description>
        )}
      </div>
    );
  },
};
