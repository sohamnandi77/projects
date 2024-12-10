"use client";

// import { MoreDropdownMenu } from "@/components/plate-ui/more-dropdown-menu";
import { useEditorReadOnly } from "@udecode/plate-common/react";

import { ToolbarGroup } from "@projects/ui/toolbar";

// import { AIToolbarButton } from "./ai-toolbar-button";
// import { AlignDropdownMenu } from "./align-dropdown-menu";
// import { ColorDropdownMenu } from "./color-dropdown-menu";
// import { CommentToolbarButton } from "./comment-toolbar-button";
// import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
// import { ExportToolbarButton } from "./export-toolbar-button";
// import { RedoToolbarButton, UndoToolbarButton } from "./history-toolbar-button";
// import { IndentListToolbarButton } from "./indent-list-toolbar-button";
// import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";
// import { IndentToolbarButton } from "./indent-toolbar-button";
// import { InsertDropdownMenu } from "./insert-dropdown-menu";
// import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
// import { LinkToolbarButton } from "./link-toolbar-button";
// import { MarkToolbarButton } from "./mark-toolbar-button";
// import { MediaToolbarButton } from "./media-toolbar-button";
// import { ModeDropdownMenu } from "./mode-dropdown-menu";
// import { OutdentToolbarButton } from "./outdent-toolbar-button";
// import { TableDropdownMenu } from "./table-dropdown-menu";
// import { ToggleToolbarButton } from "./toggle-toolbar-button";

// import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          {/* <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <AIToolbarButton tooltip="AI commands">
              <WandSparklesIcon />
            </AIToolbarButton>
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
          </ToolbarGroup> */}

          <ToolbarGroup>
            {/* <MarkToolbarButton nodeType={PLUGIN_KEYS.BOLD} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={PLUGIN_KEYS.ITALIC}
              tooltip="Italic (⌘+I)"
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={PLUGIN_KEYS.UNDERLINE}
              tooltip="Underline (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={PLUGIN_KEYS.STRIKETHROUGH}
              tooltip="Strikethrough (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={PLUGIN_KEYS.CODE_LEAF}
              tooltip="Code (⌘+E)"
            >
              <Code2Icon />
            </MarkToolbarButton>

            <ColorDropdownMenu
              nodeType={PLUGIN_KEYS.FONT_COLOR}
              tooltip="Text color"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={PLUGIN_KEYS.FONT_BACKGROUND_COLOR}
              tooltip="Background color"
            >
              <PaintBucketIcon />
            </ColorDropdownMenu> */}
          </ToolbarGroup>

          {/* <ToolbarGroup>
            <AlignDropdownMenu />

            <IndentListToolbarButton nodeType={ListStyleType.Disc} />
            <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <LinkToolbarButton />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
          </ToolbarGroup> */}
          {/*
          <ToolbarGroup>
            <MediaToolbarButton nodeType={PLUGIN_KEYS.IMAGE} />
            <MediaToolbarButton nodeType={PLUGIN_KEYS.VIDEO} />
            <MediaToolbarButton nodeType={PLUGIN_KEYS.AUDIO} />
            <MediaToolbarButton nodeType={PLUGIN_KEYS.FILE} />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <LineHeightDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <MoreDropdownMenu />
          </ToolbarGroup> */}
        </>
      )}

      <div className="grow" />

      {/* <ToolbarGroup>
        <MarkToolbarButton nodeType={PLUGIN_KEYS.HIGHLIGHT} tooltip="Highlight">
          <HighlighterIcon />
        </MarkToolbarButton>
        <CommentToolbarButton />
      </ToolbarGroup> */}

      {/* <ToolbarGroup>
        <ModeDropdownMenu />
      </ToolbarGroup> */}
    </div>
  );
}
