import type { SlateEditor, TDescendant, TElement } from "@udecode/plate-common";
import { getBlockAbove, getNodeString } from "@udecode/plate-common";

import { PLUGIN_KEYS } from "@projects/editor/constant";

function extractCodeLinesFromCodeBlock(node: TElement) {
  return node.children as TElement[];
}

export const insertFragmentCodeBlock = (editor: SlateEditor) => {
  const { insertFragment } = editor;
  const codeBlockType = PLUGIN_KEYS.CODE_BLOCK;
  const codeLineType = PLUGIN_KEYS.CODE_LINE;

  function convertNodeToCodeLine(node: TElement): TElement {
    return {
      children: [{ text: getNodeString(node) }],
      type: codeLineType,
    };
  }

  return (fragment: TDescendant[]) => {
    const [blockAbove] = getBlockAbove<TElement>(editor) ?? [];

    if (
      blockAbove &&
      [codeBlockType, codeLineType].includes(
        blockAbove.type as
          | typeof PLUGIN_KEYS.CODE_BLOCK
          | typeof PLUGIN_KEYS.CODE_LINE,
      )
    ) {
      return insertFragment(
        fragment.flatMap((node) => {
          const element = node as TElement;

          return element.type === codeBlockType
            ? extractCodeLinesFromCodeBlock(element)
            : convertNodeToCodeLine(element);
        }),
      );
    }

    return insertFragment(fragment);
  };
};
