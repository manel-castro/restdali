"use client";
import { instance } from "@/app/axiosInstance";
import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, {
    message: "La constraseña tiene que tener por lo menos 7 caracters.",
  }),
});

const LoginComponent = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoadingSubmit(true);
    try {
      const login = await instance.post("/api/users/signin", values);

      router.push("/");
      console.log("login: ", login);
    } catch (e) {
      const error = e as any;
      console.log("error login ing:", e);
      const errors = error.response.data.errors;
      if (!errors) {
        return toast({
          variant: "destructive",
          title: "Oh!, algo ha ido mal.",
          description: "Ha habido un problema con la petición (error 001)",
        });
      }

      return toast({
        variant: "destructive",
        title: "Oh!, algo ha ido mal.",
        description: errors[0].message + " (error 002)",
      });
    } finally {
      setIsLoadingSubmit(false);
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
            <Button style={{ width: 150 }} disabled={isLoadingSubmit}>
              {isLoadingSubmit ? <Spinner /> : "Continuar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginComponent;
