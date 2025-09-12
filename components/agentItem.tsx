import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { DataStatus, IAgent } from "@/types";
import Loading from "./loadingStatus";
import { api } from "@/services/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import { ConfirmDialog, SimpleConfirmDialog } from "./confirmDialog";
import { toastError, toastSuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  agent: IAgent;
  fetchAgents: () => Promise<void>;
}

interface IMessage {
  id: number,
  session_id: string,
  message: {
    type: "ai" | "human",
    content: string,
  }
}

export default function AgentItem({ agent, fetchAgents }: Props) {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loadingSwitch, setLoadinSwitch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeStatus, setActiveStatus] = useState(agent.is_active);
  
  const handleOpenConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleDeleteAgent = async () => {
    try {
      await api.delete(`/agents/${agent.id}`);
      toastSuccess("Funcionário deletado com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      toastError("Erro ao deletar funcionário.")
    }
  }

  const handleActiveAgent = async () => {
    try {
      setLoadinSwitch(true);
      await api.put(`/agents/${agent.id}`, { is_active: !activeStatus });
      toastSuccess(`Funcionário ${activeStatus ? "desativado" : "ativado"} com sucesso!`);
      setActiveStatus(!activeStatus);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
      toastError("Erro ao trocar status funcionário.")
    } finally {
      setLoadinSwitch(false);
    }
  }

  const disconnectAgent = async () => {
    try {
      await api.delete(`/agents/${agent.id}/disconnect/whatsapp`);
      await fetchAgents();
      toastSuccess("Funcionário desconectado com sucesso!");
    } catch (error) {
      console.error("Erro ao desconectar funcionário:", error);
      toastError("Erro ao desconectar funcionário.");
    }
  }
  
  return (
    <Card className="w-full border-0 shadow-none border-b-2 rounded-none">
      <ConfirmDialog open={openConfirm} handleOpenDialog={handleOpenConfirm} onConfirm={() => handleDeleteAgent()} onCancel={() => null} />
      <CardContent className="grid grid-cols-7 gap-4">
        <div className="flex space-x-4 col-span-2">
          <Image
            src="https://www.realfakephotos.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgonca-result.9c196cb2.jpeg&w=2048&q=75"
            alt={agent.name}
            width={80}
            height={80}
            className="rounded-sm object-cover border w-[80px] h-[80px]"
            onClick={() => router.push(`funcionarios/${agent.id}`)}
          />
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>

            <Tooltip delayDuration={1500}>

              <TooltipTrigger asChild>
                <CardDescription className="text-sm text-muted-foreground">
                  {agent.description.length > 80 ? `${agent.description.slice(0, 80)}...` : agent.description}
                </CardDescription>
              </TooltipTrigger>

              <TooltipContent className="max-w-md opacity-80">
                <p>{agent.description}</p>
              </TooltipContent>

            </Tooltip>
          </div>
        </div>

        <div className="flex justify-between col-span-4">
          <PlatformStatus
            name="WhatsApp"
            icon={<FaWhatsapp className="w-4 h-4" />}
            isConnected={agent.is_evo_connected}
            agent={agent}
            fetchAgents={fetchAgents}
            disconnectAgent={disconnectAgent}
          />
        </div>
        
        <div className="flex justify-end col-span-1 gap-4">
          <DropdownMenu open={openDropdown} onOpenChange={() => setOpenDropdown(!openDropdown)}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuItem onClick={() => router.push(`funcionarios/${agent.id}`)}>Editar</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleOpenConfirm}>Deletar</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={loadingSwitch} className="w-full flex justify-between">
                <div className="flex items-center gap-1">
                  Ativar
                  { loadingSwitch && <Loading /> }
                </div>
                <Switch checked={activeStatus} onCheckedChange={handleActiveAgent} className="cursor-pointer" />
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ChatModal agent={agent} />

      </CardContent>
    </Card>
  )
};

function DialogAgentModal({ agent, fetchAgents }: { agent: IAgent, fetchAgents: () => void }) {
  const [qrcode, setQrcode] = useState<{ base64: string } | null>(null);
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const clearIntervalToGetStatus = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const closeModal = () => {
    clearIntervalToGetStatus();
    setQrcode(null);
    setDataStatus("idle");
    setOpen(false);
  }

  const getAgentQrCode = async () => {
    try {
      setDataStatus("loading");
      const res = await api.get(`/agents/${agent.id}/connect/whatsapp`);
      setQrcode(res.data.data);
    } catch (error) {
      toastError("Erro ao buscar QR Code do funcionário.");
      closeModal();
      console.log(error);
    }
    setDataStatus("idle");
  }

  const createIntervalToGetStatus = () => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/agents/${agent.id}/status/whatsapp`);
        const { data } = res.data;
  
        if (data.is_evo_connected) {
          toastSuccess("Funcionário conectado com sucesso!");
          clearInterval(interval);
          setIntervalId(null);
          closeModal();
          fetchAgents();
        }
      } catch (error) {
        console.error("Erro ao verificar status do funcionário:", error);
      }
    }, 5000);
  
    setIntervalId(interval);
  };
  
  const openModal = async () => {
    await getAgentQrCode();
    createIntervalToGetStatus();
    setOpen(true);
    return;
  }
  
  const handleOpenModal = async () => {
    if (open) {
      closeModal();
    } else {
      await openModal();
    }
  }

  useEffect(() => {
    if (!open) {
      clearIntervalToGetStatus();
    }
  }, [open]);
  

  return (
    <Dialog onOpenChange={handleOpenModal} open={open}>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={dataStatus == "loading"}>Conectar {dataStatus == "loading" && <Loading/>}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conecte-se ao whatsapp</DialogTitle>
          <DialogDescription>Escaneie o qrcode para conectar-se ao whatsapp</DialogDescription>
        </DialogHeader>

        {
          dataStatus == "loading" ? ( <Loading />) : (
          <div className="flex flex-col gap-4">
            <p>Abra o app e escaneie o qrcode abaixo para conectar seu funcionário ao whatsapp.</p>
            {qrcode?.base64 &&
            <Image
              width={200}
              height={200}
              src={qrcode?.base64} 
              alt="QR Code" 
              className="h-auto self-center"
            />
            }
          </div>
          )
        }
      </DialogContent>
    </Dialog>
  )
};

function PlatformStatus({ name, icon, isConnected, agent, fetchAgents, disconnectAgent }: { name: string, icon: React.ReactNode, isConnected: boolean, agent: IAgent, fetchAgents: () => void, disconnectAgent: () => Promise<void> }) {

  return (
    <div className="flex gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          {icon}
          <span className="font-medium">{name}</span>
        </div>
        {
          isConnected ? (
            <div className="text-xs text-green-600 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Conectado</div>
          ) : (
            <div className="text-xs text-red-600 flex items-center gap-1"><XCircle className="w-3 h-3" /> Desconectado</div>
          )
        }
      </div>

      <div className="flex justify-end w-full">
        {
          isConnected ? (
            <SimpleConfirmDialog onCancel={() => {}} onConfirm={async () => await disconnectAgent()}>
            <Button variant="ghost">
              Desconectar
            </Button>
            </SimpleConfirmDialog>
          ) : (
            <DialogAgentModal agent={agent} fetchAgents={fetchAgents} />
          )
        }
      </div>
    </div>
  )
};

function ChatModal({ agent }: { agent: IAgent }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setLoadingSend(true);
      setNewMessage("");
      const newMessageObj: IMessage = { id: Date.now(), session_id: String(agent.id), message: { content: newMessage, type: "human" } };
      
      setMessages([...messages, newMessageObj ]);
      
      api.post(`/agents/${agent.id}/chat`, { message: newMessage })
      .then(res => {
        const newMessageAgentObj: IMessage = { id: Date.now(), session_id: String(agent.id), message: { content: res.data.data, type: "ai" } };
        setMessages([...messages, newMessageObj, newMessageAgentObj]);
        setLoadingSend(false);
      })
      .finally(() => setLoadingSend(false));
    }
  };

  useEffect(() => {
    if (!open) return;
    setLoading(true);

    api.get(`/agents/${agent.id}/chat`)
    .then(res => {
      setLoading(false);
      setMessages(res.data.data)
    })
    .finally(() => setLoading(false));
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>chat (teste)</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat com {agent.name}</DialogTitle>
          <DialogDescription>Converse com o funcionário em tempo real.</DialogDescription>
        </DialogHeader>
        {
          !loading ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-64 border p-2 rounded">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className={`p-2 rounded ${msg.message.type === "human" ? "bg-green-100" : "bg-gray-100" }`}>
                    {msg.message.content}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma mensagem ainda.</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 border rounded p-2"
              />
              <Button onClick={handleSendMessage} disabled={loadingSend}>Enviar {loading && <Loading/>}</Button>
            </div>
          </div>
          ) : (
            <Loading />
          )
        }
      </DialogContent>
    </Dialog>
  );
};

