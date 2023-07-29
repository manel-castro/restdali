"use client";

import sp from "@/assets/sp.png";
import uk from "@/assets/uk.png";
import { Container } from "@/components/container.styled";
import Image from "next/image";
import LanguageSelector from "./components/languageSelector";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const NavbarSection = ({ locale }: { locale: string }) => {
  const availableLanguages = [
    {
      name: "Español",
      code: "es",
      image: <Image src={sp} width={30} height={20} alt="flag of sp" />,
    },
    {
      name: "English",
      code: "en",
      image: <Image src={uk} width={30} height={20} alt="flag of uk" />,
    },
  ];

  const router = useRouter();

  return (
    <Container style={{ justifyContent: "space-between" }}>
      <div>Logo and menu</div>
      <div
        onClick={() => {
          router.push("contact");
        }}
      >
        Contacto
      </div>
      <div>
        <LanguageSelector
          currentLanguage={locale}
          availableLanguages={availableLanguages}
        />
      </div>
    </Container>
  );
};

export default NavbarSection;
