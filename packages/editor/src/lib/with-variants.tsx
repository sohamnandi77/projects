/* eslint-disable @typescript-eslint/no-explicit-any */
import type { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@projects/ui/lib/utils";

/**
 * Set default `className` with `cn` and `variants`.
 *
 * @param Component - The component to which props will be added.
 * @param variants - Variants from `cva`. `Component` props will be extended
 *   with `variants` props.
 * @param onlyVariantsProps - Props to exclude from `Component`. Set the props
 *   that are only used for variants.
 */
export function withVariants<
  T extends React.ComponentType<any> | keyof HTMLElementTagNameMap,
  V extends ReturnType<typeof cva>,
>(Component: T, variants: V, onlyVariantsProps?: (keyof VariantProps<V>)[]) {
  const ComponentWithClassName = Component as React.FC<{ className: string }>;

  return React.forwardRef<
    React.ComponentRef<T>,
    React.ComponentPropsWithoutRef<T> & VariantProps<V>
  >(function ExtendComponent(allProps, ref) {
    const { className, ...props } = allProps;
    const rest = { ...props };

    if (onlyVariantsProps) {
      onlyVariantsProps.forEach((key) => {
        if (props[key as string] !== undefined) {
          delete rest[key as string];
        }
      });
    }

    return (
      <ComponentWithClassName
        ref={ref}
        className={cn(variants(props), className as string)}
        {...rest}
      />
    );
  });
}
