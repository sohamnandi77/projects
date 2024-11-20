export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const LOCALS = [
  { title: "Auto", value: "" },
  { title: "Arabic (United Arab Emirates)", value: "ar-AE" },
  { title: "English (United States)", value: "en-US" },
  { title: "Hindi (India) - Indian Calendar", value: "hi-IN-u-ca-indian" },
  { title: "Hindi (India)", value: "hi-IN" },
  { title: "Portuguese (Brazil)", value: "pt-BR" },
  { title: "Japanese (Japan)", value: "ja-JP" },
  { title: "Korean (Korea)", value: "ko-KR" },
  { title: "Spanish (Spain)", value: "es-ES" },
  { title: "Indonesian (Indonesia)", value: "id-ID" },
  { title: "Vietnamese (Vietnam)", value: "vi-VN" },
];
