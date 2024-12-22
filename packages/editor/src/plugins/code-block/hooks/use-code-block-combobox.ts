import type { TCodeBlockElement } from "#editor/plugins/code-block/types";
import React from "react";
import { setNodes } from "@udecode/plate-common";
import {
  findPath,
  useEditorRef,
  useElement,
} from "@udecode/plate-common/react";
import { BaseCodeBlockPlugin } from "#editor/plugins/code-block/base-code-block-plugin";
import { useReadOnly } from "slate-react";

export const useCodeBlockComboBoxState = () => {
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

export const useCodeBlockComboBox = ({
  element,
  setValue,
}: ReturnType<typeof useCodeBlockComboBoxState>) => {
  const editor = useEditorRef();

  return {
    commandItemProps: {
      onSelect: (_value: string) => {
        const path = findPath(editor, element);
        if (path)
          setNodes<TCodeBlockElement>(editor, { lang: _value }, { at: path });
        setValue(_value);
      },
    },
  };
};
