"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { convertStripeToBrl, toastError } from "@/lib/utils";
import { getSubscription } from "@/services/users";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ISubscription } from "@/types";

export default function Planos() {

  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  const getMySubscription = async () => {
    try {
      const response = await getSubscription();

      setSubscription(response);
    } catch (error) {
      console.log(error);
      toastError('Erro ao carregar seu plano. Tente novamente mais tarde.');
    }
  }

  useEffect(() => { getMySubscription() }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
            <div>
              <h1 className="text-lg font-bold">Minha assinatura</h1>
              <p className="text-gray-500 text-sm">Confira os detalhes da sua assinatura e faturas.</p>
            </div>
        </CardHeader>

        <CardContent>

          <div>
            <Label className="text-gray-500">Plano atual</Label>
            <Separator className="my-4 h-0.5 bg-gray-200 w-full mx-auto"/>
            <div className="space-y-8">
              <div>
                <p className="text-md font-medium">Plano: {subscription?.plan?.name}</p>
                <p className="text-sm text-gray-800">{convertStripeToBrl(subscription?.plan?.price ?? 0)} por mês</p>
                <p className="text-sm text-gray-500 mt-2">Assinatura feita em {moment(subscription?.created_at).format("DD/MM/YYYY")}</p>
              </div>
              <div>
                {/* <Button size={"lg"} disabled>atualizar plano</Button> */}
              </div>
            </div>
          </div>

          <Separator className="my-20"/>

          <div>
            <Label className="text-gray-500">Histórico de faturas</Label>
            <Separator className="my-4 h-0.5 bg-gray-200 w-full mx-auto"/>
            <Table>
              <TableBody>
                <TableHeader className="grid grid-cols-4">
                  <TableHead className="mx-auto">Data</TableHead>
                  <TableHead className="mx-auto">Valor (R$)</TableHead>
                  <TableHead className="mx-auto">Plano</TableHead>
                  <TableHead className="mx-auto">Status</TableHead>
                </TableHeader>
                {
                  subscription?.invoices?.map((invoice) => (
                    <TableRow className="grid grid-cols-4" key={invoice.id}>
                      <TableCell className="mx-auto">{moment(invoice.created_at).format("DD/MM/YYYY")}</TableCell>
                      <TableCell className="mx-auto">{convertStripeToBrl(invoice.amount)}</TableCell>
                      <TableCell className="mx-auto">{invoice.plan_name}</TableCell>
                      <TableCell className="mx-auto">{invoice.status}</TableCell>
                    </TableRow>
                  ))
                }

                {
                  subscription?.invoices?.length === 0 && (
                    <TableRow>
                      <TableCell className="text-center" colSpan={4}>Nenhuma fatura encontrada.</TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </div>



        </CardContent>
      </Card>
    </div>
  )
};
