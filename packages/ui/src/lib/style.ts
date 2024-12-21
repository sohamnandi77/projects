import { tv } from "tailwind-variants";

const focusRing = tv({
  base: "outline-none focus:outline-none forced-colors:outline-1 forced-colors:outline-[Highlight]",
  variants: {
    isFocused: { true: "ring-4 ring-ring/20" },
    isInvalid: { true: "ring-4 ring-danger/20" },
  },
});

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: "border-ring/85" },
    isInvalid: { true: "border-danger" },
  },
});

const focusButtonStyles = tv({
  base: "outline outline-offset-2 outline-ring forced-colors:outline-[Highlight]",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export { focusRing, focusStyles, focusButtonStyles };
