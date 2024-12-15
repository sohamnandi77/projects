import type { PluginConfig } from "@udecode/plate-common";
import { bindFirst, createTSlatePlugin } from "@udecode/plate-common";
import { PLUGIN_KEYS } from "#editor/constant";

import type { MediaPluginOptions, TMediaElement } from "../media";
import { insertImageFromFiles } from "./transforms/insert-image-from-files";
import { withImage } from "./with-image";

export interface TImageElement extends TMediaElement {
  initialHeight?: number;
  initialWidth?: number;
}

export type ImageConfig = PluginConfig<
  typeof PLUGIN_KEYS.IMAGE,
  {
    /**
     * An optional method that will upload the image to a server. The method
     * receives the base64 dataUrl of the uploaded image, and should return the
     * URL of the uploaded image.
     */
    uploadImage?: (
      dataUrl: ArrayBuffer | string,
    ) => ArrayBuffer | Promise<ArrayBuffer | string> | string;

    /** Disable url embed on insert data. */
    disableEmbedInsert?: boolean;

    /** Disable file upload on insert data. */
    disableUploadInsert?: boolean;
  } & MediaPluginOptions
>;

/** Enables support for images. */
export const BaseImagePlugin = createTSlatePlugin<ImageConfig>({
  key: PLUGIN_KEYS.IMAGE,
  extendEditor: withImage,
  node: {
    dangerouslyAllowAttributes: ["alt", "width", "height"],
    isElement: true,
    isVoid: true,
  },
})
  .extendEditorTransforms(({ editor }) => ({
    insert: {
      imageFromFiles: bindFirst(insertImageFromFiles, editor),
    },
  }))
  .extend(({ plugin }) => ({
    parsers: {
      html: {
        deserializer: {
          parse: ({ element }) => ({
            type: plugin.node.type,
            url: element.getAttribute("src"),
          }),
          rules: [
            {
              validNodeName: "IMG",
            },
          ],
        },
      },
    },
  }));
