import type { TagBadgeParameters } from "storybook-addon-tag-badges";
import { addons } from "@storybook/manager-api";
import { defaultConfig } from "storybook-addon-tag-badges";

addons.setConfig({
  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: "input",
      badge: {
        text: "input",
        bgColor: "#001c13",
        fgColor: "#e0eb0b",
        tooltip: "This component can catch flies!",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    // Place the default config after your custom matchers.
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
