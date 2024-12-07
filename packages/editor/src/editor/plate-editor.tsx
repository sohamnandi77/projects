import type { TElement, Value } from "@udecode/plate-common";
import { useState } from "react";
import { Plate } from "@udecode/plate-common/react";

import { useCreateEditor } from "@projects/editor/editor/use-create-editor";
import { Editor, EditorContainer } from "@projects/editor/ui/editor";

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
