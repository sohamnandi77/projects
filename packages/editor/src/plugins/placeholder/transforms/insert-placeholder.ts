import type { InsertNodesOptions, SlateEditor } from "@udecode/plate-common";
import { insertNodes, withoutNormalizing } from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

import type { TPlaceholderElement } from "../base-placeholder-plugin";
import { BasePlaceholderPlugin } from "../base-placeholder-plugin";

export const insertPlaceholder = <E extends SlateEditor>(
  editor: E,
  mediaType: string,
  options?: InsertNodesOptions<E>,
) => {
  withoutNormalizing(editor, () =>
    insertNodes<TPlaceholderElement>(
      editor,
      {
        children: [{ text: "" }],
        mediaType,
        type: editor.getType(BasePlaceholderPlugin),
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      options as any,
    ),
  );
};

export const insertImagePlaceholder = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>,
) => insertPlaceholder(editor, PLUGIN_KEYS.IMAGE, options);

export const insertVideoPlaceholder = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>,
) => insertPlaceholder(editor, PLUGIN_KEYS.VIDEO, options);

export const insertAudioPlaceholder = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>,
) => insertPlaceholder(editor, PLUGIN_KEYS.AUDIO, options);

export const insertFilePlaceholder = <E extends SlateEditor>(
  editor: E,
  options?: InsertNodesOptions<E>,
) => insertPlaceholder(editor, PLUGIN_KEYS.FILE, options);
