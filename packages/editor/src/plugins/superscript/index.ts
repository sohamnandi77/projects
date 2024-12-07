import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { SubscriptPlugin } from "../subscript";
import { BaseSuperscriptPlugin } from "./base-superscript-plugin";

export const SuperscriptPlugin = toPlatePlugin(
  BaseSuperscriptPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleSuperscript: {
        keys: [[Key.Mod, "."]],
        preventDefault: true,
        handler: () => {
          editor.tf.toggle.mark({
            key: type,
            clear: editor.getType(SubscriptPlugin),
          });
        },
      },
    },
  }),
);
