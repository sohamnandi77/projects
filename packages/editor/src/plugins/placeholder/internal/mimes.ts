import { application } from "./application";
import { audio } from "./audio";
import { image } from "./image";
import { misc } from "./misc";
import { text } from "./text";
import { video } from "./video";

export const mimes = {
  ...application,
  ...audio,
  ...image,
  ...text,
  ...video,
  ...misc,
};

export type MimeType = keyof typeof mimes;

export type FileExtension = (typeof mimes)[MimeType]["extensions"][number];

export const ALLOWED_FILE_TYPES = [
  "image",
  "video",
  "audio",
  "pdf",
  "text",
  "blob",
] as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];

export type FileRouterInputKey = AllowedFileType | MimeType;
