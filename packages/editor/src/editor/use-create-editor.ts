import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from "@udecode/plate-common/react";

import { withProps } from "@projects/editor/lib/withProps";
import { BasicElementsPlugin } from "@projects/editor/plugins/basic-elements-plugin";
import { BasicMarksPlugin } from "@projects/editor/plugins/basic-marks";
import { ItalicPlugin } from "@projects/editor/plugins/italic";
import { StrikethroughPlugin } from "@projects/editor/plugins/strike-through";
import { UnderlinePlugin } from "@projects/editor/plugins/underline";
import { cn } from "@projects/ui/lib/utils";

import { BoldPlugin } from "../plugins/base-bold";
import { BlockquotePlugin } from "../plugins/blockquote";

export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
        [ParagraphPlugin.key]: withProps(PlateElement, {
          as: "p",
          className: "mb-4",
        }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
        [BlockquotePlugin.key]: withProps(PlateElement, {
          as: "blockquote",
          className: cn("border-l-3 mb-4 border-[#d0d7de] pl-4 text-[#636c76]"),
        }),
        h1: withProps(PlateElement, {
          as: "h1",
          className:
            "mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl",
        }),
        h2: withProps(PlateElement, {
          as: "h2",
          className: "mb-4 mt-6 text-2xl font-semibold tracking-tight",
        }),
        h3: withProps(PlateElement, {
          as: "h3",
          className: "mb-4 mt-6 text-xl font-semibold tracking-tight",
        }),
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
