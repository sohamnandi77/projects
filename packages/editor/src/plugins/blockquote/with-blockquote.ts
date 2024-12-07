import type { ExtendEditor, TElement } from "@udecode/plate-common";

export const withBlockquote: ExtendEditor = ({ editor }) => {
  const { shouldMergeNodesRemovePrevNode } = editor;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (shouldMergeNodesRemovePrevNode) {
    editor.shouldMergeNodesRemovePrevNode = (prevNodeEntry, curNodeEntry) => {
      const prevNode = prevNodeEntry[0] as TElement;

      if (prevNode.type === "blockquote") return false;

      return shouldMergeNodesRemovePrevNode(prevNodeEntry, curNodeEntry);
    };
  }

  return editor;
};
