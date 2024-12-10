import type {
  SetNodesOptions,
  SlateEditor,
  TElement,
} from "@udecode/plate-common";
import { setNodes } from "@udecode/plate-common";

interface MediaNodeProps extends Partial<Omit<TElement, "children">> {
  type: string;
  url: string;
  id?: string;
  initialHeight?: number;
  initialWidth?: number;
  isUpload?: boolean;
  name?: string;
  placeholderId?: string;
  width?: number;
}

export const setMediaNode = (
  editor: SlateEditor,
  props: MediaNodeProps,
  options?: SetNodesOptions,
) => setNodes(editor, props, options);
