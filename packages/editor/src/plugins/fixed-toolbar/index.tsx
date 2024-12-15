import { createPlatePlugin } from "@udecode/plate-common/react";
import { PLUGIN_KEYS } from "#editor/constant";
import { FixedToolbar } from "#editor/ui/fixed-toolbar/fixed-toolbar";
import { FixedToolbarButtons } from "#editor/ui/fixed-toolbar/fixed-toolbar-buttons";

export const FixedToolbarPlugin = createPlatePlugin({
  key: PLUGIN_KEYS.FIXED_TOOLBAR,
  render: {
    beforeEditable: () => (
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
    ),
  },
});
