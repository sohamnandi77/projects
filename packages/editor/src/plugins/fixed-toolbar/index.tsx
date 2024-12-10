import { createPlatePlugin } from "@udecode/plate-common/react";

import { PLUGIN_KEYS } from "@projects/editor/constant";
import { FixedToolbar } from "@projects/editor/ui/fixed-toolbar/fixed-toolbar";
import { FixedToolbarButtons } from "@projects/editor/ui/fixed-toolbar/fixed-toolbar-buttons";

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
