import {
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate-common/react";

import { BasicElementsPlugin } from "@projects/editor/plugins/basic-elements-plugin";
import { BasicMarksPlugin } from "@projects/editor/plugins/basic-marks";

import { PLUGIN_KEYS } from "../constant";
import { withProps } from "../lib/withProps";
import { BlockquoteElement } from "../ui/blockquote-element";
import { CodeBlockElement } from "../ui/code-block-element";
import { CodeLeaf } from "../ui/code-leaf";
import { CodeLineElement } from "../ui/code-line-element";
import { CodeSyntaxLeaf } from "../ui/code-syntax-leaf";
import { HeadingElement } from "../ui/heading-element";
import { ParagraphElement } from "../ui/paragraph-element";

export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: {
        [PLUGIN_KEYS.BLOCKQUOTE]: BlockquoteElement,
        [PLUGIN_KEYS.BOLD]: withProps(PlateLeaf, { as: "strong" }),
        [PLUGIN_KEYS.CODE_BLOCK]: CodeBlockElement,
        [PLUGIN_KEYS.CODE_LEAF]: CodeLeaf,
        [PLUGIN_KEYS.CODE_LINE]: CodeLineElement,
        [PLUGIN_KEYS.CODE_SYNTAX]: CodeSyntaxLeaf,
        [PLUGIN_KEYS.H1]: withProps(HeadingElement, { variant: "h1" }),
        [PLUGIN_KEYS.H2]: withProps(HeadingElement, { variant: "h2" }),
        [PLUGIN_KEYS.H3]: withProps(HeadingElement, { variant: "h3" }),
        [PLUGIN_KEYS.H4]: withProps(HeadingElement, { variant: "h4" }),
        [PLUGIN_KEYS.H5]: withProps(HeadingElement, { variant: "h5" }),
        [PLUGIN_KEYS.H6]: withProps(HeadingElement, { variant: "h6" }),
        [PLUGIN_KEYS.ITALIC]: withProps(PlateLeaf, { as: "em" }),
        [PLUGIN_KEYS.PARAGRAPH]: ParagraphElement,
        [PLUGIN_KEYS.STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
        [PLUGIN_KEYS.SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
        [PLUGIN_KEYS.SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
        [PLUGIN_KEYS.UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
      },
    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value: [
      {
        children: [{ text: "Basic Editor" }],
        type: "h1",
      },
      {
        children: [{ text: "Heading 2" }],
        type: "h2",
      },
      {
        children: [{ text: "Heading 3" }],
        type: "h3",
      },
      {
        children: [{ text: "This is a blockquote element" }],
        type: "blockquote",
      },
      {
        children: [
          { text: "Basic marks: " },
          { bold: true, text: "bold" },
          { text: ", " },
          { italic: true, text: "italic" },
          { text: ", " },
          { text: "underline", underline: true },
          { text: ", " },
          { strikethrough: true, text: "strikethrough" },
          { text: "." },
        ],
        type: ParagraphPlugin.key,
      },
    ],
  });
};
