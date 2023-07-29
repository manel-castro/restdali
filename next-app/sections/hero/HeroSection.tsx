"use client";

import Link from "next/link";
import { Button } from "../../components/button.styled";
import { Container } from "../../components/container.styled";
import { Description, Title } from "./components/text.styled";
import { getIsMobile } from "@/utils/isMobile";
import { getLastWordString } from "@/utils/strings";

export const HeroSection = ({
  title = "Invest better",
  description = "Get investment ideas from 30M users and invest in 3,000+ assets on a trusted and friendly platform",
  button = "Start investing",
  buttonLink = "#",
  videoSrc = "//marketing.etorostatic.com/cache1/hp/v_251/videos/cover-hp-06.mp4",
}) => {
  const isMobile = getIsMobile();

  const fractionTitle = getLastWordString(title);
  console.log("fractionTitle: ", fractionTitle);

  if (isMobile) {
    return (
      <Container
        style={{
          backgroundColor: "#000021",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            padding: 15,
            zIndex: 2,
          }}
        >
          <Title $isShadow $color="white">
            {fractionTitle[0]}
          </Title>
          <Title $isShadow $color="white">
            {fractionTitle[1]}
          </Title>

          <Description $isShadow style={{ marginTop: 20 }} $color="white">
            {description}
          </Description>
          <Link href={buttonLink}>
            <Button style={{ marginTop: 20 }}>{button}</Button>
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            height: 300,
            width: "100%",
            zIndex: 1,
            backgroundImage:
              "linear-gradient(to bottom, transparent, #000021 50%)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <video
            // data-poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
            // data-src="//marketing.etorostatic.com/cache1/hp/v_251/videos/cover-hp-06.mp4"
            // data-ll-status="loaded"
            // poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
            autoPlay
            muted
            loop
            src={videoSrc}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          ></video>
        </div>
      </Container>
    );
  } else {
    return (
      <Container
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: 45,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "70%" }}>
            <Title
              style={{
                fontSize: "72px",
                letterSpacing: -5,
                transform: "scale(1, 1.5)",
                lineHeight: "1.7em",
              }}
              $color="black"
            >
              {fractionTitle[0]}
            </Title>
            <Title
              style={{
                fontSize: "92px",
                letterSpacing: -5,
                transform: "scale(1, 1.5)",
                marginBottom: "0.7em",
                fontWeight: "bold",
              }}
              $color="#00cb00"
            >
              {fractionTitle[1]}
            </Title>

            <Description style={{ marginTop: 20 }} $color="black">
              {description}
            </Description>
            <Link href={buttonLink} style={{ marginLeft: 10 }}>
              <Button $large style={{ marginTop: 60 }}>
                {button}
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <video
            // data-poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
            // data-src="//marketing.etorostatic.com/cache1/hp/v_251/videos/cover-hp-06.mp4"
            // data-ll-status="loaded"
            // poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
            autoPlay
            muted
            loop
            src={videoSrc}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          ></video>
        </div>
      </Container>
    );
  }
};
