import type {
  InsertNodesOptions,
  SlateEditor,
  TElement,
} from "@udecode/plate-common";
import {
  isExpanded,
  isSelectionAtBlockStart,
  setElements,
  someNode,
  wrapNodes,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

/**
 * Insert a code block: set the node to code line and wrap it with a code block.
 * If the cursor is not at the block start, insert break before.
 */
export const insertCodeBlock = <E extends SlateEditor>(
  editor: E,
  insertNodesOptions: Omit<InsertNodesOptions<E>, "match"> = {},
) => {
  if (!editor.selection || isExpanded(editor.selection)) return;

  const matchCodeElements = (node: TElement) =>
    node.type === PLUGIN_KEYS.CODE_BLOCK || node.type === PLUGIN_KEYS.CODE_LINE;

  if (
    someNode(editor, {
      match: matchCodeElements,
    })
  ) {
    return;
  }
  if (!isSelectionAtBlockStart(editor)) {
    editor.insertBreak();
  }

  setElements(
    editor,
    {
      children: [{ text: "" }],
      type: PLUGIN_KEYS.CODE_LINE,
    },
    insertNodesOptions,
  );

  wrapNodes<TElement>(
    editor,
    {
      children: [],
      type: PLUGIN_KEYS.CODE_BLOCK,
    },
    insertNodesOptions,
  );
};
