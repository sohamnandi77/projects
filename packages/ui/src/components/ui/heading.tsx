import type { HeadingProps as AriaHeadingProps } from "react-aria-components";
import type { VariantProps } from "tailwind-variants";
import { Heading as AriaHeading } from "react-aria-components";
import { tv } from "tailwind-variants";

const headingStyles = tv({
  base: "font-sans tracking-tight text-fg",
  variants: {
    level: {
      1: "text-xl font-bold sm:text-2xl",
      2: "text-lg font-semibold sm:text-xl",
      3: "text-base font-semibold sm:text-lg",
      4: "text-base font-semibold",
      5: "text-base",
      6: "text-sm",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-widest",
    },
  },
});

type HeadingProps = AriaHeadingProps & VariantProps<typeof headingStyles>;

const Heading = (props: HeadingProps) => {
  const { className, tracking, level = 3, ...rest } = props;
  return (
    <AriaHeading
      className={headingStyles({
        level,
        tracking,
        className,
      })}
      {...rest}
    />
  );
};

export { Heading };
