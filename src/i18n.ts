const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  ru: () => import("./locales/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  } else {
    return dictionaries["en"]();
  }
};

export type Dictionary = {
  signin: string;
  signup: string;
  logoAlt: string;
};
