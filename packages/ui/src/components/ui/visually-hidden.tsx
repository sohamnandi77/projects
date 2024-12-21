import type { VisuallyHiddenProps } from "react-aria";
import { useVisuallyHidden } from "react-aria";

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { visuallyHiddenProps } = useVisuallyHidden(props);

  return <div {...visuallyHiddenProps} />;
};

export { VisuallyHidden };
