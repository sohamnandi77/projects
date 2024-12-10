export enum ListStyleType {
  ArabicIndic = "arabic-indic",
  Armenian = "armenian",
  Bengali = "bengali",
  Cambodian = "cambodian",
  Circle = "circle",
  CjkDecimal = "cjk-decimal",
  CjkEarthlyBranch = "cjk-earthly-branch",
  CjkHeavenlyStem = "cjk-heavenly-stem",
  Decimal = "decimal",
  DecimalLeadingZero = "decimal-leading-zero",
  Devanagari = "devanagari",
  Disc = "disc",
  DisclosureClosed = "disclosure-closed",
  DisclosureOpen = "disclosure-open",
  EthiopicNumeric = "ethiopic-numeric",
  Georgian = "georgian",
  Gujarati = "gujarati",
  Gurmukhi = "gurmukhi",
  Hebrew = "hebrew",
  Hiragana = "hiragana",
  HiraganaIroha = "hiragana-iroha",
  Inherit = "inherit",
  Initial = "initial",
  JapaneseFormal = "japanese-formal",
  JapaneseInformal = "japanese-informal",
  Kannada = "kannada",
  Katakana = "katakana",
  KatakanaIroha = "katakana-iroha",
  Khmer = "khmer",
  KoreanHangulFormal = "korean-hangul-formal",
  KoreanHanjaFormal = "korean-hanja-formal",
  KoreanHanjaInformal = "korean-hanja-informal",
  Lao = "lao",
  LowerAlpha = "lower-alpha",
  LowerArmenian = "lower-armenian",
  LowerGreek = "lower-greek",
  LowerLatin = "lower-latin",
  LowerRoman = "lower-roman",
  Malayalam = "malayalam",
  Mongolian = "mongolian",
  Myanmar = "myanmar",
  None = "none",
  Oriya = "oriya",
  Persian = "persian",
  SimpChineseFormal = "simp-chinese-formal",
  SimpChineseInformal = "simp-chinese-informal",
  Square = "square",
  Tamil = "tamil",
  Telugu = "telugu",
  Thai = "thai",
  Tibetan = "tibetan",
  TradChineseFormal = "trad-chinese-formal",
  TradChineseInformal = "trad-chinese-informal",
  UpperAlpha = "upper-alpha",
  UpperArmenian = "upper-armenian",
  UpperLatin = "upper-latin",
  UpperRoman = "upper-roman",
}

export const ULIST_STYLE_TYPES = [
  ListStyleType.Disc,
  ListStyleType.Circle,
  ListStyleType.Square,
  ListStyleType.DisclosureOpen,
  ListStyleType.DisclosureClosed,
] as const;
