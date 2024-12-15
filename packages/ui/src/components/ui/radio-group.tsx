import type {
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
  ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { Circle } from "lucide-react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { FieldErrorMessage } from "@projects/ui/form";
import { Label, labelVariants } from "@projects/ui/label";
import { cn, composeTailwindRenderProps } from "@projects/ui/lib/utils";

const RadioGroup = ({
  className,
  orientation = "vertical",
  ...props
}: AriaRadioGroupProps) => {
  return (
    <AriaRadioGroup
      className={composeTailwindRenderProps(
        cn({
          "grid gap-2": orientation === "vertical",
          "flex items-center gap-2": orientation === "horizontal",
        }),
        className,
      )}
      {...props}
    />
  );
};

const Radio = ({ className, children, ...props }: AriaRadioProps) => {
  return (
    <AriaRadio
      className={composeTailwindRenderProps(
        cn(
          "group flex items-center gap-x-2",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-70",
          labelVariants,
        ),
        className,
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          <span
            className={cn(
              "flex aspect-square size-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-bg",
              /* Focus */
              "group-focus:outline-none",
              /* Focus Visible */
              "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2",
              /* Disabled */
              "group-disabled:cursor-not-allowed group-disabled:opacity-50",
              /* Invalid */
              "group-invalid:border-danger",
            )}
          >
            {renderProps.isSelected && (
              <Circle className="size-2.5 fill-current text-current" />
            )}
          </span>
          {children}
        </>
      ))}
    </AriaRadio>
  );
};

interface JollyRadioGroupProps extends AriaRadioGroupProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyRadioGroup(props: Readonly<JollyRadioGroupProps>) {
  const { label, description, className, errorMessage, children, ...rest } =
    props;
  return (
    <RadioGroup
      className={composeTailwindRenderProps(
        "group flex flex-col gap-2",
        className,
      )}
      {...rest}
    >
      {composeRenderProps(children, (children) => (
        <>
          <Label>{label}</Label>
          {children}
          {description && (
            <Text slot="description" className="text-sm text-muted-fg">
              {description}
            </Text>
          )}
          <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
        </>
      ))}
    </RadioGroup>
  );
}

export { JollyRadioGroup, Radio, RadioGroup };
export type { JollyRadioGroupProps };
