import { Button } from "@/components/button.styled";
import Link from "next/link";
import { useState } from "react";
import { Description } from "./text.styled";

const mockTabs = [
  {
    tabName: "Stocks",
    imgElement: (
      <img
        src="//marketing.etorostatic.com/cache1/hp/v_251/images/instruments/t2bg.jpg"
        alt=""
        style={{ objectFit: "cover", height: "100%" }}
      />
    ),
    description1: "Invest in your favourite stocks.",
    description2: " Enjoy 0% commission and fractional shares",
    button: "Start investing",
    buttonLink: "#",
  },
  {
    tabName: "Crypto",
    imgElement: (
      <img
        src="//marketing.etorostatic.com/cache1/hp/v_251/images/instruments/t2bg.jpg"
        alt=""
        style={{ objectFit: "cover", height: "100%" }}
      />
    ),
    description1: "Buy crypto on an easy-to-use platform. ",
    description2:
      "Bitcoin, Ethereum, and 60+ other cryptoassets at your fingertips",
    button: "Start investing",
    buttonLink: "#",
  },
];

export const Tabs = ({ tabs = mockTabs }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].tabName);

  const currentTabData = mockTabs.find((tab) => tab.tabName === currentTab);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", width: "100%", maxWidth: 500 }}>
        {tabs.map((tab, index) => {
          const isActive = tab.tabName === currentTab;
          return (
            <div
              key={index}
              style={{
                padding: 10,
                width: `${100 / tabs.length}%`,
                ...(isActive
                  ? { borderBottom: "2px solid white" }
                  : { borderBottom: "1px solid #777777" }),
              }}
              onClick={() => {
                setCurrentTab(tab.tabName);
              }}
            >
              {tab.tabName}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <div
          style={{ height: "400px", display: "flex", justifyContent: "center" }}
        >
          {currentTabData?.imgElement}
        </div>
        <div>
          <div>
            <Description style={{ fontWeight: "bold", color: "white" }}>
              {currentTabData?.description1}
            </Description>
            <Description style={{ color: "white" }}>
              {currentTabData?.description2}
            </Description>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link href={currentTabData?.buttonLink || ""}>
              <Button $outline>{currentTabData?.button}</Button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
