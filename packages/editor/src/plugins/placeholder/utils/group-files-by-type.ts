import type { UploadConfig } from "..";
import type { AllowedFileType } from "../internal/mimes";
import { matchFileType } from "./match-file-type";

export const groupFilesByType = (
  fileList: FileList,
  config: UploadConfig,
): Record<AllowedFileType, File[]> => {
  const FileTypeMap: Record<AllowedFileType, File[]> = {
    audio: [],
    blob: [],
    image: [],
    pdf: [],
    text: [],
    video: [],
  };

  for (const file of fileList) {
    const type = matchFileType(file, Object.keys(config) as AllowedFileType[]);

    FileTypeMap[type as AllowedFileType].push(file);
  }

  return FileTypeMap;
};
