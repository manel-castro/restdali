import { Separator } from "@/components/ui/separator";
import { PagesHeader } from "./(components)/pages-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indive - Páginas",
  description: "Visualizar y editar páginas de Indive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PagesHeader />
      <Separator style={{ marginTop: 20, marginBottom: 10 }} />
      {children}
    </>
  );
}
