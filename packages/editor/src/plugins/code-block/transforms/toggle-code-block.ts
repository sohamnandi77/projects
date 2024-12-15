import type { SlateEditor, TElement } from "@udecode/plate-common";
import {
  setElements,
  someNode,
  withoutNormalizing,
  wrapNodes,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

import { unwrapCodeBlock } from "./unwrap-code-block";

export const toggleCodeBlock = (editor: SlateEditor) => {
  if (!editor.selection) return;

  const codeBlockType = PLUGIN_KEYS.CODE_BLOCK;
  const codeLineType = PLUGIN_KEYS.CODE_LINE;

  const isActive = someNode(editor, {
    match: { type: codeBlockType },
  });

  withoutNormalizing(editor, () => {
    unwrapCodeBlock(editor);

    if (!isActive) {
      setElements(editor, {
        type: codeLineType,
      });

      const codeBlock = {
        children: [],
        type: codeBlockType,
      };

      wrapNodes<TElement>(editor, codeBlock);
    }
  });
};
