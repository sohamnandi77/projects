import type { PluginConfig } from "@udecode/plate-common";
import {
  createSlatePlugin,
  createTSlatePlugin,
  HtmlPlugin,
  someNode,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

import type { Prism } from "./types";
import { decorateCodeLine } from "./decorate-code-line";
import { htmlDeserializerCodeBlock } from "./html-deserializer-code-block";
import { withCodeBlock } from "./with-code-block";

export type CodeBlockConfig = PluginConfig<
  typeof PLUGIN_KEYS.CODE_BLOCK,
  {
    deserializers?: string[];
    prism?: Prism;
    syntax?: boolean;
    syntaxPopularFirst?: boolean;
  }
>;

export const BaseCodeLinePlugin = createSlatePlugin({
  key: PLUGIN_KEYS.CODE_LINE,
  decorate: decorateCodeLine,
  node: { isElement: true },
});

export const BaseCodeSyntaxPlugin = createSlatePlugin({
  key: PLUGIN_KEYS.CODE_SYNTAX,
  node: { isLeaf: true },
});

export const BaseCodeBlockPlugin = createTSlatePlugin<CodeBlockConfig>({
  key: PLUGIN_KEYS.CODE_BLOCK,
  extendEditor: withCodeBlock,
  inject: {
    plugins: {
      [HtmlPlugin.key]: {
        parser: {
          query: ({ editor }) => {
            const codeLineType = editor.getType(BaseCodeLinePlugin);

            return !someNode(editor, {
              match: { type: codeLineType },
            });
          },
        },
      },
    },
  },
  node: { isElement: true },
  options: {
    syntax: true,
    syntaxPopularFirst: false,
  },
  parsers: { html: { deserializer: htmlDeserializerCodeBlock } },
  plugins: [BaseCodeLinePlugin, BaseCodeSyntaxPlugin],
});
