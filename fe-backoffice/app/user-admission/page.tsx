import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginComponent from "./(components)/login-component"
import RegisterComponent from "./(components)/register-component"

function UserAdmission() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="registrarse">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginComponent />
      </TabsContent>
      <TabsContent value="registrarse">
        <RegisterComponent />
      </TabsContent>
    </Tabs>
  )
}
export default UserAdmission