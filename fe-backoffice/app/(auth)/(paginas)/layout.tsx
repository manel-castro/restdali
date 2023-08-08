
"use client"
import { Separator } from "@/components/ui/separator";
import { PagesHeader } from "./(components)/pages-header";
import { Metadata } from "next";
import { useAppContext } from "@/context/provider";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { languageInUse, setLanguageInUse } = useAppContext();

  return (
    <>
      <PagesHeader
        languageInUse={languageInUse} setLanguageInUse={setLanguageInUse}
      />
      <Separator style={{ marginTop: 20, marginBottom: 10 }} />
      {languageInUse && children}
    </>
  );
}
