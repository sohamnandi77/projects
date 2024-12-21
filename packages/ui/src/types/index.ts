/**
 * Type representing React components that accept children as props.
 * @typedef {Object} ReactChildrenProps
 * @property {React.ReactNode} children - The child elements/components to be rendered within the component.
 * @readonly - All properties are readonly to prevent modification after initialization.
 */
export type ReactChildrenProps = Readonly<{ children?: React.ReactNode }>;
