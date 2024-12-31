import type { DropZoneProps } from "react-aria-components";
import {
  composeRenderProps,
  DropZone as DropPrimitiveZone,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { focusStyles } from "@projects/ui/lib/style";

const dropZoneStyles = tv({
  extend: focusStyles,
  base: "group flex max-h-[200px] max-w-xl flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6 text-sm has-[[slot=description]]:text-center",
  variants: {
    isDropTarget: {
      true: "border-solid border-primary bg-primary/10 ring-4 ring-primary/20 [&_.text-muted-fg]:text-primary-fg",
    },
  },
});

const DropZone = (props: DropZoneProps) => {
  const { className, ...rest } = props;
  return (
    <DropPrimitiveZone
      className={composeRenderProps(className, (className, renderProps) =>
        dropZoneStyles({ ...renderProps, className }),
      )}
      {...rest}
    />
  );
};

export { DropZone };
