import type {
  DeepKeys,
  DeepValue,
  FieldApi,
  FormOptions,
  ReactFormExtendedApi,
  Validator,
} from "@tanstack/react-form";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, FC, ReactNode } from "react";
import type {
  FieldErrorProps as AriaFieldErrorProps,
  GroupProps as AriaGroupProps,
  TextProps as AriaTextProps,
} from "react-aria-components";
import type { Except } from "type-fest";
import type { z } from "zod";
import {
  useField as useFieldApi,
  useForm as useTanStackForm,
} from "@tanstack/react-form";
import { cva } from "class-variance-authority";
import {
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Text as AriaText,
  Form,
} from "react-aria-components";

import { Button } from "@projects/ui/button";
import { Label } from "@projects/ui/label";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "@projects/ui/lib/utils";

import type { UseFieldOptions } from "../../../../../node_modules/@tanstack/react-form/dist/esm/types";

type FieldLabelProps = ComponentProps<typeof Label>;

interface FieldApiExtended<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> extends FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData> {
  Label: FC<FieldLabelProps>;
  Description: FC<AriaTextProps>;
  Message: FC<AriaFieldErrorProps>;
}

interface FieldComponentProps<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> extends UseFieldOptions<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
  > {
  render: (
    fieldApi: FieldApiExtended<
      TParentData,
      TName,
      TFieldValidator,
      TFormValidator,
      TData
    >,
  ) => ReactNode;
}

type FieldComponent<
  TParentData,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
> = <
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>({
  render,
  ...fieldOptions
}: Except<
  FieldComponentProps<
    TParentData,
    TName,
    TFieldValidator,
    TFormValidator,
    TData
  >,
  "form"
>) => ReactNode;

type FormExtended<TFormData> = ReactFormExtendedApi<
  TFormData,
  Validator<TFormData>
> & {
  Root: FC<ComponentProps<typeof Form>>;
  Field: FieldComponent<TFormData, Validator<TFormData>>;
  Submit: FC<ComponentProps<typeof Button>>;
  Reset: FC<ComponentProps<typeof Button>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFieldApi = FieldApi<any, any, any, any, any>;

const [FieldContextProvider, useFieldContext] =
  createContextFactory<AnyFieldApi>();

function useField() {
  const fieldContext = useFieldContext();
  const fieldApi = useFieldApi({
    form: fieldContext.form,
    name: fieldContext.name,
  });

  return Object.assign(fieldContext, {
    ...fieldApi.state.meta,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-item-description`,
    formMessageId: `${fieldContext.name}-form-item-message`,
    hasErrors: fieldApi.state.meta.errors.length > 0,
  });
}

function FormLabel(props: FieldLabelProps) {
  const { className, children, ...rest } = props;
  const field = useField();

  if (children === undefined) return null;

  return (
    <Label
      id={field.formItemId}
      htmlFor={field.name.toString()}
      className={cn(
        "font-semibold",
        field.isTouched && field.hasErrors && "text-destructive",
        className,
      )}
      {...rest}
    >
      {children}
    </Label>
  );
}

function FormDesription(props: Readonly<AriaTextProps>) {
  const { className, children, ...rest } = props;
  const field = useField();

  if (children === undefined) return null;

  return (
    <AriaText
      id={field.formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
      slot="description"
    />
  );
}

function FieldError(props: Readonly<AriaFieldErrorProps>) {
  const { className, ...rest } = props;
  const field = useField();
  const message =
    field.isTouched && field.hasErrors ? field.state.meta.errors : [];

  return (
    <AriaFieldError
      className={cn("text-sm font-medium text-error", className)}
      {...rest}
    >
      <ul>
        {message.map((error, i) => (
          <li key={`${field.formMessageId}-${i}`}>{error}</li>
        ))}
      </ul>
    </AriaFieldError>
  );
}

function useForm<
  TFormSchema extends z.ZodType,
  TFormData = z.infer<TFormSchema>,
>(
  options: FormOptions<TFormData, Validator<TFormData>>,
): FormExtended<TFormData> {
  const form = useTanStackForm(options);

  const FormRoot = (props: ComponentProps<typeof Form>) => {
    const { className, ...rest } = props;
    return (
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit();
        }}
        className={className}
        {...rest}
      />
    );
  };

  const FormField: FieldComponent<TFormData, Validator<TFormData>> = (
    props,
  ) => {
    const { render, ...rest } = props;
    return (
      <form.Field {...rest}>
        {(field) => (
          <FieldContextProvider value={field}>
            {render(
              Object.assign(field, {
                Label: FormLabel,
                Description: FormDesription,
                Message: FieldError,
              }),
            )}
          </FieldContextProvider>
        )}
      </form.Field>
    );
  };

  const FormSubmit = (props: ComponentProps<typeof Button>) => {
    const { className, ...rest } = props;
    return (
      <form.Subscribe
        children={(state) => (
          <Button
            type="submit"
            isDisabled={state.isSubmitting || !state.canSubmit}
            className={cn("w-full", className)}
            {...rest}
          />
        )}
      />
    );
  };

  const FormReset = (props: ComponentProps<typeof Button>) => {
    const { className, ...rest } = props;
    return (
      <form.Subscribe
        children={(state) => (
          <Button
            type="reset"
            isDisabled={state.isSubmitting || !state.canSubmit}
            className={cn("w-full", className)}
            {...rest}
          />
        )}
      />
    );
  };

  return {
    ...form,
    Root: FormRoot,
    // @ts-expect-error - // FIX: This is a hack to get around the type error
    Field: FormField,
    Submit: FormSubmit,
    Reset: FormReset,
  };
}

const fieldGroupVariants = cva("", {
  variants: {
    variant: {
      default: [
        "relative flex h-10 w-full items-center overflow-hidden rounded-md border border-stoke-input bg-background px-3 py-2 text-sm ring-offset-background",
        /* Focus Within */
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        /* Disabled */
        "disabled:opacity-50",
      ],
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface GroupProps
  extends AriaGroupProps,
    VariantProps<typeof fieldGroupVariants> {}

function FieldGroup({ className, variant, ...props }: GroupProps) {
  return (
    <AriaGroup
      className={composeTailwindRenderProps(
        fieldGroupVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { FieldGroup, useForm };
