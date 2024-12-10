import type { InsertNodesOptions, SlateEditor } from "@udecode/plate-common";

import { BaseImagePlugin } from "../base-image-plugin";
import { insertImage } from "./insert-image";

export const insertImageFromFiles = (
  editor: SlateEditor,
  files: FileList,
  options: InsertNodesOptions = {},
) => {
  for (const file of files) {
    const [mime] = file.type.split("/");
    if (mime !== "image") return;

    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    reader.addEventListener("load", async () => {
      if (!reader.result) {
        return;
      }

      const uploadImage = editor.getOptions(BaseImagePlugin).uploadImage;

      const uploadedUrl = uploadImage
        ? await uploadImage(reader.result)
        : reader.result;

      insertImage(editor, uploadedUrl, options);
    });

    reader.readAsDataURL(file);
  }
};
