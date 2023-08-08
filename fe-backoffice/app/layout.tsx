import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Cookies from "js-cookie";

import { Inter } from "next/font/google";
import { ContextProvider } from "@/context/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indive",
  description: "Panel de administración de Indive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <ContextProvider>
          <div style={{ padding: 40, maxWidth: 1150, width: "100%" }}>
            {children}
          </div>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
