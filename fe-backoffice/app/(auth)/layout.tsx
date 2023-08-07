"use client";
import { Navbar } from "@/components/presentational/navbar";
import { useAppContext } from "@/context/provider";
import { getIsAuth } from "@/utils/getIsAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { instance } from "../axiosInstance";
import { ERoleLevel } from "@/context/enums";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { roleLevel, setRoleLevel } = useAppContext();
  console.log("roleLevel: ", roleLevel);

  const router = useRouter();

  useEffect(() => {
    if (!getIsAuth()) {
      router.push("/user-admission");
    }

    (async () => {
      const currentUser = await instance
        .get("/api/users/currentuser")
        .then((res) => {
          console.log("currentuser res: ", res);
          return res.data.currentUser;
        })
        .catch((e) => {
          console.log("currentuser error: ", e);
        });
      console.log("currentUser.data.role: ", currentUser.role);

      setRoleLevel(currentUser.role);
    })();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <Navbar />
      {children}
    </div>
  );
}
