import type {
  InsertNodesOptions,
  SlateEditor,
  TEditor,
} from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

import { BaseImagePlugin } from "../image/base-image-plugin";
import { insertImage } from "../image/transforms";
import { insertMediaEmbed } from "../media-embed/transforms";

export interface InsertMediaOptions<E extends TEditor = TEditor>
  extends InsertNodesOptions<E> {
  /**
   * Default onClick is getting the image url by calling this promise before
   * inserting the image.
   */
  getUrl?: () => Promise<string>;

  type?: string;
}

export const insertMedia = async <E extends SlateEditor>(
  editor: E,
  {
    getUrl,
    type = editor.getType(BaseImagePlugin),
    ...options
  }: InsertMediaOptions<E> = {},
) => {
  const url = getUrl
    ? await getUrl()
    : window.prompt(
        `Enter the URL of the ${
          type === PLUGIN_KEYS.IMAGE
            ? PLUGIN_KEYS.IMAGE
            : PLUGIN_KEYS.MEDIA_EMBED
        }`,
      );

  if (!url) return;
  if (type === editor.getType(BaseImagePlugin)) {
    insertImage(editor, url, options);
  } else {
    insertMediaEmbed(editor, { url }, options);
  }
};
