import type { PlateEditor, PlatePlugin } from "@udecode/plate-common/react";
import { Key, toPlatePlugin } from "@udecode/plate-common/react";

import type { HeadingConfig } from "./base-heading-plugin";
import { BaseHeadingPlugin } from "./base-heading-plugin";

interface ExtendParams {
  editor: PlateEditor;
  type: string;
}

export const HeadingPlugin = toPlatePlugin(BaseHeadingPlugin, ({ plugin }) => ({
  plugins: (plugin as PlatePlugin<HeadingConfig>).plugins.map((p) =>
    (p as PlatePlugin<HeadingConfig>).extend(
      ({ editor, type }: ExtendParams) => {
        const keyStr = (p as PlatePlugin<HeadingConfig>).key.toString();
        const level = parseInt(keyStr.charAt(keyStr.length - 1));

        if (level > 3) return {};

        return {
          shortcuts: {
            ["toggleHeading" + level]: {
              keys: [
                [Key.Mod, Key.Alt, `${level}`],
                [Key.Mod, Key.Shift, `${level}`],
              ],
              preventDefault: true,
              handler: () => {
                editor.tf.toggle.block({ type });
              },
            },
          },
        };
      },
    ),
  ),
}));
