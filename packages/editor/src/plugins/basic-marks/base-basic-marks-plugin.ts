import { createSlatePlugin } from "@udecode/plate-common";

import { BaseBoldPlugin } from "../base-bold/base-bold-plugin";
import { BaseCodePlugin } from "../code/base-code-plugin";
import { BaseItalicPlugin } from "../italic/base-italic-plugin";
import { BaseStrikethroughPlugin } from "../strike-through/base-strike-through-plugin";
import { BaseSubscriptPlugin } from "../subscript/base-subscript-plugin";
import { BaseSuperscriptPlugin } from "../superscript/base-superscript-plugin";
import { BaseUnderlinePlugin } from "../underline/base-underline-plugin";

export const BaseBasicMarksPlugin = createSlatePlugin({
  key: "basicMarks",
  plugins: [
    BaseBoldPlugin,
    BaseCodePlugin,
    BaseItalicPlugin,
    BaseStrikethroughPlugin,
    BaseSubscriptPlugin,
    BaseSuperscriptPlugin,
    BaseUnderlinePlugin,
  ],
});
