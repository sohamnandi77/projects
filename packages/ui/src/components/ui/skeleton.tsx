import { cn } from "@projects/ui/lib/utils";

function Skeleton(props: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const { className } = props;
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
