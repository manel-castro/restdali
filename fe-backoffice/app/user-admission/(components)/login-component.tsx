"use client";
import axios from 'axios'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, {
    message: "La constraseña tiene que tener por lo menos 7 caracters.",
  }),
})


const LoginComponent = () => {
  const [errors, setErrors] = useState([])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const login = await axios.post("/sign-in", values)


      console.log("login: ", login)

    } catch (e) {

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Introduce tu cuenta para entrar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      // required
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introduce tu correo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      // required
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introduce tu contraseña..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button>Continuar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginComponent;
