import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import twrac from "tailwindcss-react-aria-components";

import base from "./base";
import { twFieldSizingPlugin } from "./plugins/tailwindcss-field-sizing";

export default {
  darkMode: ["class"],
  content: base.content,
  presets: [base],
  plugins: [twrac, animate, twFieldSizingPlugin],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        "3xl": "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "calc(var(--radius))",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "36",
          },
        },
        "accordion-up": {
          from: {
            height: "36",
          },
          to: {
            height: "0",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
} satisfies Config;
