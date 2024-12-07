import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { BaseItalicPlugin } from "./base-italic-plugin";

export const ItalicPlugin = toPlatePlugin(
  BaseItalicPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleItalic: {
        keys: [[Key.Mod, "i"]],
        preventDefault: true,
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
      },
    },
  }),
);
