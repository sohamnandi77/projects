import type { LinkProps as LinkPrimitiveProps } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import {
  composeRenderProps,
  Link as LinkPrimitive,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const linkStyles = tv({
  base: [
    "relative outline-0 outline-offset-2 outline-primary transition-colors",
    /* Forced colors */
    "forced-colors:outline-[Highlight] forced-colors:disabled:text-[GrayText]",
  ],
  variants: {
    variant: {
      primary:
        "text-primary hover:text-primary/80 forced-colors:disabled:text-[GrayText]",
      secondary: "text-secondary-fg hover:text-secondary-fg/80",
      unstyled: "text-current",
      danger:
        "text-danger hover:text-danger/80 forced-colors:disabled:text-[GrayText]",
      "primary-hover":
        "text-fg hover:text-primary dark:hover:text-primary/80 forced-colors:disabled:text-[GrayText]",
    },
    isFocused: { true: "outline-none" },
    isFocusVisible: { true: "outline-2" },
    isDisabled: {
      true: "cursor-not-allowed opacity-60 focus-visible:outline-0",
    },
  },
  defaultVariants: {
    variant: "unstyled",
  },
});

type LinkProps = LinkPrimitiveProps & VariantProps<typeof linkStyles>;

const Link = (props: LinkProps) => {
  const { className, variant, ...rest } = props;
  return (
    <LinkPrimitive
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, variant, className }),
      )}
    />
  );
};

export { Link, LinkPrimitive, type LinkPrimitiveProps, type LinkProps };
