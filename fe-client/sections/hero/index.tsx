import { useLocale } from "next-intl";
import { HeroSection } from "./HeroSection";
import { getHeroSectionData } from "./getHeroSectionData";

export default async function Hero() {
  //eslint-disable-next-line
  const locale = useLocale();
  const heroData = await getHeroSectionData(locale);

  const { Title, Description, Video } = heroData.data.attributes;
  const videoSrc = "http://localhost:1337" + Video.data.attributes.url;

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
