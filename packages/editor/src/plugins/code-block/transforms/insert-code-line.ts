import type { SlateEditor } from "@udecode/plate-common";
import { insertElements } from "@udecode/plate-common";

import { CODE_PLUGIN_KEYS } from "../constants";

/** Insert a code line starting with indentation. */
export const insertCodeLine = (editor: SlateEditor, indentDepth = 0) => {
  if (editor.selection) {
    const indent = " ".repeat(indentDepth);

    insertElements(editor, {
      children: [{ text: indent }],
      type: CODE_PLUGIN_KEYS.CODE_LINE,
    });
  }
};
