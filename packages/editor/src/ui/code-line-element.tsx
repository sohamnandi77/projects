import { withRef } from "#editor/lib/with-ref";
import { PlateElement } from "#editor/ui/plate-element";

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
