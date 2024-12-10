import { toPlatePlugin } from "@udecode/plate-common/react";

import { BaseKbdPlugin } from "./base-kbd-plugin";

/** Enables support for code formatting with React-specific features */
export const KbdPlugin = toPlatePlugin(BaseKbdPlugin);
