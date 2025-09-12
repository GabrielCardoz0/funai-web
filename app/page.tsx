"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthToken from "@/hooks/useLocalstorage";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Loading from "@/components/loadingStatus";
import { toastError } from "@/lib/utils";
import { useUser } from "@/contexts/userContext";
import { getMe } from "@/services/users";
import { DataStatus } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";


export default function Login() {
  const [email, setEmail] = useState("gabriel.scardozo7@gmail.com");
  const [password, setPassword] = useState("835a82d7");
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useUser();
  const { saveToken, token } = useAuthToken();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDataStatus("loading");
    try {
      const res = await login({ email, password });

      saveToken(res.data.token);

      setUser(res.data.user);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toastError("Erro ao realizar login. Verifique suas credenciais.");
    } finally {
      setDataStatus("idle");
    }
  };

  useEffect(() => {
    if(token){
      if(user) {
        router.push("/dashboard");
      } else {
        getMe()
        .then(res => {
          setUser(res.data);
          router.push("/dashboard");
        })
      }
    }
  }, [])

  return (
    <form className="flex justify-center items-center min-h-screen flex-col gap-12" onSubmit={handleSubmit}>
      <div>
        <p className="text-3xl font-bold">FUN.AI</p>
        <p>Bem vindo(a)!</p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Faça login com a sua conta</CardTitle>
          <CardDescription>
            Entre com seu email abaixo para logar em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jose@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={"/forgot-password"}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {
                  showPassword ? (
                    <EyeOff className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <Eye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                  )
                }
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer" disabled={dataStatus === "loading"}>
            Login
            {dataStatus === "loading" && ( <Loading /> )}
          </Button>

          {/* <Button variant="link" className="cursor-pointer">Cadastre-se</Button> */}
        </CardFooter>
      </Card>
    </form>
  );
}