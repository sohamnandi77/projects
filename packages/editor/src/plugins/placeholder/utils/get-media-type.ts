import type { UploadConfig } from "..";
import type { AllowedFileType, FileRouterInputKey } from "../internal/mimes";
import type { MediaKeys } from "../type";
import { matchFileType } from "./match-file-type";

export const getMediaType = (file: File, config: UploadConfig): MediaKeys => {
  const type = matchFileType(
    file,
    Object.keys(config) as FileRouterInputKey[],
  ) as AllowedFileType;

  return config[type]?.mediaType ?? "file";
};
