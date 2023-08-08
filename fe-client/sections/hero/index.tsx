import { useLocale } from "next-intl";
import { HeroSection } from "./HeroSection";
import { getHeroSectionData } from "./getHeroSectionData";

export default async function Hero() {
  //eslint-disable-next-line
  const locale = useLocale();
  console.log("useLocale().locale: ", locale);

  const heroData = await getHeroSectionData(locale);

  console.log("heroData:", heroData)

  const { Title, Description, Video } = heroData
  const videoSrc = Video


  return (
    <>
      <HeroSection
        title={Title}
        description={Description}
        videoSrc={videoSrc}
      />
    </>
  );
}
