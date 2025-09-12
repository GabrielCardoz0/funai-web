"use client";

import Loading from "@/components/loadingStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/lib/utils";
import { forgotPassword } from "@/services/users";
import { DataStatus } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setDataStatus("loading");
    try {
      await forgotPassword(email);
      setDataStatus("success");
      toastSuccess("Link enviado!");
      // eslint-disable-next-line
    } catch (error: any) {
      console.error(error);
      toastError(error?.response?.data?.message ?? "Erro ao enviar token. Tente novamente mais tarde.");
      setDataStatus("error");
    }
  };

  return (
    <form className="flex flex-col justify-center items-center gap-12 min-h-screen" onSubmit={handleSubmit}>

      <div>
        <p className="text-3xl font-bold">FUN.AI</p>
        <p>Bem vindo(a)!</p>
      </div>
      {
        dataStatus === "success" ? (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="mx-auto">Email enviado com sucesso!</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Verifique sua caixa de entrada. Enviamos um email com o link para recuperação da sua senha.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button variant="link" className="cursor-pointer" onClick={() => router.push("/")} type="button">Voltar para a página inicial</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Insira seu email</CardTitle>
              <CardDescription>
                Insira seu email abaixo para receber o link de recuperação
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
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full cursor-pointer" disabled={dataStatus === "loading"}>
                Enviar
                {dataStatus === "loading" && ( <Loading /> )}
              </Button>

              <Button variant="link" className="cursor-pointer" onClick={() => router.push("/")} type="button">Faça login</Button>
            </CardFooter>
          </Card>

        )
      }
    </form>
  );
};
