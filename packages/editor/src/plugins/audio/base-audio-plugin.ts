import { createSlatePlugin } from "@udecode/plate-common";

import type { TMediaElement } from "../media";

export type TAudioElement = TMediaElement;

export const BaseAudioPlugin = createSlatePlugin({
  key: "audio",
  node: { isElement: true, isVoid: true },
});
