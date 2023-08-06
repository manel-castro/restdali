"use client";
import { Navbar } from "@/components/presentational/navbar";
import { useAppContext } from "@/context/provider";
import axios from "axios";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { roleLevel, setRoleLevel } = useAppContext();
  console.log("roleLevel: ", roleLevel);

  useEffect(() => {
    (async () => {
      const currentUser = await axios.get("/api/users/currentuser");
      console.log("currentUser.data.role: ", currentUser.data.role);
      setRoleLevel(currentUser.data.role);
    })();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <Navbar />
      {children}
    </div>
  );
}
