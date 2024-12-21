import { forwardRef, useContext } from "react";
import { cn } from "#ui/lib/utils";
import { OTPInput, OTPInputContext } from "input-otp";
import { Circle } from "lucide-react";

interface InputOTPType
  extends React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof OTPInput> &
      React.RefAttributes<HTMLInputElement>
  > {
  Group: typeof InputOTPGroup;
  Slot: typeof InputOTPSlot;
  Separator: typeof InputOTPSeparator;
}

const InputOTP = forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    data-1p-ignore
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
)) as InputOTPType;
InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-x-1.5", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext);

  if (!inputOTPContext.slots[index])
    throw new Error("InputOTPSlot must be with in a Provider");

  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-md border text-sm tabular-nums transition-all",
        isActive ? "z-10 border-ring/70 ring-4 ring-ring/20" : "border-input",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-fg duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Circle className="size-2 fill-current" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

InputOTP.Group = InputOTPGroup;
InputOTP.Slot = InputOTPSlot;
InputOTP.Separator = InputOTPSeparator;

export { InputOTP };
