import type {
  ButtonProps as AriaButtonProps,
  GroupProps as AriaGroupProps,
  InputProps as AriaInputProps,
  SearchFieldProps as AriaSearchFieldProps,
  ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { SearchIcon, XIcon } from "lucide-react";
import {
  Button as AriaButton,
  Group as AriaGroup,
  Input as AriaInput,
  SearchField as AriaSearchField,
  Text,
} from "react-aria-components";

import { FieldErrorMessage, FieldGroup } from "@projects/ui/form";
import { Label } from "@projects/ui/label";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

function SearchField(props: Readonly<AriaSearchFieldProps>) {
  const { className, ...rest } = props;
  return (
    <AriaSearchField
      className={composeTailwindRenderProps("group", className)}
      {...rest}
    />
  );
}

function SearchFieldInput(props: Readonly<AriaInputProps>) {
  const { className, ...rest } = props;
  return (
    <AriaInput
      className={composeTailwindRenderProps(
        "min-w-0 flex-1 bg-bg px-2 py-1.5 outline outline-0 placeholder:text-muted-fg [&::-webkit-search-cancel-button]:hidden",
        className,
      )}
      {...rest}
    />
  );
}

function SearchFieldGroup(props: Readonly<AriaGroupProps>) {
  const { className, ...rest } = props;
  return (
    <AriaGroup
      className={composeTailwindRenderProps(
        cn(
          "flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-bg px-3 py-2 text-sm ring-offset-bg",
          /* Focus Within */
          "data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2",
          /* Disabled */
          "disabled:opacity-50",
        ),
        className,
      )}
      {...rest}
    />
  );
}

function SearchFieldClear(props: Readonly<AriaButtonProps>) {
  const { className, ...rest } = props;
  return (
    <AriaButton
      className={composeTailwindRenderProps(
        cn(
          "mr-1 rounded-sm opacity-70 ring-offset-bg transition-opacity",
          /* Hover */
          "hover:opacity-100",
          /* Disabled */
          "disabled:pointer-events-none",
          /* Empty */
          "group-empty:invisible",
        ),
        className,
      )}
      {...rest}
    />
  );
}

interface JollySearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollySearchField({
  label,
  description,
  className,
  errorMessage,
  ...props
}: Readonly<JollySearchFieldProps>) {
  return (
    <SearchField
      className={composeTailwindRenderProps(
        "group flex flex-col gap-2",
        className,
      )}
      {...props}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <SearchIcon aria-hidden className="size-4 text-muted-fg" />
        <SearchFieldInput placeholder="Search..." />
        <SearchFieldClear>
          <XIcon aria-hidden className="size-4" />
        </SearchFieldClear>
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-fg" slot="description">
          {description}
        </Text>
      )}
      <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
    </SearchField>
  );
}

export {
  JollySearchField,
  SearchField,
  SearchFieldClear,
  SearchFieldGroup,
  SearchFieldInput,
};
export type { JollySearchFieldProps };
