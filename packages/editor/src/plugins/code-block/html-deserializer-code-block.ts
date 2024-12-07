import type { HtmlDeserializer } from "@udecode/plate-common";

import { CODE_PLUGIN_KEYS } from "./constants";

export const htmlDeserializerCodeBlock: HtmlDeserializer = {
  parse: ({ element }) => {
    const languageSelectorText =
      [...element.childNodes].find(
        (node: ChildNode) => node.nodeName === "SELECT",
      )?.textContent ?? "";

    const textContent =
      element.textContent?.replace(languageSelectorText, "") ?? "";

    let lines = textContent.split("\n");

    if (!lines.length) {
      lines = [textContent];
    }

    const codeLines = lines.map((line) => ({
      children: [{ text: line }],
      type: CODE_PLUGIN_KEYS.CODE_LINE,
    }));

    return {
      children: codeLines,
      type: CODE_PLUGIN_KEYS.CODE_BLOCK,
    };
  },
  rules: [
    {
      validNodeName: "PRE",
    },
    {
      validNodeName: "P",
      validStyle: {
        fontFamily: "Consolas",
      },
    },
  ],
};
