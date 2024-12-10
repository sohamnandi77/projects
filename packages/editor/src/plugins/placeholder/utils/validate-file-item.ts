/* eslint-disable @typescript-eslint/only-throw-error */
import type { AllowedFileType } from "../internal/mimes";
import type { MediaItemConfig } from "../type";
import { UploadErrorCode } from "../type";
import { createUploadError } from "./create-upload-error";
import { fileSizeToBytes } from "./file-size-to-bytes";

export const validateFileItem = (
  files: File[],
  config: MediaItemConfig,
  key: AllowedFileType,
): UploadErrorCode | true => {
  const { maxFileCount = Infinity, maxFileSize, minFileCount = 1 } = config;

  if (files.length < minFileCount)
    throw createUploadError(UploadErrorCode.TOO_LESS_FILES, {
      fileType: key,
      files: files,
      minFileCount: minFileCount,
    });
  if (files.length > maxFileCount)
    throw createUploadError(UploadErrorCode.TOO_MANY_FILES, {
      fileType: key,
      files: files,
      maxFileCount: maxFileCount,
    });

  for (const f of files) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const bytes = fileSizeToBytes(maxFileSize!, f);

    if (f.size > bytes)
      throw createUploadError(UploadErrorCode.TOO_LARGE, {
        fileType: key,
        files: [f],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        maxFileSize: maxFileSize!,
      });
  }

  return true;
};
