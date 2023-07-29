"use client";

import { Button } from "@/components/button.styled";
import { Container } from "@/components/container.styled";
import { Description, Title } from "./components/text.styled";
import { Tabs } from "./components/tabs";

export const TabsSection = ({
  title = "Diversify your portfolio",
  description = "Discover thousands of assets, share ideas, discuss strategies and beyond",
  tabs = [],
}) => {
  return (
    <Container
      style={{
        backgroundColor: "#000021",
        color: "white",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          padding: 15,
          zIndex: 1,
          maxWidth: 500,
          marginBottom: 30,
        }}
      >
        <Title style={{ marginBottom: 30 }} $color="white">
          {title}
        </Title>

        <Description style={{ color: "#6bf5c0" }} $color="white">
          {description}
        </Description>
      </div>
      <div
        style={{
          top: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <Tabs />
      </div>
    </Container>
  );
};
