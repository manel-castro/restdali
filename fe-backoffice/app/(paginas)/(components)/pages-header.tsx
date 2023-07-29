"use client";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/provider";
import { LanguageSelector } from "./language-selector";

export const PagesHeader = () => {
  const { languageInUse, setLanguageInUse } = useAppContext();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div>Páginas</div>
        <div>
          <Badge>{languageInUse.label}</Badge>
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
