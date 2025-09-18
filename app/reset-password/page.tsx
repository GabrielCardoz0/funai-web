"use client";

import Loading from "@/components/loadingStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/lib/utils";
import { resetPassword } from "@/services/users";
import { DataStatus } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

export default function ResetPassword() {

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ResetPasswordForm/>
    </Suspense>
  );
}

const ResetPasswordForm = () => {
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();
  
  // eslint-disable-next-line
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDataStatus("loading");

    if(!token) {
      toastError("Solicite um novo link para recuperação da sua senha!");
      setDataStatus("idle");
      return
    }

    try {
      await resetPassword({ password , token });
      toastSuccess("Senha alterada com sucesso!");
      setDataStatus("success");
      // eslint-disable-next-line
    } catch (error: any) {
      console.error(error);
      toastError(error?.response?.data?.message ?? "Erro ao mudar a senha. Tente novamente mais tarde.");
    }
  };

  const samePassword = useMemo(() => {
    return password === repeatPassword;
  }, [password, repeatPassword]);

  return (
    <form className="flex flex-col gap-12 items-center justify-center min-h-screen" onSubmit={handleSubmit}>
      <div>
        <p className="text-3xl font-bold">FUN.AI</p>
        <p>Bem vindo(a)!</p>
      </div>
      {
        dataStatus === "success" ? (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="mx-auto">Senha alterada com sucesso!</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Para continuar, faça login com sua nova senha usando o botão abaixo:
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="cursor-pointer w-full" onClick={() => router.push("/login")} type="button">Login</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Alterar senha</CardTitle>
              <CardDescription>
                Insira sua nova senha para logar com sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>

              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Nova senha</Label>
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
                  {
                  password.length > 0
                  && password.length < 8
                  && <p className="text-red-500 text-xs">A senha deve conter ao menos 8 dígitos</p>
                  }
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Repita nova senha</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="password"
                      type={showRepeatPassword ? "text" : "password"}
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {
                      showRepeatPassword ? (
                        <EyeOff className="cursor-pointer" onClick={() => setShowRepeatPassword(!showRepeatPassword)} />
                      ) : (
                        <Eye className="cursor-pointer" onClick={() => setShowRepeatPassword(!showRepeatPassword)} />
                      )
                    }
                  </div>
                  {
                  password.length > 0
                  && repeatPassword.length > 0
                  && !samePassword
                  && <p className="text-red-500 text-xs">As senha devem coincidir</p>
                  }
                </div>
              </div>

            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full cursor-pointer" disabled={dataStatus === "loading"}>
                Enviar
                {dataStatus === "loading" && ( <Loading /> )}
              </Button>
            </CardFooter>
          </Card>
        )
      }
    </form>
  )
}