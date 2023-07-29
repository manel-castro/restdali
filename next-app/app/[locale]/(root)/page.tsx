import HeroSection from "@/sections/hero";
import { TabsSection } from "@/sections/tabs";

export default async function Home({}) {
  const order = ["hero", "tabs"];

  return order.map((item) => {
    switch (item) {
      case "hero":
        return <HeroSection />;
      case "tabs":
        return <TabsSection />;
      default:
        return <></>;
    }
  });
}
