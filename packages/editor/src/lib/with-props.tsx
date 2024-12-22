import React from "react";

import { cn } from "@projects/ui/lib/utils";

/**
 * A type-safe Higher-Order Component for adding default props and combining classNames
 *
 * @template T The type of the component or HTML element
 * @param Component The component or HTML element to wrap
 * @param defaultProps Default props to be applied
 * @returns A new component with default props and combined classNames
 */
export function withProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.ComponentType<any> | keyof HTMLElementTagNameMap,
>(Component: T, defaultProps: Partial<React.ComponentPropsWithoutRef<T>>) {
  const ComponentWithClassName = Component as React.FC<{ className: string }>;

  return React.forwardRef<
    React.ComponentRef<T>,
    React.ComponentPropsWithoutRef<T>
  >(function ExtendComponent(props, ref) {
    return (
      <ComponentWithClassName
        ref={ref}
        {...defaultProps}
        {...props}
        className={cn(
          defaultProps.className,
          (props as { className: string }).className,
        )}
      />
    );
  });
}
