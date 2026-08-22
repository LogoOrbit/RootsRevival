import { en, type Dict } from "./en";
import { ur } from "./ur";

export type Lang = "en" | "ur";

export const dictionaries: Record<Lang, Dict> = { en, ur };

export type { Dict };
