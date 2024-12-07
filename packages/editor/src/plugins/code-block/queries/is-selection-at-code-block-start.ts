import type { SlateEditor } from "@udecode/plate-common";
import { isExpanded, isStartPoint } from "@udecode/plate-common";

import { getCodeLineEntry } from "./get-code-line-entry";

/** Is the selection at the start of the first code line in a code block */
export const isSelectionAtCodeBlockStart = (editor: SlateEditor) => {
  const { selection } = editor;

  if (!selection || isExpanded(selection)) return false;

  const { codeBlock } = getCodeLineEntry(editor) ?? {};

  if (!codeBlock) return false;

  return isStartPoint(editor, selection.anchor, codeBlock[1]);
};
