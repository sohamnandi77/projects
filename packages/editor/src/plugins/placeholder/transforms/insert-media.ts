/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { InsertNodesOptions } from "@udecode/plate-common";
import type { PlateEditor } from "@udecode/plate-common/react";
import {
  insertNodes,
  nanoid,
  withoutMergingHistory,
  withoutNormalizing,
} from "@udecode/plate-common";
import { Path } from "slate";

import type { TPlaceholderElement } from "../base-placeholder-plugin";
import { PlaceholderPlugin } from "..";
import { BasePlaceholderPlugin } from "../base-placeholder-plugin";
import { UploadErrorCode } from "../type";
import { createUploadError, isUploadError } from "../utils/create-upload-error";
import { getMediaType } from "../utils/get-media-type";
import { withHistoryMark } from "../utils/history";
import { validateFiles } from "../utils/validate-files";

export const insertMedia = (
  editor: PlateEditor,
  files: FileList,
  options?: Omit<InsertNodesOptions, "at"> & { at?: Path },
) => {
  const api = editor.getApi(PlaceholderPlugin);
  const uploadConfig = editor.getOption(PlaceholderPlugin, "uploadConfig");
  const multiple = editor.getOption(PlaceholderPlugin, "multiple");

  try {
    validateFiles(files, uploadConfig);
  } catch (error) {
    if (!isUploadError(error)) throw error;

    return editor.setOption(PlaceholderPlugin, "error", error);
  }

  if (!multiple && files.length > 1) {
    return editor.setOption(
      PlaceholderPlugin,
      "error",
      createUploadError(UploadErrorCode.TOO_MANY_FILES, {
        fileType: null,
        files: Array.from(files),
        maxFileCount: 1,
      }),
    );
  }

  const maxFileCount = editor.getOption(PlaceholderPlugin, "maxFileCount") ?? 3;

  if (files.length > maxFileCount) {
    return editor.setOption(
      PlaceholderPlugin,
      "error",
      createUploadError(UploadErrorCode.TOO_MANY_FILES, {
        fileType: null,
        files: Array.from(files),
        maxFileCount,
      }),
    );
  }

  let currentAt: Path | undefined;
  const { at, nextBlock = true, ...restOptions } = options ?? {};

  Array.from(files).forEach((file, index) => {
    if (index === 0) {
      if (at) {
        currentAt = at;
      }
    } else {
      currentAt = currentAt ? Path.next(currentAt) : undefined;
    }

    const id = nanoid();

    api.placeholder.addUploadingFile(id, file);

    const insert = () => {
      insertNodes<TPlaceholderElement>(
        editor,
        {
          id,
          children: [{ text: "" }],
          mediaType: getMediaType(file, uploadConfig),
          type: editor.getType(BasePlaceholderPlugin),
        },
        { at: currentAt, nextBlock, ...restOptions },
      );
    };

    const disableEmptyPlaceholder = editor.getOption(
      PlaceholderPlugin,
      "disableEmptyPlaceholder",
    );

    if (disableEmptyPlaceholder) {
      withoutMergingHistory(editor, () => {
        withHistoryMark(editor, insert);
      });
    } else {
      withoutNormalizing(editor, insert);
    }
  });
};
