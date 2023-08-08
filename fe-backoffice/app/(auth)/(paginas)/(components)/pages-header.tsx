"use client";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/provider";
import { LanguageSelector } from "./language-selector";
import { IAvailableLanguages } from "@/config/available-languages";

interface IPagesHeader {

  languageInUse: IAvailableLanguages | undefined
  setLanguageInUse: React.Dispatch<React.SetStateAction<IAvailableLanguages>>
}
export const PagesHeader: React.FC<IPagesHeader> = ({ languageInUse, setLanguageInUse }) => {

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div>Páginas</div>
        <div>
          <Badge>{languageInUse?.label}</Badge>
        </div>
      </div>
      <div>
        <LanguageSelector
          languageInUse={languageInUse}
          setLanguageInUse={setLanguageInUse}
        />
      </div>
    </div>
  );
};
