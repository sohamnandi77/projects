import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from "@radix-ui/react-avatar";
import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import { cn } from "#ui/lib/utils";

const Avatar = (props: AvatarProps) => {
  const { className, ...rest } = props;
  return (
    <Root
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...rest}
    />
  );
};

const AvatarImage = (props: AvatarImageProps) => {
  const { className, ...rest } = props;
  return (
    <Image className={cn("aspect-square size-full", className)} {...rest} />
  );
};

const AvatarFallback = (props: AvatarFallbackProps) => {
  const { className, ...rest } = props;
  return (
    <Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...rest}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };

export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
