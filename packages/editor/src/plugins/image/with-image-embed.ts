import type { ExtendEditor } from "@udecode/plate-common";

import type { ImageConfig } from "./base-image-plugin";
import { insertImage } from "./transforms";
import { isImageUrl } from "./utils/is-image-url";

/** If inserted text is image url, insert image instead. */
export const withImageEmbed: ExtendEditor<ImageConfig> = ({
  editor,
  getOptions,
}) => {
  const { insertData } = editor;

  editor.insertData = (dataTransfer: DataTransfer) => {
    if (getOptions().disableEmbedInsert) {
      return insertData(dataTransfer);
    }

    const text = dataTransfer.getData("text/plain");

    if (isImageUrl(text)) {
      insertImage(editor, text);

      return;
    }

    insertData(dataTransfer);
  };

  return editor;
};
