import type { ExtendEditor } from "@udecode/plate-common";

import type { ImageConfig } from "./base-image-plugin";
import { withImageEmbed } from "./with-image-embed";
import { withImageUpload } from "./with-image-upload";

/**
 * @see withImageUpload
 * @see withImageEmbed
 */
export const withImage: ExtendEditor<ImageConfig> = ({ editor, ...ctx }) => {
  editor = withImageUpload({ editor, ...ctx });
  editor = withImageEmbed({ editor, ...ctx });

  return editor;
};
