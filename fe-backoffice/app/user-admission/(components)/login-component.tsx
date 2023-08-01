"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Introduce tu cuenta para entrar.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label style={{ width: "100%" }}>
          Correo
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your email..."
          />
        </Label>
        <Label style={{ width: "100%" }}>
          Contraseña
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your password..."
          />
        </Label>
      </CardContent>
      <CardFooter>
        <Button>Continuar</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginComponent;
