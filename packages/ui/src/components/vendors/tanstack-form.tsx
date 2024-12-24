import type {
  DeepKeys,
  DeepValue,
  FieldApi,
  FormOptions,
  ReactFormExtendedApi,
  Validator,
} from "@tanstack/react-form";
import type { ButtonProps } from "#ui/components/ui/button";
import type {
  DescriptionProps,
  FieldErrorProps,
  FormProps,
  LabelProps,
} from "#ui/components/ui/form";
import type { FC, ReactNode } from "react";
import type { Except } from "type-fest";
import {
  useField as useFieldApi,
  useForm as useTanStackForm,
} from "@tanstack/react-form";
import { Button } from "#ui/components/ui/button";
import { Description, FieldError, Form } from "#ui/components/ui/form";
import { Label } from "#ui/components/ui/label";
import {
  cn,
  composeTailwindRenderProps,
  createContextFactory,
} from "#ui/lib/utils";

import type { UseFieldOptions } from "../../../../../node_modules/@tanstack/react-form/dist/esm/types";

interface FieldApiExtended<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends Validator<DeepValue<TParentData, TName>, unknown>,
  TFormValidator extends Validator<TParentData, unknown>,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
> extends FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData> {
  Label: FC<LabelProps>;
  Description: FC<DescriptionProps>;
  Message: FC<FieldErrorProps>;
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
  Root: FC<FormProps>;
  Field: FieldComponent<TFormData, Validator<TFormData>>;
  Submit: FC<ButtonProps>;
  Reset: FC<ButtonProps>;
};

const [FieldContext, useFieldContext] = createContextFactory<AnyFieldApi>();

function useField() {
  const fieldContext = useFieldContext();
  const fieldApi = useFieldApi({
    form: fieldContext.form,
    name: fieldContext.name,
  });

  return Object.assign(fieldContext, {
    // for some reason, when using `fieldContext.state` here, the state is not updated.
    ...fieldApi.state.meta,
    hasErrors: fieldApi.state.meta.errors.length > 0,
  });
}

function FieldLabel(props: Readonly<LabelProps>) {
  const { className, children, ...rest } = props;
  const field = useField();

  if (children === undefined) return null;

  return (
    <Label
      htmlFor={field.name.toString()}
      className={cn(
        "font-semibold",
        field.isTouched && field.hasErrors && "text-danger",
        className,
      )}
      {...rest}>
      {children}
    </Label>
  );
}

function FieldDescription(props: Readonly<DescriptionProps>) {
  const { className, children, ...rest } = props;
  if (children === undefined) return null;

  return (
    <Description className={cn("text-sm text-muted-fg", className)} {...rest}>
      {children}
    </Description>
  );
}

// TODO: Add Multiple & Single Error Message Support
function FieldMessage(props: Readonly<FieldErrorProps>) {
  const { className, children, ...rest } = props;
  const field = useField();

  const hasPlaceholder = children !== undefined;
  const message =
    field.isTouched && field.hasErrors ? field.state.meta.errors[0] : null;

  if (!hasPlaceholder && !message) return null;

  return (
    <FieldError
      className={composeTailwindRenderProps(
        cn(
          "text-sm",
          field.isTouched && field.hasErrors
            ? "font-medium text-danger"
            : "text-muted-fg",
        ),
        className,
      )}
      {...rest}>
      {message ?? children}
    </FieldError>
  );
}

function useForm<TFormData>(
  options?: FormOptions<TFormData, Validator<TFormData>>,
): FormExtended<TFormData> {
  const form = useTanStackForm(options);

  const FormRoot = (props: FormProps) => {
    const { className, ...rest } = props;
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className={cn("w-full space-y-6 lg:max-w-sm", className)}
        {...rest}
      />
    );
  };

  const FormField: FieldComponent<TFormData, Validator<TFormData>> = (
    props,
  ) => (
    <form.Field
      children={(field) => (
        <FieldContext value={field}>
          {props.render(
            Object.assign(field, {
              Label: FieldLabel,
              Description: FieldDescription,
              Message: FieldMessage,
            }),
          )}
        </FieldContext>
      )}
      {...props}
    />
  );

  const FormSubmit = (props: ButtonProps) => {
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

  const FormReset = (props: ButtonProps) => {
    const { className, ...rest } = props;
    return (
      <form.Subscribe
        selector={({ isSubmitting }) => isSubmitting}
        children={(isSubmitting) => (
          <Button
            type="reset"
            isDisabled={isSubmitting}
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
