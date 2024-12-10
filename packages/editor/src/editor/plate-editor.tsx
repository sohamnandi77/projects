import type { TElement, Value } from "@udecode/plate-common";
import { useState } from "react";
import { Plate } from "@udecode/plate-common/react";

import { Editor, EditorContainer } from "../ui/editor";
import { useCreateEditor } from "./use-create-editor";

type PlateValue = Value & TElement[];

export const PlateEditor = () => {
  const [, setValue] = useState<PlateValue>();
  const editor = useCreateEditor();

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        setValue(value);
      }}
    >
      <EditorContainer>
        <Editor variant="demo" placeholder="Let out your creativity..." />
      </EditorContainer>
    </Plate>
  );
};
