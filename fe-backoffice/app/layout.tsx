import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Cookies from 'js-cookie'

import { Inter } from "next/font/google";
import { ContextProvider } from "@/context/provider";
import { ClerkProvider } from "@clerk/nextjs";

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
        </ContextProvider>
      </body>
    </html>
  );
}
