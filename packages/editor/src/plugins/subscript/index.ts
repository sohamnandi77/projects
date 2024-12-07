import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import { SuperscriptPlugin } from "../superscript";
import { BaseSubscriptPlugin } from "./base-subscript-plugin";

export const SubscriptPlugin = toPlatePlugin(
  BaseSubscriptPlugin,
  ({ editor, type }) => ({
    shortcuts: {
      toggleSubscript: {
        keys: [[Key.Mod, ","]],
        preventDefault: true,
        handler: () => {
          editor.tf.toggle.mark({
            key: type,
            clear: editor.getType(SuperscriptPlugin),
          });
        },
      },
    },
  }),
);
