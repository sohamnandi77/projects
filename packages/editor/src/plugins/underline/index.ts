import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { BaseUnderlinePlugin } from "./base-underline-plugin";

export const UnderlinePlugin = toPlatePlugin(
  BaseUnderlinePlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleUnderline: {
        keys: [[Key.Mod, "u"]],
        preventDefault: true,
        handler: () => {
          editor.tf.toggle.mark({ key: type });
        },
      },
    },
  }),
);
