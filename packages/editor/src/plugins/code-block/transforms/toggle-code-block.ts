import type { SlateEditor, TElement } from "@udecode/plate-common";
import {
  setElements,
  someNode,
  withoutNormalizing,
  wrapNodes,
} from "@udecode/plate-common";

import { CODE_PLUGIN_KEYS } from "../constants";
import { unwrapCodeBlock } from "./unwrap-code-block";

export const toggleCodeBlock = (editor: SlateEditor) => {
  if (!editor.selection) return;

  const codeBlockType = CODE_PLUGIN_KEYS.CODE_BLOCK;
  const codeLineType = CODE_PLUGIN_KEYS.CODE_LINE;

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
