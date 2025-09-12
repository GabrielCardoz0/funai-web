"use client";

import Loading from "@/components/loadingStatus";
import { TermosEPoliticas } from "@/components/TermosEPoliticas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/contexts/userContext";
import { toastError, toastSuccess } from "@/lib/utils";
import { cancelSubscription, updatePassword, updateUser } from "@/services/users";
import { IUser } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Account() {
  const { user, fetchMe } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }
  , [user]);

  const handleUpdateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser({ name, email });
      fetchMe();
      toastSuccess("Conta atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      toastError("Erro ao atualizar conta. Tente novamente mais tarde.");
    }
  }

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if(newPassword !== repeatNewPassword) {
        return toastError("As novas senhas não coincidem.");
      }

      await updatePassword({ currentPassword: password, newPassword });

      toastSuccess("Senha atualizada com sucesso!");
      setPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
      setShowPassword(false);
      setShowNewPassword(false);
      setShowRepeatNewPassword(false);
    } catch (error) {
      console.log(error);
      toastError("Erro ao atualizar senha. Tente novamente mais tarde.");
    }
  }


  return (
    <div className="p-6">
      <Card>
        <CardHeader>
            <div>
              <h1 className="text-lg font-bold">Minha conta</h1>
              <p className="text-gray-500 text-sm">Altere ou edite as informações da sua conta.</p>
            </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleUpdateAccount}>
            <Label className="text-gray-500">Informações da conta</Label>

            <div className="flex justify-between py-2">
              <div>
                <Label>Nome</Label>
                <p className="text-xs text-gray-500 py-1">Nome do responsável pela conta.</p>
              </div>
              <Input
                type="text"
                value={name}
                className="max-w-md border rounded-md"
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="flex justify-between py-2">
              <div>
                <Label>Email</Label>
                <p className="text-xs text-gray-500 py-1">Endereço de email para login e comunicações administrativas.</p>
              </div>
              <Input
                type="text"
                value={email}
                className="max-w-md border rounded-md"
                onChange={e => setEmail(e.target.value)}
                disabled
              />
            </div>

            <div className="w-full flex justify-end">
              <Button disabled={user?.name === name && user?.email === email}>Salvar alterações</Button>
            </div>
          </form>

          <Separator className="my-6" />

          <form className="space-y-4" onSubmit={handleUpdatePassword}>
            <div>
              <Label className="text-gray-500">Alterar senha</Label>
            </div>

            <div className="flex justify-between py-2">
              <div>
                <Label>Senha atual</Label>
                <p className="text-xs text-gray-500 py-1">Digite sua senha atual para validar a alteração.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  className="max-w-md border rounded-md"
                  onChange={e => setPassword(e.target.value)}
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

            <div className="flex justify-between py-2">
              <div>
                <Label>Nova senha</Label>
                <p className="text-xs text-gray-500 py-1">Crie uma nova senha com pelo menos 4 caracteres.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  className={`max-w-md border rounded-md ${ newPassword !== repeatNewPassword && "border-red-500"}`}
                  onChange={e => setNewPassword(e.target.value)}
                />

                {
                  showNewPassword ? (
                    <EyeOff className="cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)} />
                  ) : (
                    <Eye className="cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)} />
                  )
                }

              </div>
            </div>

            <div className="flex justify-between py-2">
              <div>
                <Label>Repetir nova senha</Label>
                <p className="text-xs text-gray-500 py-1">Confirme sua nova senha.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={showRepeatNewPassword ? "text" : "password"}
                  required
                  value={repeatNewPassword}
                  className={`max-w-md border rounded-md ${ newPassword !== repeatNewPassword && "border-red-500"}`}
                  onChange={e => setRepeatNewPassword(e.target.value)}
                />

                {
                  showRepeatNewPassword ? (
                    <EyeOff className="cursor-pointer" onClick={() => setShowRepeatNewPassword(!showRepeatNewPassword)} />
                  ) : (
                    <Eye className="cursor-pointer" onClick={() => setShowRepeatNewPassword(!showRepeatNewPassword)} />
                  )
                }

              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button disabled={ Boolean(!password || newPassword.length < 4 || newPassword !== repeatNewPassword)}>Alterar senha</Button>
            </div>
          </form>

          <Separator className="my-6" />

          {/* <div className="space-y-4">
            <div>
              <Label className="text-gray-500">Minha assinatura</Label>
            </div>
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-500">Pagamentos realizados</Label>
            </div>
          </div> */}
          
          {/* <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <Label>Preferências</Label>
              <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
            </div>

            <div className="flex justify-between py-2">
              <div>
                <Label>IDIOMA</Label>
                <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
              </div>
              <Input
                type="text"
                className="max-w-md border rounded-md"
              />
            </div>
            <div className="flex justify-between py-2">
              <div>
                <Label>FUSO HORÁRIO</Label>
                <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
              </div>
              <Input
                type="text"
                className="max-w-md border rounded-md"
              />
            </div>
            <div className="flex justify-between py-2">
              <div>
                <Label>NOTIFICAÇÕES</Label>
                <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
              </div>
              <Input
                type="text"
                className="max-w-md border rounded-md"
              />
            </div>
          </div> */}

          {/* <Separator className="my-6" /> */}

          <div className="space-y-4">
            <div>
              <div>
                <Label className="text-gray-500">Termos de uso e políticas de privacidade</Label>
                <p className="text-xs text-gray-500 py-1">Consulte os termos de uso da plataforma e nossa política de privacidade.</p>
              </div>
                <Dialog>
                  <DialogTrigger>
                    <p className="text-xs text-blue-400 py-1 underline cursor-pointer">Termos de uso e políticas de privacidade.</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Termos de uso e políticas de privacidade</DialogTitle>
                      <DialogDescription>
                        <TermosEPoliticas />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 flex w-full justify-between items-center">
            <div>
              <Label className="text-gray-500">Cancelar minha conta</Label>
              <p className="text-xs text-gray-500 py-1">Exclui permanentemente sua conta e dados associados. Esta ação é irreversível.</p>
              
              {user?.is_deleted && <p className="text-xs text-red-500 py-1">Sua assinatura foi cancelada.</p>}
            </div>

            <CancelSubscriptionModal user={user!} fetchMe={fetchMe} />

          </div>

        </CardContent>
      </Card>
    </div>
  )
};


function CancelSubscriptionModal({ user, fetchMe }: { user: IUser, fetchMe: () => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await cancelSubscription({ password, reason });
      toastSuccess(response?.data?.message ?? "Sua assinatura foi cancelada.");
      fetchMe();
      setOpen(false);
      //eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      toastError(error?.response?.data?.message ?? "Não foi possível concluir o processo. Por favor tente novamente mais tarde ou entre em contato com nosso suporte!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={user?.is_deleted}>
          Cancelar assinatura
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar assinatura</DialogTitle>
          <DialogDescription>Tem certeza que deseja cancelar sua assinatura?</DialogDescription>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="flex flex-col justify-between py-2">
              <div>
                <Label>Motivo</Label>
                <p className="text-xs text-gray-500 py-1">Nos diga o motivo do cancelamento.</p>
              </div>
              <Input
                type="text"
                value={reason}
                className="max-w-md border rounded-md"
                onChange={e => setReason(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col justify-between py-2">
              <div>
                <Label>Senha</Label>
                <p className="text-xs text-gray-500 py-1">Confirme sua senha para cancelar a assinatura.</p>
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

            <Button className="w-full mt-8" disabled={loading || user?.is_deleted}>Confirmar {loading && <Loading/>}</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}