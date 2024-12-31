import type { PluginsConfig } from "tailwindcss/types/config";

export const twFieldSizingPlugin: PluginsConfig[0] = {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  handler: function ({ addUtilities }) {
    addUtilities({
      ".field-sizing-content": {
        "field-sizing": "content",
      },
      ".field-sizing-revert": {
        "field-sizing": "revert",
      },
    });
  },
};
