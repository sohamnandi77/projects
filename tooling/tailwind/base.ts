import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          fg: "hsl(var(--primary-fg))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          fg: "hsl(var(--secondary-fg))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          fg: "hsl(var(--tertiary-fg))",
        },
        overlay: {
          DEFAULT: "hsl(var(--overlay))",
          fg: "hsl(var(--overlay-fg))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          fg: "hsl(var(--success-fg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          fg: "hsl(var(--info-fg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          fg: "hsl(var(--warning-fg))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          fg: "hsl(var(--muted-fg))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          fg: "hsl(var(--danger-fg))",
        },
        stroke: {
          DEFAULT: "hsl(var(--stroke-primary))",
          secondary: "hsl(var(--stroke-secondary))",
          tertiary: "hsl(var(--stroke-tertiary))",
          success: "hsl(var(--stroke-success))",
          info: "hsl(var(--stroke-info))",
          muted: "hsl(var(--stroke-muted))",
          danger: "hsl(var(--stroke-danger))",
          warning: "hsl(var(--stroke-warning))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg: "hsl(var(--accent-fg))",
          subtle: "hsl(var(--accent-subtle))",
          "subtle-fg": "hsl(var(--accent-subtle-fg))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        toggle: "hsl(var(--toggle))",
        placeholder: "hsl(var(--placeholder))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-bg))",
          fg: "hsl(var(--sidebar-fg))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-fg": "hsl(var(--sidebar-primary-fg))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-fg": "hsl(var(--sidebar-accent-fg))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          primary: "hsl(var(--chart-primary))",
          secondary: "hsl(var(--chart-secondary))",
          tertiary: "hsl(var(--chart-tertiary))",
          highlight: "hsl(var(--chart-highlight))",
          accent: "hsl(var(--chart-accent))",
        },
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
    },
  },
} satisfies Config;
