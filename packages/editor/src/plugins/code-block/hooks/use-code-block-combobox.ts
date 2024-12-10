import React from "react";
import { setNodes } from "@udecode/plate-common";
import {
  findNodePath,
  useEditorRef,
  useElement,
} from "@udecode/plate-common/react";
import { useReadOnly } from "slate-react";

import type { TCodeBlockElement } from "@projects/editor/plugins/code-block/types";
import { BaseCodeBlockPlugin } from "@projects/editor/plugins/code-block/base-code-block-plugin";

export const useCodeBlockComboboxState = () => {
  const editor = useEditorRef();
  const readOnly = useReadOnly();
  const element = useElement<TCodeBlockElement>();
  const [value, setValue] = React.useState(element.lang ?? "text");

  const { syntaxPopularFirst } = editor.getOptions(BaseCodeBlockPlugin);

  React.useEffect(() => {
    setValue(element.lang ?? "text");
  }, [element.lang]);

  return {
    element,
    readOnly,
    setValue,
    syntaxPopularFirst,
    value,
  };
};

export const useCodeBlockCombobox = ({
  element,
  setValue,
}: ReturnType<typeof useCodeBlockComboboxState>) => {
  const editor = useEditorRef();

  return {
    commandItemProps: {
      onSelect: (_value: string) => {
        const path = findNodePath(editor, element);
        if (path)
          setNodes<TCodeBlockElement>(editor, { lang: _value }, { at: path });
        setValue(_value);
      },
    },
  };
};
