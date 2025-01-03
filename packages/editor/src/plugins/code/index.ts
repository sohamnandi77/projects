import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { BaseCodePlugin } from "./base-code-plugin";

export const CodePlugin = toPlatePlugin(BaseCodePlugin, ({ editor, type }) => ({
  shortcuts: {
    toggleCode: {
      keys: [[Key.Mod, "e"]],
      preventDefault: true,
      handler: () => {
        editor.tf.toggle.mark({ key: type });
      },
    },
  },
}));
