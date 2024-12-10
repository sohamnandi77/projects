import { withRef } from "@projects/editor/lib/withRef";
import { PlateElement } from "@projects/editor/ui/plate-element";

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
