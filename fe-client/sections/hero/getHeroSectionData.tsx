// "use client";

import { axiosInstanceBackoffice } from "@/axiosInstances";
import { CMSData, InitialField } from "@/utils/interfaces";
import absoluteUrl from 'next-absolute-url'



export const getHeroSectionData = async (locale: string) => {

  // const { protocol, host } = absoluteUrl(req)



  const heroData =
    await axiosInstanceBackoffice.get(
      `/api/backoffice/sections/hero-section/fields/${locale}`
    ).then(res => res.data).catch(e => console.log("error: ", e)) as CMSData[]

  console.log("dbg11 Herodata: ", heroData)


  if (!heroData) {
    return {
      Title: "",
      Description: "",
      Video: ""
    }
  }

  const Title = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-title")?.fieldValue
  const Description = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-description")?.fieldValue
  const Video = heroData[0].initialFields.find((item: InitialField) => item.fieldId === "hero-video")?.fieldValue


  return { Title, Description, Video };
};
