import type { SlateEditor } from "@udecode/plate-common";
import { getChildren, getNodeString } from "@udecode/plate-common";

import { getCodeLineEntry } from "./get-code-line-entry";

/** Is the selection inside an empty code block */
export const isCodeBlockEmpty = (editor: SlateEditor) => {
  const { codeBlock } = getCodeLineEntry(editor) ?? {};

  if (!codeBlock) return false;

  const codeLines = Array.from(getChildren(codeBlock));

  if (codeLines.length === 0) return true;
  if (codeLines.length > 1) return false;

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
  const firstCodeLineNode = codeLines[0]?.[0]!;

  return !getNodeString(firstCodeLineNode);
};
