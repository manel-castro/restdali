
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {children}
    </div>
  )
}
