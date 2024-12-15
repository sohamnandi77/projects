import type { SlateEditor } from "@udecode/plate-common";
import { insertElements } from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

/** Insert a code line starting with indentation. */
export const insertCodeLine = (editor: SlateEditor, indentDepth = 0) => {
  if (editor.selection) {
    const indent = " ".repeat(indentDepth);

    insertElements(editor, {
      children: [{ text: indent }],
      type: PLUGIN_KEYS.CODE_LINE,
    });
  }
};
