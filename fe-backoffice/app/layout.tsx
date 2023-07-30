import { Navbar } from "@/components/presentational/navbar";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContextProvider } from "@/context/provider";

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
          <div style={{ padding: 40 }}>
            <Navbar />
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
