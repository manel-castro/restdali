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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <div style={{ padding: 40 }}>{children}</div>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
