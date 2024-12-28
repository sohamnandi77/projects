import type { TagBadgeParameters } from "storybook-addon-tag-badges";
import { addons } from "@storybook/manager-api";
import { defaultConfig } from "storybook-addon-tag-badges";

addons.setConfig({
  tagBadges: [
    {
      tags: "button",
      badge: {
        text: "Button",
        bgColor: "#004d40",
        fgColor: "#ffffff",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "charts",
      badge: {
        text: "Charts",
        bgColor: "#1e3d59",
        fgColor: "#f4b41a",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "collections",
      badge: {
        text: "Collections",
        bgColor: "#3a3d40",
        fgColor: "#ffcc80",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "controls",
      badge: {
        text: "Controls",
        bgColor: "#263238",
        fgColor: "#80cbc4",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "date-and-time",
      badge: {
        text: "Date & Time",
        bgColor: "#37474f",
        fgColor: "#ffab40",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "drag-and-drop",
      badge: {
        text: "Drag & Drop",
        bgColor: "#212121",
        fgColor: "#fdd835",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "forms",
      badge: {
        text: "Forms",
        bgColor: "#4e342e",
        fgColor: "#ffee58",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "layouts",
      badge: {
        text: "Layouts",
        bgColor: "#1b5e20",
        fgColor: "#c8e6c9",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "media",
      badge: {
        text: "Media",
        bgColor: "#01579b",
        fgColor: "#b3e5fc",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "navigation",
      badge: {
        text: "Navigation",
        bgColor: "#1a237e",
        fgColor: "#c5cae9",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "overlays",
      badge: {
        text: "Overlays",
        bgColor: "#4a148c",
        fgColor: "#f8bbd0",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "pickers",
      badge: {
        text: "Pickers",
        bgColor: "#880e4f",
        fgColor: "#f48fb1",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "surfaces",
      badge: {
        text: "Surfaces",
        bgColor: "#33691e",
        fgColor: "#dce775",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "statuses",
      badge: {
        text: "Statuses",
        bgColor: "#3e2723",
        fgColor: "#ffccbc",
      },
      display: {
        sidebar: ["component"],
        toolbar: false,
      },
    },
    {
      tags: "utilities",
      badge: {
        text: "Utilities",

        bgColor: "#283593",
        fgColor: "#ffeb3b",
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
