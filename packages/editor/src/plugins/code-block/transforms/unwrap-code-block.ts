import type { SlateEditor } from "@udecode/plate-common";
import type { Location } from "slate";
import {
  BaseParagraphPlugin,
  getChildren,
  getNodeEntries,
  setElements,
  unwrapNodes,
  withoutNormalizing,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

export const unwrapCodeBlock = (editor: SlateEditor) => {
  if (!editor.selection) return;

  const codeBlockType = PLUGIN_KEYS.CODE_BLOCK;
  const defaultType = editor.getType(BaseParagraphPlugin);

  withoutNormalizing(editor, () => {
    const codeBlockEntries = getNodeEntries(editor, {
      at: editor.selection as Location,
      match: { type: codeBlockType },
    });

    const reversedCodeBlockEntries = Array.from(codeBlockEntries).reverse();

    for (const codeBlockEntry of reversedCodeBlockEntries) {
      const codeLineEntries = getChildren(codeBlockEntry);

      for (const [, path] of codeLineEntries) {
        setElements(editor, { type: defaultType }, { at: path });
      }

      unwrapNodes(editor, {
        at: codeBlockEntry[1],
        match: { type: codeBlockType },
        split: true,
      });
    }
  });
};
