import type { InsertNodesOptions, SlateEditor } from "@udecode/plate-common";
import { insertNodes } from "@udecode/plate-common";

import type { TImageElement } from "../base-image-plugin";
import { BaseImagePlugin } from "../base-image-plugin";

export const insertImage = <E extends SlateEditor>(
  editor: E,
  url: ArrayBuffer | string,
  options: InsertNodesOptions<E> = {},
) => {
  const text = { text: "" };
  const image: TImageElement = {
    children: [text],
    type: editor.getType(BaseImagePlugin),
    url: url as string,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  insertNodes<TImageElement>(editor, image, {
    nextBlock: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options as any),
  });
};
