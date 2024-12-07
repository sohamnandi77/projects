import type { TEditor, TElementEntry } from "@udecode/plate-common";

import { deleteStartSpace } from "./delete-start-space";

export interface OutdentCodeLineOptions {
  codeBlock: TElementEntry;
  codeLine: TElementEntry;
}

/** Outdent the code line. Remove 2 whitespace characters if any. */
export const outdentCodeLine = (
  editor: TEditor,
  { codeBlock, codeLine }: OutdentCodeLineOptions,
) => {
  const deleted = deleteStartSpace(editor, { codeBlock, codeLine });
  if (deleted) {
    deleteStartSpace(editor, { codeBlock, codeLine });
  }
};
