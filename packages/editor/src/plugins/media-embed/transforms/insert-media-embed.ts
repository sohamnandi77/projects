import type { InsertNodesOptions, SlateEditor } from "@udecode/plate-common";
import { getParentNode, insertNodes } from "@udecode/plate-common";

import type { TMediaEmbedElement } from "../base-media-embed-plugin";
import { BaseMediaEmbedPlugin } from "../base-media-embed-plugin";

export const insertMediaEmbed = <E extends SlateEditor>(
  editor: E,
  { url = "" }: Partial<TMediaEmbedElement>,
  options: InsertNodesOptions<E> = {},
): void => {
  if (!editor.selection) return;

  const selectionParentEntry = getParentNode(editor, editor.selection);

  if (!selectionParentEntry) return;

  const [, path] = selectionParentEntry;
  insertNodes<TMediaEmbedElement>(
    editor,
    {
      children: [{ text: "" }],
      type: editor.getType(BaseMediaEmbedPlugin),
      url,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    {
      at: path,
      nextBlock: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(options as any),
    },
  );
};
