import type { SlateEditor, TElement, TNodeEntry } from "@udecode/plate-common";
import { getChildren, isElement, setNodes } from "@udecode/plate-common";

import { PLUGIN_KEYS } from "@projects/editor/constant";

/** Normalize code block node to force the pre>code>div.codeline structure. */
export const normalizeCodeBlock = (editor: SlateEditor) => {
  const codeBlockType = PLUGIN_KEYS.CODE_BLOCK;
  const codeLineType = PLUGIN_KEYS.CODE_LINE;

  const { normalizeNode } = editor;

  return ([node, path]: TNodeEntry) => {
    normalizeNode([node, path]);

    if (!isElement(node)) {
      return;
    }

    const isCodeBlockRoot = node.type === codeBlockType;

    if (isCodeBlockRoot) {
      // Children should all be code lines
      const nonCodeLine = getChildren([node, path]).find(
        ([child]) => child.type !== codeLineType,
      );

      if (nonCodeLine) {
        setNodes<TElement>(
          editor,
          { type: codeLineType },
          { at: nonCodeLine[1] },
        );
      }
    }
  };
};
