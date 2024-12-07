import type { TEditor } from "@udecode/plate-common";
import {
  deleteText,
  getEditorString,
  getPointAfter,
  getRange,
  getStartPoint,
} from "@udecode/plate-common";

import type { OutdentCodeLineOptions } from "./outdent-code-line";

/** If there is a whitespace character at the start of the code line, delete it. */
export const deleteStartSpace = (
  editor: TEditor,
  { codeLine }: OutdentCodeLineOptions,
) => {
  const [, codeLinePath] = codeLine;
  const codeLineStart = getStartPoint(editor, codeLinePath);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const codeLineEnd = codeLineStart && getPointAfter(editor, codeLineStart);
  const spaceRange =
    codeLineEnd && getRange(editor, codeLineStart, codeLineEnd);
  const spaceText = getEditorString(editor, spaceRange);

  if (/\s/.test(spaceText)) {
    deleteText(editor, { at: spaceRange });

    return true;
  }

  return false;
};
