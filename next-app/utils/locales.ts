"use client";

export const locales = ["en", "es"];

export const changeLocale = async (
  lang: string,
  availableLocales: string[]
) => {
  let currentPathname = window.location.pathname;

  for (const availableLocale of availableLocales) {
    if (currentPathname.includes(`/${availableLocale}`)) {
      currentPathname = currentPathname.replace(
        `/${availableLocale}`,
        `/${lang}`
      );
      return window.location.replace(currentPathname);
    }
  }
  currentPathname = "/" + lang + currentPathname;

  return window.location.replace(currentPathname);
};
