import { use } from "react";
import { cn } from "#ui/lib/utils";
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from "input-otp";
import { Dot } from "lucide-react";

type InputOTOPProps = React.ComponentProps<typeof OTPInput>;

const InputOTP = (props: InputOTOPProps) => {
  const {
    className,
    pattern = REGEXP_ONLY_DIGITS,
    containerClassName,
    ...rest
  } = props;
  return (
    <OTPInput
      data-1p-ignore
      pattern={pattern}
      containerClassName={cn(
        "flex items-center gap-2 disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...rest}
    />
  );
};

type InputOTPGroupProps = React.ComponentProps<"div">;

const InputOTPGroup = (props: InputOTPGroupProps) => {
  const { className, ...rest } = props;
  return (
    <div className={cn("flex items-center gap-x-1.5", className)} {...rest} />
  );
};

interface InputOTPSlotProps extends React.ComponentProps<"div"> {
  index: number;
}

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const { index, className, ...rest } = props;
  const inputOTPContext = use(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  if (!slot) {
    throw new Error("InputOTPSlot must be used inside InputOTP");
  }
  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center rounded-md border text-sm tabular-nums transition-all",
        isActive ? "z-10 border-ring/70 ring-4 ring-ring/20" : "border-input",
        className,
      )}
      {...rest}>
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-fg duration-1000" />
        </div>
      )}
    </div>
  );
};

type InputOTPSeparatorProps = React.ComponentProps<"div">;
const InputOTPSeparator = (props: InputOTPSeparatorProps) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children ?? <Dot className="stroke-[5]" />}</div>;
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

export {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";

export type {
  InputOTPGroupProps,
  InputOTOPProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
};
