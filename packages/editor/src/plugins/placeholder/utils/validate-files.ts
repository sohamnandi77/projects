import type { UploadConfig } from "..";
import type { AllowedFileType } from "../internal/mimes";
import { groupFilesByType } from "./group-files-by-type";
import { validateFileItem } from "./validate-file-item";

export const validateFiles = (fileList: FileList, config: UploadConfig) => {
  const fileTypeMap = groupFilesByType(fileList, config);

  const keys = Object.keys(fileTypeMap) as AllowedFileType[];

  for (const key of keys) {
    const itemConfig = config[key];

    const itemFiles = fileTypeMap[key];

    if (itemFiles.length === 0) continue;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    validateFileItem(itemFiles, itemConfig!, key);
  }
};
