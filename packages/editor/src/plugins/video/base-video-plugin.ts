import { createSlatePlugin } from "@udecode/plate-common";

import type { TMediaElement } from "../media";

export type TVideoElement = TMediaElement;

export const BaseVideoPlugin = createSlatePlugin({
  key: "video",
  node: {
    dangerouslyAllowAttributes: ["width", "height"],
    isElement: true,
    isVoid: true,
  },
});
