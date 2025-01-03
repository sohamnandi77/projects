import type { TElement } from "@udecode/plate-common";
import type { KeyboardHandler } from "@udecode/plate-common/react";
import {
  getNodeEntries,
  getParentNode,
  isHotkey,
  isSelectionAtBlockEnd,
  isSelectionAtBlockStart,
  select,
  withoutNormalizing,
} from "@udecode/plate-common";
import { Hotkeys } from "@udecode/plate-common/react";
import { PLUGIN_KEYS } from "#editor/constant";

import { getCodeLineEntry } from "./queries";
import { indentCodeLine, outdentCodeLine } from "./transforms";

/**
 * - Shift+Tab: outdent code line.
 * - Tab: indent code line.
 */
export const onKeyDownCodeBlock: KeyboardHandler = ({ editor, event }) => {
  if (event.defaultPrevented) return;

  const isTab = Hotkeys.isTab(editor, event);
  const isUntab = Hotkeys.isUntab(editor, event);

  if (isTab || isUntab) {
    const _codeLines = getNodeEntries<TElement>(editor, {
      match: { type: PLUGIN_KEYS.CODE_LINE },
    });
    const codeLines = Array.from(_codeLines);

    if (codeLines.length > 0) {
      event.preventDefault();
      const firstLineEntry = codeLines[0];

      if (!firstLineEntry) return;

      const [, firstLinePath] = firstLineEntry;

      const codeBlock = getParentNode<TElement>(editor, firstLinePath);

      if (!codeBlock) return;

      withoutNormalizing(editor, () => {
        for (const codeLine of codeLines) {
          if (isUntab) {
            outdentCodeLine(editor, { codeBlock, codeLine });
          }
          // indent with tab
          if (isTab) {
            indentCodeLine(editor, { codeBlock, codeLine });
          }
        }
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (isHotkey("mod+a", event)) {
    const res = getCodeLineEntry(editor, {});

    if (!res) return;

    const { codeBlock } = res;

    // Check if codeBlock is valid before destructuring
    if (!Array.isArray(codeBlock)) return;

    const [, codeBlockPath] = codeBlock;

    if (isSelectionAtBlockEnd(editor) && isSelectionAtBlockStart(editor))
      return;

    // select the whole code block
    select(editor, codeBlockPath);

    event.preventDefault();
    event.stopPropagation();
  }

  // Note: rather than handling mod+enter/mod+shift+enter here, we recommend
  // using the exit-break plugin/ If not using exit-break, follow similar logic
  // to exit-break to add behavior to exit the code-block
};
