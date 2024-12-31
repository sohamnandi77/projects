import type { TagBadgeParameters } from "storybook-addon-tag-badges";
import { addons } from "@storybook/manager-api";
import { defaultConfig } from "storybook-addon-tag-badges";

addons.setConfig({
  tagBadges: [
    {
      tags: "button",
      badge: {
        text: "Button",
        bgColor: "#5300E8",
        fgColor: "#EFE5FD",
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
        bgColor: "#B800E5",
        fgColor: "#F6E3FB",
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
        bgColor: "#DC036C",
        fgColor: "#FCE4EE",
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
        bgColor: "#C62828",
        fgColor: "#FFEBEE",
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
        bgColor: "#D84315",
        fgColor: "#FBE9E7",
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
        bgColor: "#F57F17",
        fgColor: "#FFFDE7",
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
        bgColor: "#2E7D32",
        fgColor: "#E8F5E9",
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
        bgColor: "#009799",
        fgColor: "#D7FBFA",
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
        bgColor: "#283593",
        fgColor: "#E8EAF6",
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
        bgColor: "#6B4F06",
        fgColor: "#F9F4E2",
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
        bgColor: "#4E342E",
        fgColor: "#EFEBE9",
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
        bgColor: "#1565C0",
        fgColor: "#E3F2FD",
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
        bgColor: "#3F3783",
        fgColor: "#EAEAF4",
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
        bgColor: "#32586F",
        fgColor: "#DFF0FF",
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

        bgColor: "#611F27",
        fgColor: "#FFDFD4",
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
