import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { BaseBoldPlugin } from "./base-bold-plugin";

export const BoldPlugin = toPlatePlugin(BaseBoldPlugin, ({ editor, type }) => ({
  shortcuts: {
    toggleBold: {
      keys: [[Key.Mod, "b"]],
      preventDefault: true,
      handler: () => {
        editor.tf.toggle.mark({ key: type });
      },
    },
  },
}));
