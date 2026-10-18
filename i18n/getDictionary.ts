import type en from "@/messages/en.json";

export const locales = ["en", "id", "ja"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  id: () => import("@/messages/id.json").then((m) => m.default),
  ja: () => import("@/messages/ja.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
