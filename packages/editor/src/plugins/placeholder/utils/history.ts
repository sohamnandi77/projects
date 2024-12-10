/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TElement } from "@udecode/plate-common";
import type { PlateEditor } from "@udecode/plate-common/react";
import type { BaseOperation } from "slate";

import { PLUGIN_KEYS } from "@projects/editor/constant";

const historyMarks = new WeakMap<PlateEditor, boolean>();

export const withHistoryMark = (editor: PlateEditor, fn: () => void) => {
  const prev = isHistoryMarking(editor);
  historyMarks.set(editor, true);
  fn();
  historyMarks.set(editor, prev);
};

export const isHistoryMarking = (editor: PlateEditor): boolean => {
  return historyMarks.get(editor) ?? false;
};

export const updateUploadHistory = (editor: PlateEditor, node: TElement) => {
  const index = editor.history.undos.findLastIndex(
    (batch: any) =>
      batch[PLUGIN_KEYS.PLACEHOLDER] &&
      batch.operations.some(
        (operation: any) =>
          operation.type === "insert_node" &&
          operation.node.id === node.placeholderId,
      ),
  );

  const batch = editor.history.undos[index];

  const newOperations: BaseOperation[] = [];

  if (!batch) return;

  for (const operation of batch.operations) {
    if (
      (operation.type === "insert_node" && (operation.node as any)).id ===
      node.placeholderId
    ) {
      newOperations.push({
        ...operation,
        node: node as any,
      } as BaseOperation);

      continue;
    }

    newOperations.push(operation);
  }

  const newBatch = {
    ...batch,
    operations: newOperations,
  };

  editor.history.undos[index] = newBatch;
};
