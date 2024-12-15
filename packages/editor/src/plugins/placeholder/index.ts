import type { ExtendConfig, InsertNodesOptions } from "@udecode/plate-common";
import {
  bindFirst,
  getAncestorNode,
  getNodeString,
  removeNodes,
} from "@udecode/plate-common";
import { findEventRange, toTPlatePlugin } from "@udecode/plate-common/react";
import { PLUGIN_KEYS } from "#editor/constant";

import type { PlaceholderConfig } from "./base-placeholder-plugin";
import type { AllowedFileType } from "./internal/mimes";
import type { MediaItemConfig, UploadError } from "./type";
import { BasePlaceholderPlugin } from "./base-placeholder-plugin";
import { insertMedia } from "./transforms/insert-media";
import { isHistoryMarking } from "./utils/history";

export interface PlaceholderApi {
  addUploadingFile: (id: string, file: File) => void;
  getUploadingFile: (id: string) => File | undefined;
  removeUploadingFile: (id: string) => void;
}

export interface PlaceholderTransforms {
  insertMedia: (files: FileList, options?: InsertNodesOptions) => void;
}

export type UploadConfig = Partial<Record<AllowedFileType, MediaItemConfig>>;

export const PlaceholderPlugin: ReturnType<typeof toTPlatePlugin> =
  toTPlatePlugin<
    ExtendConfig<
      PlaceholderConfig,
      {
        disableEmptyPlaceholder: boolean;
        disableFileDrop: boolean;
        uploadConfig: UploadConfig;
        uploadingFiles: Record<string, File>;
        error?: UploadError | null;
        maxFileCount?: number;
        // Whether multiple files of the same type can be uploaded.
        multiple?: boolean;
      },
      { placeholder: PlaceholderApi }
    >
  >(BasePlaceholderPlugin, {
    extendEditor: ({ editor }) => {
      const { writeHistory } = editor;

      editor.writeHistory = (stack, batch) => {
        if (isHistoryMarking(editor)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const newBatch = {
            ...batch,
            [PLUGIN_KEYS.PLACEHOLDER]: true,
          };

          return writeHistory(stack, newBatch);
        }

        writeHistory(stack, batch);
      };

      return editor;
    },
    options: {
      disableEmptyPlaceholder: false,
      disableFileDrop: false,
      error: null,
      maxFileCount: 5,
      multiple: true,
      uploadConfig: {
        audio: {
          maxFileCount: 1,
          maxFileSize: "8MB",
          mediaType: PLUGIN_KEYS.AUDIO,
          minFileCount: 1,
        },
        blob: {
          maxFileCount: 1,
          maxFileSize: "8MB",
          mediaType: PLUGIN_KEYS.FILE,
          minFileCount: 1,
        },
        image: {
          maxFileCount: 3,
          maxFileSize: "4MB",
          mediaType: PLUGIN_KEYS.IMAGE,
          minFileCount: 1,
        },
        pdf: {
          maxFileCount: 1,
          maxFileSize: "4MB",
          mediaType: PLUGIN_KEYS.FILE,
          minFileCount: 1,
        },
        text: {
          maxFileCount: 1,
          maxFileSize: "64KB",
          mediaType: PLUGIN_KEYS.FILE,
          minFileCount: 1,
        },
        video: {
          maxFileCount: 1,
          maxFileSize: "16MB",
          mediaType: PLUGIN_KEYS.VIDEO,
          minFileCount: 1,
        },
      },
      uploadingFiles: {},
    },
  })
    .extendEditorTransforms(({ editor }) => ({
      insert: {
        media: bindFirst(insertMedia, editor),
      },
    }))
    .extendApi(({ getOption, setOption }) => ({
      addUploadingFile: (id: string, file: File) => {
        const uploadingFiles = getOption("uploadingFiles");

        setOption("uploadingFiles", {
          ...uploadingFiles,
          [id]: file,
        });
      },
      getUploadingFile: (id: string) => {
        const uploadingFiles = getOption("uploadingFiles");

        return uploadingFiles[id];
      },
      removeUploadingFile: (id: string) => {
        const uploadingFiles = getOption("uploadingFiles");

        delete uploadingFiles[id];

        setOption("uploadingFiles", uploadingFiles);
      },
    }))
    .extend(({ getOption }) => ({
      handlers: {
        onDrop: ({ editor, event, tf }) => {
          // using DnD plugin by default
          if (!getOption("disableFileDrop")) return;

          const { files } = event.dataTransfer;

          if (files.length === 0) return false;

          /** Without this, the dropped file replaces the page */
          event.preventDefault();
          event.stopPropagation();

          /**
           * When we drop a file, the selection won't move automatically to the
           * drop location. Find the location from the event and upload the files
           * at that location.
           */
          const at = findEventRange(editor, event);

          if (!at) return false;

          tf.insert.media(files);

          return true;
        },
        onPaste: ({ editor, event, tf }) => {
          const { files, types } = event.clipboardData;
          const TEXT_HTML = "text/html";

          // If there are files but no HTML, it must be a system file
          if (files.length > 0 && !types.includes(TEXT_HTML)) {
            event.preventDefault();
            event.stopPropagation();

            let inserted = false;
            const ancestor = getAncestorNode(editor);

            if (ancestor) {
              const [node, path] = ancestor;

              if (getNodeString(node).length === 0) {
                removeNodes(editor, { at: path });
                tf.insert.media(files, { at: path, nextBlock: false });
                inserted = true;
              }
            }
            if (!inserted) {
              tf.insert.media(files, { nextBlock: false });
            }

            return true;
          }

          return false;
        },
      },
    }));
