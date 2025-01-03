import type { TCodeBlockElement } from "#editor/plugins/code-block/types";
import { useEffect, useState } from "react";
import { useEditorRef } from "@udecode/plate-common/react";
import { BaseCodeBlockPlugin } from "#editor/plugins/code-block/base-code-block-plugin";

export const useCodeBlockElementState = ({
  element,
}: {
  element: TCodeBlockElement;
}) => {
  const editor = useEditorRef();
  const [domLoaded, setDomLoaded] = useState(false);
  const { lang } = element;

  const codeClassName = lang ? `${lang} language-${lang}` : "";

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const { syntax } = editor.getOptions(BaseCodeBlockPlugin);

  return {
    className: domLoaded && codeClassName,
    syntax,
  };
};
