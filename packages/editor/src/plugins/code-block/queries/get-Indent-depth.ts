import type { TEditor } from "@udecode/plate-common";
import { getEditorString } from "@udecode/plate-common";

import type { IndentCodeLineOptions } from "../transforms/indent-code-line";

export const getIndentDepth = (
  editor: TEditor,
  { codeLine }: IndentCodeLineOptions,
) => {
  const [, codeLinePath] = codeLine;
  const text = getEditorString(editor, codeLinePath);

  return text.search(/\S|$/);
};
