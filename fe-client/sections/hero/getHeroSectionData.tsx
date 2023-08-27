// "use client";

import { axiosInstanceBackoffice } from "@/axiosInstances";
import { CMSData, InitialField } from "@/utils/interfaces";


export const getHeroSectionData = async (locale: string) => {
  console.log("locale: ", locale)
  const heroData =
    await axiosInstanceBackoffice.get(
      `/api/backoffice/sections/hero-section/fields/${locale}/${window.location.hostname}`
    ).then(res => res.data).catch(e => console.log("error: ", e)) as CMSData[]



  const Title = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-title")?.fieldValue
  const Description = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-description")?.fieldValue
  const Video = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-video")?.fieldValue


  return { Title, Description, Video };
};
