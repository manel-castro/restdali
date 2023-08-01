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

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
        <CardDescription>Introduzca los siguientes campos para crear una cuenta.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label style={{ width: "100%" }}>
          Correo
          <Input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduzca su correo electrónico..."
          />
        </Label>
        <Label style={{ width: "100%" }}>
          Contraseña
          <Input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduzca la contraseña..."
          />
        </Label>
        <Label style={{ width: "100%" }}>
          Repita contraseña
          <Input
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repita la contraseña..."
          />
        </Label>
        <Label style={{ width: "100%" }}>
          Clave de administrador
          <Input
            required
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Introduzca la clave de administrador..."
          />
        </Label>
      </CardContent>
      <CardFooter>
        <Button>Continuar</Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterComponent;
