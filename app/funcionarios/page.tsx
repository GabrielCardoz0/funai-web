"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { deleteAgent, fetchMyAgents } from "@/services/agents";
import { DataStatus, IAgent } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AgentMoreInfos from "@/components/agentMoreInfo";
import { toastError, toastSuccess } from "@/lib/utils";
import Loading from "@/components/loadingStatus";


export default function Agents() {
  const router = useRouter();
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);

  const fetchAgents = async () => {
    setDataStatus("loading");
    try {
      const response = await fetchMyAgents();
      setAgents(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    } finally {
      setDataStatus("idle")
    }
  }

  useEffect(() => {
    fetchAgents();

    const interval = setInterval(() => fetchAgents(), 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [])

  const handleDeleteAgent = async (id: number) => {
    try {
      await deleteAgent(id);
      setSelectedAgent(null);
      toastSuccess("Funcionário deletado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      toastError("Erro ao deletar funcionário.")
    }
  }

  return (
    <div className="w-full h-full flex">

      <div className="w-[300px] border-r border-gray-200 p-6 space-y-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-lg font-bold">Funcionários</h1>
            <p className="text-gray-500 text-sm">Gerencie seus funcionários de IA.</p>
          </div>
            <Button onClick={() => router.push("funcionarios/create")} className="cursor-pointer w-full">
              <PlusCircle/>
              Novo funcionário
            </Button>
        </div>
        
        {dataStatus === "loading" ? <div className="w-full flex justify-center"><Loading/></div> : (
          <div className="space-y-2">
            {
              agents?.length > 0 && agents.map(agent => (<TesteItem key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} isSelected={selectedAgent?.id === agent.id} />))
            }
          </div>
        )}
      </div>

      <div className="w-[calc(100%-300px)] h-full flex p-6">
        {
          selectedAgent ? (
            <div className="w-full">
              <AgentMoreInfos agent={selectedAgent} handleDeleteAgent={handleDeleteAgent} fetchAgents={fetchAgents} />
            </div>
          ) : (
            <div className="mx-auto my-auto text-center">
              <h1 className="text-lg font-bold">Selecione um funcionário</h1>
              <p className="text-gray-500">Clique em um funcionário para ver mais detalhes.</p>
            </div>
          )
        }
      </div>
    </div>
  );

}

interface TesteItemProps {
  agent: IAgent;
  isSelected: boolean;
  onClick: () => void;
}

const TesteItem = ({ agent, isSelected, ...rest }: TesteItemProps) => {
  return (
    <Card className={`shadow-none py-4 hover:opacity-90 cursor-pointer ${isSelected ? "border-gray-200" : "border-white hover:bg-gray-50"}`} {...rest}>
      <CardContent className="flex items-center gap-4">
        <Image
          src={agent.image}
          alt={""}
          width={60}
          height={60}
          className="rounded-full object-cover border w-[60px] h-[60px]"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{agent.name}</span>
          <span className="text-xs text-gray-500">{agent.is_active ? "Ativo" : "Inativo"}</span>

          <Tooltip delayDuration={1500}>
            <TooltipTrigger asChild>
              <CardDescription className="text-xs text-muted-foreground">
                {agent.description.length > 80 ? `${agent.description.slice(0, 80)}...` : agent.description}
              </CardDescription>
            </TooltipTrigger>

            <TooltipContent className="max-w-md opacity-80">
              <p>{agent.description}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  )
}