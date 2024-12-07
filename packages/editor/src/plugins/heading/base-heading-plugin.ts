import type { PluginConfig, SlatePlugin } from "@udecode/plate-common";
import { createSlatePlugin, createTSlatePlugin } from "@udecode/plate-common";

export const HEADING_KEYS = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

export const HEADING_LEVELS = [
  HEADING_KEYS.h1,
  HEADING_KEYS.h2,
  HEADING_KEYS.h3,
  HEADING_KEYS.h4,
  HEADING_KEYS.h5,
  HEADING_KEYS.h6,
];

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingConfig = PluginConfig<
  "heading",
  {
    /** Heading levels supported from 1 to `levels` */
    levels?: HeadingLevel | HeadingLevel[];
  }
>;

/** Enables support for headings with configurable levels (from 1 to 6). */
export const BaseHeadingPlugin = createTSlatePlugin<HeadingConfig>({
  key: "heading",
  options: {
    levels: [1, 2, 3, 4, 5, 6],
  },
}).extend(({ plugin }) => {
  const {
    options: { levels },
  } = plugin;

  const plugins: SlatePlugin[] = [];

  const headingLevels = Array.isArray(levels)
    ? levels
    : Array.from({ length: levels ?? 6 }, (_, i) => i + 1);

  headingLevels.forEach((level) => {
    const plugin: SlatePlugin = createSlatePlugin({
      key: HEADING_LEVELS[level - 1],
      node: { isElement: true },
      parsers: {
        html: {
          deserializer: {
            rules: [
              {
                validNodeName: `H${level}`,
              },
            ],
          },
        },
      },
    });

    plugins.push(plugin);
  });

  return {
    plugins,
  };
});
