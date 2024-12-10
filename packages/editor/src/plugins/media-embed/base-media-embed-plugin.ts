import type { PluginConfig } from "@udecode/plate-common";
import { createTSlatePlugin } from "@udecode/plate-common";

import { PLUGIN_KEYS } from "@projects/editor/constant";

import type { MediaPluginOptions, TMediaElement } from "../media/types";
import { parseIframeUrl } from "./parse-iframe-url";

export type TMediaEmbedElement = TMediaElement;

export type MediaEmbedConfig = PluginConfig<
  typeof PLUGIN_KEYS.MEDIA_EMBED,
  MediaPluginOptions
>;

/**
 * Enables support for embeddable media such as YouTube or Vimeo videos,
 * Instagram posts and tweets or Google Maps.
 */
export const BaseMediaEmbedPlugin = createTSlatePlugin<MediaEmbedConfig>({
  key: PLUGIN_KEYS.MEDIA_EMBED,
  node: { isElement: true, isVoid: true },
  options: {
    transformUrl: parseIframeUrl,
  },
}).extend(({ type }) => ({
  parsers: {
    html: {
      deserializer: {
        parse: ({ element }) => {
          const url = element.getAttribute("src");

          if (url) {
            return {
              type,
              url,
            };
          }
          return {};
        },
        rules: [
          {
            validNodeName: "IFRAME",
          },
        ],
      },
    },
  },
}));
