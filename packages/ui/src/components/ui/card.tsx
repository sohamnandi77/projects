import type { HeadingProps } from "react-aria-components";
import { Heading } from "react-aria-components";

import { cn } from "@projects/ui/lib/utils";

/**
 * A generic Card component that serves as a container with consistent styling.
 *
 * @param {CardProps} props - Props for the Card component.
 * @returns {JSX.Element} The Card component.
 * @example
 * ```tsx
 * <Card>
 *  <CardHeader>
 *   <CardTitle>Card Title</CardTitle>
 *  <CardDescription>Card Description</CardDescription>
 * </CardHeader>
 * <CardContent>Card Content</CardContent>
 * <CardFooter>Card Footer</CardFooter>
 * </Card>
 * ```
 */
const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      slot="card"
      className={cn("rounded-xl border bg-bg text-fg shadow-sm", className)}
      {...rest}
    />
  );
};
Card.displayName = "Card";

/**
 * A header component for the Card, typically used to display a title or heading.
 *
 * @param {CardHeaderProps} props - Props for the CardHeader component.
 * @returns {JSX.Element} The CardHeader component.
 * @example
 * ```tsx
 * <CardHeader>
 * <CardTitle>Card Title</CardTitle>
 * <CardDescription>Card Description</CardDescription>
 * </CardHeader>
 * ```
 */
const CardHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...rest}
    />
  );
};
CardHeader.displayName = "CardHeader";

/**
 * A title component for the CardHeader, used to display the main heading.
 *
 * @param {CardTitleProps} props - Props for the CardTitle component.
 * @returns {JSX.Element} The CardTitle component.
 * @example
 * ```tsx
 * <CardTitle>Card Title</CardTitle>
 * ```
 */
const CardTitle = (props: HeadingProps) => {
  const { className, ...rest } = props;
  return (
    <Heading
      slot="card-title"
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight sm:leading-6",
        className,
      )}
      {...rest}
    />
  );
};
CardTitle.displayName = "CardTitle";

/**
 * A description component for the Card, typically used to display supplementary text.
 *
 * @param {CardDescriptionProps} props - Props for the CardDescription component.
 * @returns {JSX.Element} The CardDescription component.
 * @example
 * ```tsx
 * <CardDescription>Card Description</CardDescription>
 * ```
 */
const CardDescription = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      slot="card-description"
      className={cn("text-base text-muted-fg sm:text-sm", className)}
      {...rest}
    />
  );
};
CardDescription.displayName = "CardDescription";

/**
 * A content area for the Card, used to display the main content of the Card.
 *
 * @param {CardContentProps} props - Props for the CardContent component.
 * @returns {JSX.Element} The CardContent component.
 * @example
 * ```tsx
 * <CardContent>Card Content</CardContent>
 * ```
 */
const CardContent = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { className, ...rest } = props;
  return (
    <p slot="card-content" className={cn("p-6 pt-0", className)} {...rest} />
  );
};
CardContent.displayName = "CardContent";

/**
 * A footer component for the Card, typically used to display actions or additional information.
 *
 * @param {CardFooterProps} props - Props for the CardFooter component.
 * @returns {JSX.Element} The CardFooter component.
 * @example
 * ```tsx
 * <CardFooter>Card Footer</CardFooter>
 * ```
 */
const CardFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div
      slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...rest}
    />
  );
};
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
