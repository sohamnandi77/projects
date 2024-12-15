import { PlateLeaf } from "@udecode/plate-common/react";
import { withRef } from "#editor/lib/with-ref";

import { useCodeSyntaxLeaf } from "../plugins/code-block/hooks";

export const CodeSyntaxLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    const { leaf } = props;

    const { tokenProps } = useCodeSyntaxLeaf({ leaf });

    return (
      <PlateLeaf ref={ref} {...props}>
        <span {...tokenProps}>{children}</span>
      </PlateLeaf>
    );
  },
);
