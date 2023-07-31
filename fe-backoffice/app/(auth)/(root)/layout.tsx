import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indive - Inicio",
  description: "Incio de Indive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("testing");

  return children;
}
