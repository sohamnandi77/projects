import type {
  InsertNodesOptions,
  TEditor,
  TElement,
} from "@udecode/plate-common";
import type { languages, Token, tokenize } from "prismjs";

export interface Prism {
  Token: typeof Token;
  languages: typeof languages;
  tokenize: typeof tokenize;
}

export interface TCodeBlockElement extends TElement {
  lang?: string;
}

export interface CodeBlockInsertOptions<E extends TEditor = TEditor> {
  defaultType?: string;
  insertNodesOptions?: Omit<InsertNodesOptions<E>, "match">;
}
