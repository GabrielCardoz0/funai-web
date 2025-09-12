'use client';

import { SimpleConfirmDialog } from "@/components/confirmDialog";
import Loading from "@/components/loadingStatus";
import SelectImageInput from "@/components/SelectImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentTemplates, allowedImages, toastError, toastSuccess } from "@/lib/utils";
import { getAgentById, createAgent, uploadFile, deleteFile, updateAgent } from "@/services/agents";
import { DataStatus, IAgent, IAgentCreateInput, IFile } from "@/types";
import { Label } from "@radix-ui/react-label";
import { File, X, Bot, ClipboardList, GraduationCap, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function Page() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("");
  const [image, setImage] = useState<string>(allowedImages[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number, behavior: string, name: string, description: string }>(agentTemplates[0]);
  const [agentBehavior, setAgentBehavior] = useState<string>(agentTemplates[0].behavior);
  const [businessDescription, setBusinessDescription] = useState<string>("");

  const [agent, setAgent] = useState<IAgent | null>(null);

  const [step, setStep] = useState<number>(1);

  const [dataStatus, setDataStatus] = useState<DataStatus>("idle");
  const [pageStatus, setPageStatus] = useState<DataStatus>("idle");
  
  const router = useRouter();
  const params = useParams();

  const isCreate = params.id === "create";
  const agentId = isCreate ? null : Number(params.id);

  useEffect(() => {
    if(isCreate) return;
    
    setPageStatus("loading");

    getAgentById(agentId!)
    .then(res => {
      const agent = res.data as IAgent;
      setAgent(agent);
      setName(agent.name);
      setDescription(agent.description);
      setImage(agent.image);
      setBusinessDescription(agent.business_description);
      setAgentName(agent.agent_name);
      setAgentBehavior(agent.agent_behavior);
      setUploadedFiles(agent.files ?? []);
      
    })
    .catch(err => toastError("Erro ao carregar funcionário. Tente novamente.") && console.error(err))
    .finally(() => setPageStatus("idle"));
  }, [isCreate, agentId]);
  
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCreateAgent = async () => {
    if(step !== 3) {
      return
    }

    const trainingData = new FormData();
    files.forEach((file) => {
      trainingData.append("files", file);
    });

    const payload: IAgentCreateInput = {
      agent_behavior: agentBehavior,
      agent_name: agentName,
      description,
      name,
      image,
      business_description: businessDescription,
    }

    setDataStatus("loading");
    try {
      const createdAgent = await createAgent(payload);
      await uploadFile(createdAgent.data.id, trainingData);
      toastSuccess("Funcionário criado com sucesso!");
      router.push("/funcionarios");
    } catch (error) {
      console.error("Erro:", error);
      toastError("Erro ao criar funcionário. Tente novamente.");
    } finally {
      setDataStatus("idle");
    }
  }

  const handleUpdateAgent = async () => {
    const payload = {
      name,
      description,
      agent_name: agentName,
      agent_behavior: agentBehavior,
      image,
      business_description: businessDescription
    }

    setDataStatus("loading");

    try {
      if (agent?.name !== name || agent?.description !== description || agent?.agent_name !== agentName || agent?.agent_behavior !== agentBehavior || agent.image !== image || agent.business_description !== businessDescription ) {
        await updateAgent(agentId!, payload);
      }

      if (files.length > 0) {
        const trainingData = new FormData();
        files.forEach((file) => {
          trainingData.append("files", file);
        });
        await uploadFile(agentId!, trainingData);
      }

      toastSuccess("Funcionário atualizado com sucesso!");

      router.push("/funcionarios");
    } catch (error) {
      console.error("Erro:", error);
      toastError("Erro ao atualizar funcionário. Tente novamente.");
    } finally {
      setDataStatus("idle");
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dataStatus === "loading") return;
    if(isCreate) {
      return handleCreateAgent();
    } else {
      return handleUpdateAgent();
    }
  };

  const handleRemoveUploadedFile = async (fileId: number) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
      toastSuccess("Arquivo removido com sucesso!");
    } catch (error) {
      toastError("Erro ao remover arquivo. Tente novamente.");
      console.error("Erro ao remover arquivo:", error);
    }
  };

  const disableCreateInput = !name || !description || !agentName || files.length === 0;

  return (
    <div className="p-6">
      {
        pageStatus === "loading" ? (
          <div className="flex items-center justify-center h-screen">
            <Loading />
          </div>
        ) : (
          <form
            className="w-full max-w-6xl border rounded-lg p-4 mx-auto space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">{ isCreate ? "Criar" : "Atualizar" } funcionário</h1>
            </div>

            <div className="w-full flex justify-center text-gray-500 mb-12">
              <Button 
                variant={"ghost"}
                className={`w-[350px] rounded-none text-sm ${step === 1 && "underline text-black"}`}
                onClick={() => setStep(1)}
                type="button"
              >
                <Bot size={30}/>
                Informações do funcionário
              </Button>
              <Button 
                variant={"ghost"}
                className={`w-[350px] rounded-none text-sm ${step === 2 && "underline text-black"}`}
                onClick={() => setStep(2)}
                type="button"
              >
                <ClipboardList/>
                Comportamento do funcionário
              </Button>
              <Button 
                variant={"ghost"}
                className={`w-[350px] rounded-none text-sm ${step === 3 && "underline text-black"}`}
                onClick={() => setStep(3)}
                type="button"
              >
                <GraduationCap/>
                Dados de treino do funcionário
              </Button>
            </div>

            {step === 1 &&
              <Step1
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                isCreate={isCreate}
                agent={agent}
                dataStatus={dataStatus}
                image={image}
                setImage={setImage}
              />
            }

            {step === 2 &&
              <Step2
                agentName={agentName}
                setAgentName={setAgentName}
                agentBehavior={agentBehavior}
                setAgentBehavior={setAgentBehavior}
                isCreate={isCreate}
                agent={agent}
                dataStatus={dataStatus}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                businessDescription={businessDescription}
                setBusinessDescription={setBusinessDescription}
              />
            }

            {step === 3 &&
              <Step3
                files={files}
                setFiles={setFiles}
                handleRemoveFile={handleRemoveFile}
                uploadedFiles={uploadedFiles}
                handleRemoveUploadedFile={handleRemoveUploadedFile}
                isCreate={isCreate}
                dataStatus={dataStatus}
              />
            }

            {isCreate && (
              <div className="flex justify-between mt-16">
                <Label className="text-gray-500">Passo {step} de 3</Label>

                <div>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={step === 1 || dataStatus === "loading"}
                    onClick={() => setStep(step - 1)}
                    className="mr-4"
                    >
                    Voltar
                  </Button>

                  {step !== 3 && (
                    <Button
                    type="button"
                    variant="outline"
                    disabled={step === 3 || dataStatus === "loading"}
                    onClick={() => setStep(step + 1)}
                    className="mr-4"
                  >
                    Próximo
                  </Button>
                )}

                  {step === 3 && (
                    <Button
                      type="submit"
                      variant="default"
                      disabled={(dataStatus === "loading" || disableCreateInput)}
                    >
                      Criar funcionário {dataStatus === "loading" && <Loading />}
                    </Button>
                  )}

                </div>
              </div>
            )}

          </form>
        )
      }
    </div>
  )
};


function FileInput({ setFiles, required }: { setFiles: React.Dispatch<React.SetStateAction<File[]>>, required: boolean }) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter(
        (file) => file.type === "text/plain"
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === "text/plain"
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Label htmlFor="file-upload">Upload de arquivos (somente .txt)</Label>
      <p className="text-xs text-gray-500 py-1">
        Arraste e solte arquivos ou clique para selecionar. Apenas arquivos
        .txt são permitidos.
      </p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full border-dashed border-2 rounded-md py-8 text-gray-500 flex justify-center items-center hover:bg-gray-50 transition-colors gap-4"
      >
        <File size={20}/>

        <div className="text-sm">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <p>Arraste e solte seus arquivos aqui</p>
            <p>ou clique aqui e selecione</p>
          </Label>
        </div>
      </div>

      <Input
        type="file"
        id="file-upload"
        name="file-upload"
        accept=".txt"
        multiple
        onChange={handleFileChange}
        className="hidden"
        //TODO - lembrar de colocar required quando o treinamento de dados etiver implementado
        required={required}
      />
    </div>
  );
  
};


interface Step1Props {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  isCreate?: boolean,
  agent: IAgent | null,
  dataStatus: DataStatus
}

function Step1({ name, setName, description, setDescription, isCreate, agent, dataStatus, image, setImage }: Step1Props) {
  return (
    <div className="space-y-6">

      <div className="w-1/2 mx-auto flex gap-2 items-center text-gray-400 justify-center">
        <div className="w-1/4 border h-0"></div>
        Informações do funcionário
        <div className="w-1/4 border h-0"></div>
      </div>

      <div className="flex justify-between py-2">
        <div>
          <Label>Imagem</Label>
          <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        </div>
        <div className="flex space-x-4">
          <Image
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

      <div>
        <Label htmlFor="name">Nome interno</Label>
        <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Digite o nome"
          className="w-full border rounded-md"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="name">Descrição</Label>
        <p className="text-xs text-gray-500 py-1">Não influencia o funcionário. Apenas para sua organização.</p>
        <Textarea
          id="description"
          name="description"
          placeholder="..."
          className="w-full border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      { agent && !isCreate && (
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={(agent?.name === name && agent?.description === description && agent?.image === image) || dataStatus === "loading"}
          >
            Salvar {dataStatus === "loading" && <Loading />}
          </Button>
        </div>
      )}
    </div>
  );
}

interface Step2Props {
  agentName: string,
  setAgentName: React.Dispatch<React.SetStateAction<string>>,
  agentBehavior: string,
  setAgentBehavior: React.Dispatch<React.SetStateAction<string>>,
  selectedTemplate: { id: number, behavior: string, name: string, description: string },
  setSelectedTemplate: React.Dispatch<React.SetStateAction<{ id: number, behavior: string, name: string, description: string }>>,
  isCreate?: boolean,
  agent: IAgent | null,
  dataStatus: DataStatus,
  businessDescription: string,
  setBusinessDescription: React.Dispatch<React.SetStateAction<string>>,
}

function Step2({ agentName, setAgentName, agentBehavior, setAgentBehavior, isCreate, agent, dataStatus, selectedTemplate, setSelectedTemplate, businessDescription, setBusinessDescription }: Step2Props) {

  const handleSelectTemplate = (template: { id: number, behavior: string, name: string, description: string }) => {
    setSelectedTemplate(template);
    setAgentBehavior(template.behavior);
  };

  return (
    <div className="space-y-6">
      <div className="w-1/2 mx-auto flex gap-2 items-center text-gray-400 justify-center">
        <div className="w-1/4 border h-0"></div>
        Comportamento do funcionário
        <div className="w-1/4 border h-0"></div>
      </div>

      <div>
        <Label htmlFor="agent-name">Nome do funcionário</Label>
        <p className="text-xs text-gray-500 py-1">O funcionário irá se identificar com este nome.</p>
        <Input
          type="text"
          id="agent-name"
          name="agent-name"
          placeholder="Digite o nome do funcionário"
          className="w-full border rounded-md"
          required
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        />
      </div>

      {isCreate && (
        <div>
          <Label htmlFor="agent-name">Template</Label>
          <p className="text-xs text-gray-500 py-1">Selecione um template.</p>

          <div className="grid grid-cols-4 gap-4 mt-2">
            {
              agentTemplates.map((template) => (
                <div
                  className={`p-4 cursor-pointer rounded-md w-full border-2 ${ template.id === selectedTemplate.id ? "border-gray-400" : "border-gray-200" }`}
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <h1 className="text-sm">{template.name}</h1>
                  <p className="text-xs text-gray-500 py-1">{template.description}</p>
                </div>
              ))
            }
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="name">Descrição da empresa</Label>
        <p className="text-xs text-gray-500 py-1">Insira uma breve descrição da sua empresa. Essas instruções serão seguidas em todas as interações do funcionário.</p>
        <Textarea
          id="agent-behavior"
          name="agent-behavior"
          placeholder="..."
          className="w-full border rounded-md h-32"
          required
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="name">Comportamento do funcionário</Label>
        <p className="text-xs text-gray-500 py-1">Essas instruções serão seguidas em todas as interações do funcionário.</p>
        <Textarea
          id="agent-behavior"
          name="agent-behavior"
          placeholder="..."
          className="w-full border rounded-md h-96"
          required
          value={agentBehavior}
          onChange={(e) => setAgentBehavior(e.target.value)}
        />
      </div>

      { agent && !isCreate && (
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={(agent.agent_name === agentName && agent.agent_behavior === agentBehavior && agent.business_description === businessDescription) || dataStatus === "loading"}
          >
            Salvar {dataStatus === "loading" && <Loading />}
          </Button>
        </div>
      )}

    </div>
  )
}


interface Step3Props {
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  handleRemoveFile: (index: number) => void, uploadedFiles: IFile[],
  handleRemoveUploadedFile: (fileId: number) => void,
  isCreate: boolean,
  dataStatus: DataStatus
}

function Step3({  files, setFiles, handleRemoveFile, uploadedFiles, handleRemoveUploadedFile, isCreate, dataStatus }: Step3Props) {

  return (
    <div className="space-y-6">
      <div className="w-1/2 mx-auto flex gap-2 items-center text-gray-400 justify-center">
        <div className="w-1/4 border h-0"></div>
        Treinamento do funcionário  (dados)
        <div className="w-1/4 border h-0"></div>
      </div>

      <FileInput setFiles={setFiles} required={false} />

      <div className="space-y-2">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex gap-4 items-center border-b p-2">
            <File size={16} />
            <span className="text-sm">{file.filename}</span>
            <SimpleConfirmDialog onConfirm={() => handleRemoveUploadedFile(file.id)} onCancel={() => null}>
              <Button type="button" variant="ghost" className="ml-auto">
                <Trash size={16} />
              </Button>
            </SimpleConfirmDialog>
          </div>
        ))}

        {files.map((file, index) => (
          <div
            key={index}
            className="flex gap-4 items-center border-b p-2"
          >
            <File size={16} />

            <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>

            <Button
              type="button"
              variant={"ghost"}
              onClick={() => handleRemoveFile(index)}
              className="ml-auto"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      { !isCreate && (
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={files.length === 0 || dataStatus === "loading"}
          >
            Salvar {dataStatus === "loading" && <Loading />}
          </Button>
        </div>
      )}
    </div>
  )
}