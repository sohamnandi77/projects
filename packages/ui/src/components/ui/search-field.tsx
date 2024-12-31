import type { SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";
import { useMemo } from "react";
import { createContextFactory } from "#ui/lib/utils";
import { Search, X } from "lucide-react";
import { SearchField as SearchFieldPrimitive } from "react-aria-components";
import { tv } from "tailwind-variants";

import type { InputProps } from "./input";
import { Button } from "./button";
import { FieldGroup } from "./form";
import { TextFieldInput } from "./input";
import { Loader } from "./loader";

const getSearchFieldVariants = tv({
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

const { base, searchIcon, clearButton, input } = getSearchFieldVariants();

interface SearchContextValue {
  /** Whether the search field is pending */
  isPending?: boolean;
}

const [SearchContext, useSearchContext] = createContextFactory<
  SearchContextValue | undefined
>();

interface SearchFieldProps extends AriaSearchFieldProps {
  isPending?: boolean;
}

const SearchField = (props: SearchFieldProps) => {
  const { className, isPending, ...rest } = props;

  const value = useMemo(() => ({ isPending }), [isPending]);

  return (
    <SearchContext value={value}>
      <SearchFieldPrimitive className={base(className)} {...rest} />
    </SearchContext>
  );
};

const SearchFieldInput = (props: InputProps) => {
  const { placeholder = "Search...", className, ...rest } = props;
  const context = useSearchContext();

  if (!context) {
    throw new Error("SearchFieldInput must be within SearchField");
  }

  const { isPending } = context;

  return (
    <FieldGroup>
      <Search aria-hidden className={searchIcon()} />
      <TextFieldInput
        placeholder={placeholder}
        className={input(className)}
        {...rest}
      />
      {isPending ? (
        <Loader variant="spin" className="mr-2.5" />
      ) : (
        <Button size="icon" appearance="plain" className={clearButton()}>
          <X aria-hidden className="size-4" />
        </Button>
      )}
    </FieldGroup>
  );
};

export { SearchField, SearchFieldInput };
export type { SearchFieldProps };
