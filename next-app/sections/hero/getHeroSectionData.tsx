"use server";

import axios from "axios";
import i18next from "i18next";
import nextIntl, { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export const getHeroSectionData = async (locale: string) => {
  const heroData = (
    await axios.get(
      `http://localhost:1337/api/hero?locale=${locale}&populate=*`
    )
  ).data;

  console.log(heroData);

  return heroData;
};
