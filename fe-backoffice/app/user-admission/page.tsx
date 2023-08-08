"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginComponent from "./(components)/login-component";
import RegisterComponent from "./(components)/register-component";
import { useAppContext } from "@/context/provider";
import { ERoleLevel } from "@/context/enums";

function UserAdmission() {
  const { roleLevel } = useAppContext();

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger
          value="registrarse"
        // disabled={roleLevel !== ERoleLevel.SUPERADMIN}
        >
          Registrarse
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginComponent />
      </TabsContent>
      <TabsContent value="registrarse">
        <RegisterComponent />
      </TabsContent>
    </Tabs>
  );
}
export default UserAdmission;
