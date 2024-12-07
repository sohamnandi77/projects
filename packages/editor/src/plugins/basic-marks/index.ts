import { toPlatePlugin } from "@udecode/plate-common/react";

import { BoldPlugin } from "../base-bold";
import { CodePlugin } from "../code";
import { ItalicPlugin } from "../italic";
import { StrikethroughPlugin } from "../strike-through";
import { SubscriptPlugin } from "../subscript";
import { SuperscriptPlugin } from "../superscript";
import { UnderlinePlugin } from "../underline";
import { BaseBasicMarksPlugin } from "./base-basic-marks-plugin";

/**
 * Enables support for basic marks:
 *
 * - Bold
 * - Code
 * - Italic
 * - Strikethrough
 * - Subscript
 * - Superscript
 * - Underline
 */
export const BasicMarksPlugin = toPlatePlugin(BaseBasicMarksPlugin, {
  plugins: [
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
  ],
});
