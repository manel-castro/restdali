
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>

}
