
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Textarea } from "./ui/textarea";
import { DataStatus, IAgent, IBlackList, IInstance, IWhiteList } from "@/types";
import { Label } from "./ui/label";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { EllipsisVertical, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog, SimpleConfirmDialog } from "./confirmDialog";
import { createBlackListItem, createInstance, createWhiteListItem, deleteBlackListItem, deleteInstance, deleteWhiteListItem, getAgentById, getInstanceConnectStatus, getInstanceQrCode, updateAgent, updateInstance } from "@/services/agents";
import { toastError, toastSuccess } from "@/lib/utils";
import Loading from "./loadingStatus";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import SelectImageInput from "./SelectImageInput";


function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) {
    return "";
  } else if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
}


const AgentMoreInfos = ({ agent, handleDeleteAgent, fetchAgents }: { agent: IAgent, handleDeleteAgent: (id: number) => void, fetchAgents: () => Promise<void> }) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [agentInfo, setAgentInfo] = useState<IAgent | null>(null);
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");

  const handleOpenConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const fetchAgent = async () => {
    setDataStatus('loading');
    try {
      fetchAgents();
      const res = await getAgentById(agent.id)
      setAgentInfo(res.data);
      setDataStatus('idle');
    } catch (error) {
      toastError("Erro ao buscar informações do funcionário.");
      setDataStatus('error');
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAgent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent])

  return (
    <Card className="shadow-none max-w-6xl mx-auto">
      {dataStatus === "error" && (
        <CardContent className="text-center">
          <p className="text-red-500">Erro ao carregar informações do funcionário.</p>
        </CardContent>
      )}

      {dataStatus === "loading" && (
        <div className="flex justify-center items-center h-96">
          <Loading />
        </div>
      )}
      
      {dataStatus !== "loading" && agentInfo && (
        <>
        <ConfirmDialog open={openConfirm} handleOpenDialog={handleOpenConfirm} onConfirm={() => handleDeleteAgent(agent.id)} onCancel={() => null} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Configurações</CardTitle>

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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator className="my-4"/>
          </CardHeader>

          <CardContent className="space-y-4">

            <AgentInfo agent={agentInfo!} fetchAgent={fetchAgent} />

            <Separator className="my-8"/>

            <AgentGeneralConfig agent={agentInfo!} refetch={fetchAgent} />

            <Separator className="my-8"/>

            <AgentFastConfig agent={agentInfo!} onRefresh={fetchAgent} />

            <Separator className="my-8"/>

            <AgentLists agent={agentInfo!} />

          </CardContent>
        </>
      )}
      
    </Card>
  );
};

export default AgentMoreInfos;



const AgentInfo = ({ agent, fetchAgent }: { agent: IAgent, fetchAgent: () => Promise<void> }) => {
  const [name, setName] = useState<string>(agent.name);
  const [description, setDescription] = useState<string>(agent.description);
  const [image, setImage] = useState<string>(agent.image);

  const disableButton = name === agent.name && description === agent.description && agent.image === image;

  const handleUpdateAgent = async () => {
    try {
      await updateAgent(agent.id, { name, description, image });
      await fetchAgent();
      toastSuccess("Funcionário atualizado com sucesso!");
    } catch {
      toastError("Erro ao atualizar funcionário.");
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-500">Informações do funcionário</Label>

      <div className="flex justify-between py-2">
        <div>
          <Label>Imagem</Label>
          <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        </div>
        <div className="flex space-x-4">
          <Image
            // src="https://www.realfakephotos.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgonca-result.9c196cb2.jpeg&w=2048&q=75"
            src={image}
            alt={""}
            width={60}
            height={60}
            className="rounded-full object-cover border w-[60px] h-[60px]"
          />
          <div>
            <p className="text-gray-500 text-xs">Tamanho: 250px x 250px</p>
            <SelectImageInput image={image} setImage={setImage} />
          </div>
        </div>
      </div>

      <div className="flex justify-between py-2">
        <div>
          <Label>Nome interno</Label>
          <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        </div>
        <Input
          type="text"
          value={name}
          readOnly
          className="max-w-md border rounded-md"
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="flex justify-between py-2">
        <div>
          <Label>Descrição do funcionário</Label>
          <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        </div>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="max-w-md h-30 border rounded-md"
        />
      </div>

      <div className="w-full flex justify-end">
        <Button disabled={disableButton} onClick={handleUpdateAgent}>
          Salvar alterações
        </Button>
      </div>
    </div>
  )
}

const AgentGeneralConfig = ({ agent, refetch }: { agent: IAgent, refetch: () => Promise<void> }) => {
  const [agentIsActive, setAgentIsActive] = useState<boolean>(agent.is_active);

  const handleActiveAgent = async () => {
    try {
      await updateAgent(agent.id, { is_active: !agentIsActive });
      setAgentIsActive(!agentIsActive);
      await refetch();
      toastSuccess("Funcionário atualizado com sucesso!");
    } catch(error) {
      console.log(error);
      toastError("Erro ao atualizar funcionário.");
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-500">Configurações gerais</Label>

      <div className="flex justify-between py-2">
        <div>
          <Label>Funcionário ativo/inativo</Label>
          <p className="text-xs text-gray-500 py-1">Caso esteja inativo, o funcionário nunca irá responder.</p>
        </div>

        <Switch checked={agentIsActive} onCheckedChange={handleActiveAgent} className="cursor-pointer" />
      </div>

      {/* <div className="flex justify-between py-2">
        <div>
          <Label>Testar conversa</Label>
          <p className="text-xs text-gray-500 py-1">Utilize o botão de teste para abrir uma conversa de testes com o seu funcionário.</p>
        </div>

        <Button>Abrir chat (teste)</Button>
      </div> */}

    </div>
  )
}

const AgentFastConfig = ({ agent, onRefresh }: { agent: IAgent, onRefresh: () => Promise<void> }) => {
  const [instances, setInstances] = useState(agent.instances ?? []);
  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");

  useEffect(() => {
    setInstances(agent.instances ?? [])
  }, [agent])
  
  const handleAddInstance = async () => {
    try {
      setDataStatus("loading");
      const res = await createInstance(agent.id);
      setInstances([...instances, res.data]);
      toastSuccess("Instância criada com sucesso!");
    } catch (error) {
      toastError("Erro ao criar instância.");
      console.error(error);
    } finally {
      setDataStatus("idle");
    }
  }

  const handleRemoveInstance = async (id: number) => {
    try {
      await deleteInstance(id);
      setInstances(instances.filter(item => item.id !== id))
      toastSuccess("Instância removida com sucesso!");
    } catch {
      toastError("Erro ao remover instância.");
    }
  }

  const handleDisableInstance = async (id: number, is_disable: boolean) => {
    try {
      await updateInstance(id, { is_disable });
      setInstances(instances.map(item => ( item.id === id ? {...item, is_disable } : item )))
      toastSuccess(`Instância ${ is_disable ? "desabilitada" : "habilitada" } com sucesso!`);
    } catch {
      toastError("Erro ao remover instância.");
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-500">Configurações rápidas de conexão</Label>
      <div className="py-2">
        <div>
          <Label>Instâncias</Label>
          {/* <p className="text-xs text-gray-500 py-1">Conexões do seu funcionário com outras aplicações, como o whatsapp.</p> */}
          <p className="text-xs text-gray-500 py-1">Conexões do seu funcionário com o whatsapp.</p>
        </div>
        <div  className="space-y-2">
          <Table>
            <TableBody>
              {
                instances && instances.length > 0 ?
                instances.map((instance) => (
                  <TableRow key={instance.id} className="text-sm">
                    <TableCell>{instance.type ?? "Whatsapp"}: {instance.name ?? instance.id}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-4 justify-end">
                        {instance.is_connected ? "Conectado" : "Desconectado"}
                        <ConnectAgentModal instance={instance} onConnected={onRefresh} />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-4 justify-end">
                        {instance.is_disable ? "Desabilitada" : "Habilitada"}
                        <Switch checked={!instance.is_disable} onCheckedChange={() => handleDisableInstance(instance.id, !instance.is_disable)} className="cursor-pointer" />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-end">
                        <SimpleConfirmDialog onConfirm={() => handleRemoveInstance(instance.id)} onCancel={() => {}}>
                          <Button variant="destructive" size="sm">Deletar</Button>
                        </SimpleConfirmDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )) :
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Nenhuma instância conectada.
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>
        <div className="w-full mt-4">
          <Button variant={"outline"} size={"sm"} onClick={handleAddInstance}>{dataStatus === "loading" ? (<Loading/>) : (<PlusCircle/>)}Adicionar instância</Button>
        </div>
      </div>
    </div>
  );
}

const AgentLists = ({ agent }: { agent: IAgent }) => {
  const [blackListItem, setBlackListItem] = useState<string>('');
  const [whiteListItem, setwhiteListItem] = useState<string>('');

  const [blackList, setBlackList] = useState<IBlackList[]>(agent.black_list ?? []);
  const [whiteList, setwhiteList] = useState<IWhiteList[]>(agent.white_list ?? []);

  const [blackListStatus, setBlackListStatus] = useState<DataStatus>('idle');
  const [whiteListStatus, setwhiteListStatus] = useState<DataStatus>('idle');

  const handleAddBlackList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setBlackListStatus('loading');
      const { data } = await createBlackListItem({ agent_id: agent.id, contact: blackListItem });
      toastSuccess("Novo item adicionado à lista negra!");
      setBlackListItem('');
      setBlackListStatus('idle');
      setBlackList([...blackList, data]);
    } catch {
      toastError("Erro ao adicionar item à lista negra.");
    } finally {
      setBlackListStatus('idle');
    }
  }

  const handleAddWhiteList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setwhiteListStatus('loading');
      const { data } = await createWhiteListItem({ agent_id: agent.id, contact: whiteListItem });
      toastSuccess("Novo item adicionado à lista branca!");
      setwhiteListItem('');
      setwhiteListStatus('idle');
      setwhiteList([...whiteList, data]);
    } catch {
      toastError("Erro ao adicionar item à lista branca.");
    } finally {
      setwhiteListStatus('idle');
    }
  }


  const handleDeleteBlackItem = async (id: number) => {
    try {
      setBlackListStatus('loading');
      await deleteBlackListItem(id);
      setBlackList(blackList.filter(item => item.id !== id));
      toastSuccess("Item removido com sucesso!");
    } catch {
      toastError("Erro ao remover item.");
    } finally {
      setBlackListStatus('idle');
    }
  }

  const handleDeleteWhiteItem = async (id: number) => {
    try {
      setwhiteListStatus('loading');
      await deleteWhiteListItem(id);
      setwhiteList(whiteList.filter(item => item.id !== id));
      toastSuccess("Item removido com sucesso!");
    } catch {
      toastError("Erro ao remover item.");
    } finally {
      setwhiteListStatus('idle');
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-500">Configurações rápidas de listas</Label>
      <div className="flex gap-24">
        <div className="w-[450px]">
          <Label>Lista negra</Label>
          <p className="text-xs text-gray-500 py-1">Adicione números que o funcionário deve ignorar.</p>

          <div className="py-4 space-y-2">
            {
              agent.black_list && blackList.length > 0 ?
              blackList.map((item) => (
              <div key={"black-list"+item.id} className="text-sm flex items-center gap-4 w-full justify-between">
                <span>{item.contact}</span>
                <SimpleConfirmDialog onConfirm={() => handleDeleteBlackItem(item.id)} onCancel={() => {}}>
                  <Button variant={"destructive"} size={"sm"}><Trash/></Button>
                </SimpleConfirmDialog>
              </div>
              )) :
              <div className="text-sm text-gray-500">Nenhum número adicionado.</div>
            }
          </div>

          <div className="flex">
            <Input
              type="text"
              placeholder="Adicionar número "
              value={blackListItem}
              onChange={(e) => setBlackListItem(formatPhone(e.target.value))}
              className="w-full border rounded-r-none rounded-l-md"
              disabled={blackListStatus === 'loading'}
            />
            <Button
              variant={"outline"}
              className="rounded-l-none rounded-r-md"
              disabled={blackListStatus === "loading"}
              onClick={handleAddBlackList}
            >
              {blackListStatus === 'loading' ? <Loading/> : <PlusCircle/>} adicionar
            </Button>
          </div>
          
        </div>

        <div className="w-[450px]">
          <Label>Responder apenas para:</Label>
          <p className="text-xs text-gray-500 py-1">Adicione números caso queira que o funcionário responda apenas eles.</p>

          <div className="py-4 space-y-2">
            {
                agent.white_list && whiteList.length > 0 ?
                whiteList.map((item) => (
                <div key={"black-list"+item.id} className="text-sm flex items-center gap-4 w-full justify-between">
                  <span>{item.contact}</span>
                  <SimpleConfirmDialog onConfirm={() => handleDeleteWhiteItem(item.id)} onCancel={() => {}}>
                    <Button variant={"destructive"} size={"sm"}><Trash/></Button>
                  </SimpleConfirmDialog>
                </div>
                )) :
                <div className="text-sm text-gray-500">Nenhum número adicionado.</div>
              }
          </div>

          <div className="flex">
            <Input
              type="text"
              placeholder="Adicionar número "
              value={whiteListItem}
              // onChange={(e) => setwhiteListItem(e.target.value)}

              onChange={(e) => setwhiteListItem(formatPhone(e.target.value))}
              className="w-full border rounded-r-none rounded-l-md"
              disabled={whiteListStatus === 'loading'}
            />
            <Button
              variant={"outline"}
              className="rounded-l-none rounded-r-md"
              disabled={whiteListStatus === 'loading'}
              onClick={handleAddWhiteList}
            >
            {whiteListStatus === 'loading' ? <Loading/> : <PlusCircle/>} adicionar
            </Button>
          </div>
          
        </div>

      </div>
    </div>
  );
}

function ConnectAgentModal({
  instance,
  onConnected,
}: {
  instance: IInstance;
  onConnected?: () => Promise<void>;
}) {
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

  const getQrCode = async () => {
    const res = await getInstanceQrCode(instance.id);
    setQrcode(res.data);
  }

  const createIntervalToGetStatus = () => {
    const interval = setInterval(async () => {
      try {
        const { data } = await getInstanceConnectStatus(instance.id);  
        if (data.is_connected) {
          clearInterval(interval);
          setIntervalId(null);
          if (onConnected) await onConnected();
          toastSuccess("Funcionário conectado com sucesso!");
          closeModal();
        }
      } catch (error) {
        console.error("Erro ao verificar status do funcionário:", error);
      }
    }, 5000);
  
    setIntervalId(interval);
  };
  
  const openModal = async () => {
    try {
      setDataStatus("loading");
      await getQrCode();
      createIntervalToGetStatus();
      setOpen(true);
      return;
    } catch (error) {
      toastError("Erro ao buscar QR Code do funcionário.");
      console.error(error);
      return;
    } finally {
      setDataStatus("idle");
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  

  return (
    <Dialog onOpenChange={handleOpenModal} open={open}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" disabled={instance.is_connected}>Conectar {dataStatus == "loading" && <Loading/>}</Button>
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