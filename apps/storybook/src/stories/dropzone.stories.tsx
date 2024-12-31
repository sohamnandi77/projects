import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Folder, Image } from "lucide-react";

import type { DropEvent } from "@projects/ui";
import { isFileDropItem } from "@projects/ui";
import { Button } from "@projects/ui/button";
import { DropZone } from "@projects/ui/dropzone";
import { FileTrigger } from "@projects/ui/file-trigger";
import { Description } from "@projects/ui/form";
import { Label } from "@projects/ui/label";

const meta = {
  title: "Components/Drop Zone",
  component: DropZone,
  tags: ["autodocs", "drag-and-drop"],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render() {
    const [dropped, setDropped] = useState(false);
    return (
      <DropZone onDrop={() => setDropped(true)}>
        <Label>{dropped ? "Drop nailed" : "Toss your stuff here"}</Label>
      </DropZone>
    );
  },
};

export const UsingFileTrigger: Story = {
  render: function Render() {
    const [droppedImage, setDroppedImage] = useState<string | undefined>(
      undefined,
    );
    const onDropHandler = async (e: DropEvent) => {
      const item = e.items
        .filter(isFileDropItem)
        .find(
          (item) => item.type === "image/jpeg" || item.type === "image/png",
        );
      if (item) {
        const file = await item.getFile();
        setDroppedImage(URL.createObjectURL(file));
      }
    };

    return (
      <DropZone
        getDropOperation={(types) =>
          types.has("image/jpeg") || types.has("image/png") ? "copy" : "cancel"
        }
        onDrop={onDropHandler}>
        {droppedImage ? (
          <img
            alt=""
            src={droppedImage}
            className="aspect-square size-full object-contain"
          />
        ) : (
          <div className="grid space-y-3">
            <div className="mx-auto grid size-12 place-content-center rounded-full border bg-secondary/70 group-data-[drop-target]:border-primary/70 group-data-[drop-target]:bg-primary/20">
              <Image className="size-5" />
            </div>
            <div className="flex justify-center">
              <FileTrigger
                acceptedFileTypes={["image/png", "image/jpeg"]}
                allowsMultiple={false}
                onSelect={(e) => {
                  if (e) {
                    const files = Array.from([...e]);
                    const item = files[0];

                    if (item) {
                      setDroppedImage(URL.createObjectURL(item));
                    }
                  }
                }}>
                <Button variant="secondary" appearance="outline">
                  <Folder className="size-4" />
                  <span>Browse a files</span>
                </Button>
              </FileTrigger>
            </div>
            <Description>Or drag and drop PNG, JPG, GIF up to 10MB</Description>
          </div>
        )}
        <input type="hidden" name="image" value={droppedImage} />
      </DropZone>
    );
  },
};
