import { Navbar } from "@/components/presentational/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: 40 }}>
      <Navbar />
      {children}
    </div>
  );
}
