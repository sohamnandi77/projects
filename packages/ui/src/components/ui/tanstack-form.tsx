import type {
  DeepKeys,
  DeepValue,
  FieldApi,
  FormOptions,
  ReactFormExtendedApi,
  Validator,
} from "@tanstack/react-form";
import type { ComponentProps, FC, ReactNode } from "react";
import type {
  FieldErrorProps as AriaFieldErrorProps,
  TextProps as AriaTextProps,
} from "react-aria-components";
import type { Except } from "type-fest";
import type { z } from "zod";
import {
  useField as useFieldApi,
  useForm as useTanStackForm,
} from "@tanstack/react-form";
import { Form } from "react-aria-components";

import type { TextProps } from "@projects/ui/form";
import { Button } from "@projects/ui/button";
import { Description, FieldErrorMessage } from "@projects/ui/form";
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
  TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown>,
  TFormValidator extends Validator<TParentData, unknown>,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> extends FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData> {
  Label: FC<FieldLabelProps>;
  Description: FC<AriaTextProps>;
  Error: FC<AriaFieldErrorProps>;
}

interface FieldComponentProps<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown>,
  TFormValidator extends Validator<TParentData, unknown>,
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
  TFormValidator extends Validator<TParentData, unknown>,
> = <
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown>,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFieldApi = FieldApi<any, any, any, any, any>;

type FormExtended<TFormData> = ReactFormExtendedApi<
  TFormData,
  Validator<TFormData>
> & {
  Root: FC<ComponentProps<typeof Form>>;
  Field: FieldComponent<TFormData, Validator<TFormData>>;
  Submit: FC<ComponentProps<typeof Button>>;
  Reset: FC<ComponentProps<typeof Button>>;
};

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

function FieldLabel(props: FieldLabelProps) {
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

function FieldDesription(props: Readonly<TextProps>) {
  const { children } = props;
  const field = useField();

  if (children === undefined) return null;

  return <Description id={field.formDescriptionId} {...props} />;
}

function FieldError(props: Readonly<AriaFieldErrorProps>) {
  const field = useField();
  const message =
    field.isTouched && field.hasErrors ? field.state.meta.errors : [];

  if (message.length === 0) return null;

  return (
    <FieldErrorMessage {...props}>
      <ul>
        {message.map((error, i) => (
          <li key={`${field.formMessageId}-${i}`}>{error}</li>
        ))}
      </ul>
    </FieldErrorMessage>
  );
}

function useForm<
  TFormSchema extends z.ZodType,
  TFormData = z.infer<TFormSchema>,
>(
  options?: FormOptions<TFormData, Validator<TFormData>>,
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
  ) => (
    <form.Field
      children={(field) => (
        <FieldContextProvider value={field}>
          {props.render(
            Object.assign(field, {
              Label: FieldLabel,
              Description: FieldDesription,
              Error: FieldError,
            }),
          )}
        </FieldContextProvider>
      )}
      {...props}
    />
  );

  const FormSubmit = (props: ComponentProps<typeof Button>) => {
    const { className, ...rest } = props;
    return (
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            isDisabled={isSubmitting ?? !canSubmit}
            className={composeTailwindRenderProps("w-full", className)}
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
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="reset"
            isDisabled={isSubmitting ?? !canSubmit}
            className={composeTailwindRenderProps("w-full", className)}
            {...rest}
          />
        )}
      />
    );
  };

  return {
    ...form,
    Root: FormRoot,
    Field: FormField,
    Submit: FormSubmit,
    Reset: FormReset,
  } as FormExtended<TFormData>;
}

export { useForm };
