import { withRef } from "@projects/editor/lib/withRef";
import { useCodeBlockElementState } from "@projects/editor/plugins/code-block/hooks";
import { CodeBlockCombobox } from "@projects/editor/ui/code-block-combobox";
import { PlateElement } from "@projects/editor/ui/plate-element";
import { cn } from "@projects/ui/lib/utils";

import "./code-block-element.css";

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <PlateElement
        ref={ref}
        className={cn("relative py-1", state.className, className)}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute right-2 top-2 z-10 select-none"
            contentEditable={false}
          >
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    );
  },
);
