import type {
  SearchFieldProps as SearchFieldPrimitiveProps,
  ValidationResult,
} from "react-aria-components";
import { composeTailwindRenderProps } from "#ui/lib/utils";
import { Search, X } from "lucide-react";
import { SearchField as SearchFieldPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

import { Button } from "./button";
import { Description, FieldError, FieldGroup, Input, Label } from "./form";
import { Loader } from "./loader";

const searchFieldStyles = tv({
  slots: {
    base: "group flex min-w-10 flex-col gap-y-1.5",
    searchIcon:
      "ml-2.5 size-4 shrink-0 text-muted-fg group-disabled:text-muted-fg forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]",
    clearButton: [
      "mr-1 size-8 text-muted-fg group-empty:invisible hover:bg-transparent hover:text-fg pressed:bg-transparent pressed:text-fg",
    ],
    input: "[&::-webkit-search-cancel-button]:hidden",
  },
});

const { base, searchIcon, clearButton, input } = searchFieldStyles();

interface SearchFieldProps extends SearchFieldPrimitiveProps {
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isPending?: boolean;
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ...props
}: SearchFieldProps) => {
  return (
    <SearchFieldPrimitive
      aria-label={placeholder ?? props["aria-label"] ?? "Search..."}
      {...props}
      className={composeTailwindRenderProps(base(), className)}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <Search aria-hidden className={searchIcon()} />
        <Input placeholder={placeholder ?? "Search..."} className={input()} />
        {isPending ? (
          <Loader variant="spin" className="mr-2.5" />
        ) : (
          <Button size="icon" appearance="plain" className={clearButton()}>
            <X aria-hidden />
          </Button>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  );
};

export { SearchField, type SearchFieldProps };
