import {
  createPlatePlugin,
  ParagraphPlugin,
} from "@udecode/plate-common/react";

import { BlockquotePlugin } from "./blockquote";
import { CodeBlockPlugin } from "./code-block";
import { HeadingPlugin } from "./heading";

/**
 * Enables support for basic elements:
 *
 * - Block quote
 * - Code block
 * - Heading
 * - Paragraph
 */
export const BasicElementsPlugin = createPlatePlugin({
  key: "basicElements",
  plugins: [BlockquotePlugin, CodeBlockPlugin, HeadingPlugin, ParagraphPlugin],
});
