import type { PluginConfig, TElement } from "@udecode/plate-common";
import { bindFirst, createTSlatePlugin } from "@udecode/plate-common";

import { PLUGIN_KEYS } from "@projects/editor/constant";

import {
  insertAudioPlaceholder,
  insertFilePlaceholder,
  insertImagePlaceholder,
  insertVideoPlaceholder,
} from "./transforms";

export interface TPlaceholderElement extends TElement {
  mediaType: string;
}

export interface PlaceholderRule {
  mediaType: string;
}

export interface MediaPlaceholderOptions {
  rules?: PlaceholderRule[];
}

export type PlaceholderConfig = PluginConfig<
  typeof PLUGIN_KEYS.PLACEHOLDER,
  MediaPlaceholderOptions
>;

export const BasePlaceholderPlugin = createTSlatePlugin<PlaceholderConfig>({
  key: PLUGIN_KEYS.PLACEHOLDER,
  node: { isElement: true, isVoid: true },
}).extendEditorTransforms(({ editor }) => ({
  insert: {
    audioPlaceholder: bindFirst(insertAudioPlaceholder, editor),
    filePlaceholder: bindFirst(insertFilePlaceholder, editor),
    imagePlaceholder: bindFirst(insertImagePlaceholder, editor),
    videoPlaceholder: bindFirst(insertVideoPlaceholder, editor),
  },
}));
