import type {
  ElementOf,
  SlateEditor,
  TElement,
  TNodeEntry,
} from "@udecode/plate-common";
import type { Location } from "slate";
import {
  getAboveNode,
  getParentNode,
  isElement,
  someNode,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

/** If at (default = selection) is in ul>li>p, return li and ul node entries. */
export const getCodeLineEntry = <N extends ElementOf<E>, E extends SlateEditor>(
  editor: E,
  { at = editor.selection }: { at?: Location | null } = {},
) => {
  if (
    at &&
    someNode(editor, {
      at,
      match: { type: PLUGIN_KEYS.CODE_BLOCK },
    })
  ) {
    const selectionParent = getParentNode(editor, at);

    if (!selectionParent) return;

    const [, parentPath] = selectionParent;

    const codeLine =
      getAboveNode<TElement>(editor, {
        at,
        match: { type: PLUGIN_KEYS.CODE_BLOCK },
      }) ?? getParentNode<N>(editor, parentPath);

    if (!codeLine) return;

    const [codeLineNode, codeLinePath] = codeLine;

    if (isElement(codeLineNode) && codeLineNode.type !== PLUGIN_KEYS.CODE_BLOCK)
      return;

    const codeBlock = getParentNode<N>(editor, codeLinePath);

    if (!codeBlock) return;

    return {
      codeBlock,
      codeLine: codeLine as TNodeEntry<N>,
    };
  }

  return undefined;
};
