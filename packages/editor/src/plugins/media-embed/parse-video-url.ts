import { isUrl } from "@udecode/plate-common";
import videoParser from "js-video-url-parser";

import type { EmbedUrlData } from "../media";

export const VIDEO_PROVIDERS_URLS = {
  youtube: "https://www.youtube.com/embed/",
  vimeo: "https://player.vimeo.com/video/",
  dailymotion: "https://www.dailymotion.com/embed/video/",
  youku: "https://player.youku.com/embed/",
  coub: "https://coub.com/embed/",
} as const;

export type VideoProvider = keyof typeof VIDEO_PROVIDERS_URLS;

export const VIDEO_PROVIDERS = Object.keys(
  VIDEO_PROVIDERS_URLS,
) as VideoProvider[];

const getProviderUrl = (provider: VideoProvider, id: string) => {
  return VIDEO_PROVIDERS_URLS[provider] + id;
};

interface VideoData {
  provider?: string;
  id?: string;
}

export const parseVideoUrl = (url: string): EmbedUrlData | undefined => {
  if (!isUrl(url)) return;

  const videoData = videoParser.parse(url) as VideoData;

  if (videoData.provider && videoData.id) {
    const { id, provider } = videoData;

    return {
      id,
      provider,
      url: getProviderUrl(provider as VideoProvider, id),
    };
  }

  return undefined;
};
