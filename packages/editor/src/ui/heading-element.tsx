/* eslint-disable tailwindcss/no-custom-classname */
import { cva } from "class-variance-authority";

import { withRef } from "@projects/editor/lib/withRef";
import { withVariants } from "@projects/editor/lib/withVariants";
import { PlateElement } from "@projects/editor/ui/plate-element";

const headingVariants = cva("relative mb-1", {
  variants: {
    variant: {
      h1: "font-heading mt-[1.6em] pb-1 text-4xl font-bold",
      h2: "font-heading mt-[1.4em] pb-px text-2xl font-semibold tracking-tight",
      h3: "font-heading mt-[1em] pb-px text-xl font-semibold tracking-tight",
      h4: "font-heading mt-[0.75em] text-lg font-semibold tracking-tight",
      h5: "mt-[0.75em] text-lg font-semibold tracking-tight",
      h6: "mt-[0.75em] text-base font-semibold tracking-tight",
    },
  },
});

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  "variant",
]);

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ children, variant = "h1", ...props }, ref) => {
    return (
      <HeadingElementVariants
        ref={ref}
        as={variant ?? "h1"}
        variant={variant}
        {...props}
      >
        {children}
      </HeadingElementVariants>
    );
  },
);
