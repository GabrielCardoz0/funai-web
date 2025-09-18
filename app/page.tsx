"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChartNoAxesColumn, CheckCircle2, Clock, LightbulbIcon, Milestone, UserRound, Workflow } from "lucide-react";
import Image from "next/image";
import ImageFuncionarioIa from "../public/ia-funcionario.jpeg";
import BannerStep1 from "../public/banner-step1.jpg";
import BannerStep2 from "../public/banner-step2.jpg";
import BannerStep3 from "../public/banner-step3.jpg";
import BannerStep4 from "../public/banner-step4.jpg";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <div className="bg-gray-50">
      <Topbar />

      <div className="mx-auto w-2/3 my-4 space-y-20">
        
        {/* plataforma feita para você */}
        <div className="w-full space-y-20">

          <div className="w-full flex">
            <div className="w-3/5 space-y-12">
              <div className="max-w-xl space-y-8">
                <p className="text-4xl font-medium">Plataforma feita para você criar Funcionários que trabalham por você com inteligência artificial</p>
                <p className="text-gray-600">Contrate Funcionários de Inteligência Artificial prontos para escalar atendimento, vendas e suporte. Sem pausa. Sem férias. Sem erros. Sem desculpas.</p>
              </div>

              <Button
                size={"lg"}
                className="w-xl py-8 text-md"
                onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver planos
              </Button>
            </div>

            <div className="w-2/5 rounded-4xl flex justify-center items-center">
              <Image
                src={ImageFuncionarioIa}
                alt=""
                className="rounded-4xl transition-all duration-1000 ease-out"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-8">

            <div className="text-center rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-md">IA resolve até</p>
              <p className="text-4xl font-bold text-blue-600">93%</p>
              <p className="text-md">dos atendimentos</p>
            </div>

            <div className="text-center rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-md">IA aumenta até</p>
              <p className="text-4xl font-bold text-blue-600">35%</p>
              <p className="text-md">da taxa de conversão</p>
            </div>
            
            <div className="text-center rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-md">IA economiza até</p>
              <p className="text-4xl font-bold text-blue-600">93%</p>
              <p className="text-md">nos custos operacionais</p>
            </div>

          </div>
        </div>

        {/* menos de 5 min */}
        <div className="w-full items-center flex flex-col gap-8">
          <div className="max-w-3xl text-center space-y-4">
            <p className="text-4xl font-medium">Crie um Agente de IA e conecte no WhatsApp em menos de 5 minutos</p>
            <p className="text-gray-600">Nossos Funcionários de IA operam em múltiplos canais, 24/7, sem descanso. Eles pensam, tomam decisões e executam tarefas com precisão.</p>
          </div>
          <Button
            size={"lg"}
            className="w-xl py-8 text-md" 
            onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Começar agora
          </Button>
        </div>

        {/* ideal para */}
        <div className="w-full items-center flex flex-col gap-8">
          <div className="max-w-3xl text-center space-y-4">
            <p className="text-4xl font-medium">A FUN.AI é ideal para</p>
          </div>

          <div className="w-full grid grid-cols-3 gap-8 text-gray-800">
            <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-blue-600"><Workflow size={40}/></p>
              <p className="text-xl font-medium">Agências que querem <span className="text-blue-600">automatizar seu negócio</span></p>
            </div>

            <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-blue-600"><LightbulbIcon size={40}/></p>
              <p className="text-xl font-medium">Empreendedores que querem <span className="text-blue-600">transformar ideias em produtos e serviços</span> inovadores com IA</p>
            </div>

            <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
              <p className="text-blue-600"><ChartNoAxesColumn size={40}/></p>
              <p className="text-xl font-medium">Empresas que querem <span className="text-blue-600">escalar o suporte e vendas</span> atuando com funcionário de IA</p>
            </div>
          </div>

        </div>

        {/* o que é um fun.ai */}
        <div className="flex w-full gap-12">
          <div className="bg-blue-400 rounded-2xl w-full min-h-[700px]"></div>

          <div className="w-full space-y-8">
            <div className="max-w-3xl text-start space-y-4">
              <p className="text-4xl font-medium">O que é um funcionário de IA?</p>
              <p className="text-gray-600">Funcionários de IA são como ter um {"'ChatGPT'"} da sua empresa. Eles entendem e respondem aos clientes, executam tarefas e trabalham 24/7 para o seu negócio.</p>
            </div>

            <div className="w-full grid grid-cols-2 grid-rows-2 gap-8 text-gray-800">
              <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
                <p className="text-blue-600"><UserRound size={40}/></p>
                <p className="text-xl font-medium">Age como se fosse um humano</p>
                <p className="text-sm text-gray-600">Transforme a experiência do seu cliente com um atendimento natural e humanizado, que está sempre disponível.</p>
              </div>

              <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
                <p className="text-blue-600"><Workflow size={40}/></p>
                <p className="text-xl font-medium">Realiza tarefas automáticas</p>
                <p className="text-sm text-gray-600">Deixe os processos repetitivos por conta do IA e libere sua equipe para focar no que realmente importa.</p>
              </div>

              <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
                <p className="text-blue-600"><Clock size={40}/></p>
                <p className="text-xl font-medium">Busca informações em tempo real</p>
                <p className="text-sm text-gray-600">Responda aos clientes com precisão e velocidade, com informações da sua empresa e produtos sempre atualizadas.</p>
              </div>

              <div className="text-start rounded-xl shadow-md bg-white p-8 space-y-4 mx-auto w-full">
                <p className="text-blue-600"><Milestone size={40}/></p>
                <p className="text-xl font-medium">Toma decisões e resolve problemas </p>
                <p className="text-sm text-gray-600">Permita que a IA decida o que fazer, resolvendo problemas sem necessidade de intervenção e aumentando a eficiência.</p>
              </div>

            </div>

            <Button
              size={"lg"}
              className="w-xl py-8 text-md"
              onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver planos
            </Button>
          </div>
        </div>
        
        {/* grid com funcionalidades */}
        <div className="w-full space-y-8">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Se um já é bom, imagine um time de funcionários de IA</p>
              <p className="text-gray-600">Conheça alguns dos cargos que os Funcionários de IA da FUN.AI podem ocupar:</p>
            </div>

            <div className="grid grid-cols-4 grid-rows-5 w-full gap-4">
              <div className="p-2 text-gray-700">
                <p className="text-lg font-medium">Suporte</p>
              </div>
              <div className="p-2 text-gray-700">
                <p className="text-lg font-medium">Atendente</p>
              </div>
              <div className="p-2 text-gray-700">
                <p className="text-lg font-medium">Vendedor</p>
              </div>
              <div className="p-2 text-gray-700">
                <p className="text-lg font-medium">Social Media</p>
              </div>


              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Responde dúvidas</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Agenda reuniões</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Qualifica leads</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Responde DMs</p>
              </div>


              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Resolve problemas</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Envia lembretes</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Faz ofertas diretas</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Responde comentários</p>
              </div>


              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Orienta usuários</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Coleta informações</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Recupera compras</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Gerencia todas as interações</p>
              </div>


              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Envia links e instruções</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Passa para humano</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Fecha vendas</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700">
                <CheckCircle2 className="text-blue-600" />
                <p>Atende em segundos</p>
              </div>
            </div>
        </div>

        {/* primeira vez com fun.ai */}
        <div className="w-full space-y-16 flex flex-col">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">É sua primeira vez com funcionários de IA? Comece a partir de templates prontos!</p>
            </div>

            <Button
              size={"lg"}
              className="mx-auto w-xl py-8 text-md"
              onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Começar agora
            </Button>

            <div className="grid grid-cols-3 gap-8">
              <div className="w-full bg-white h-[600px] rounded-2xl p-8">
                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">Genérico</h2>
                  <p className="text-gray-600">Um agente completamente personalizável para as necessidades do seu negócio.</p>
                </div>
              </div>
              <div className="w-full bg-white h-[600px] rounded-2xl p-8">
                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">SDR (Vendas)</h2>
                  <p className="text-gray-600">Processos pré-determinados para tirar dúvidas, qualificar leads e fazer agendamentos.</p>
                </div>
              </div>
              <div className="w-full bg-white h-[600px] rounded-2xl p-8">
                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">Suporte N1</h2>
                  <p className="text-gray-600">Tenta resolver primeiro e, se não conseguir, passa para humano.</p>
                </div>
              </div>
            </div>
        </div>

        {/* integrados com o whatsapp */}
        <div className="w-full space-y-8 flex flex-col items-center">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Seus funcionários de IA integrados com o whatsapp</p>
              <p className="text-gray-600">Automatize processos onde quer que seus clientes estejam com a integração nativa com WhatsApp. Crie e comece a usar!</p>
            </div>
            <Button
              size={"lg"}
              className="w-xl py-8 text-md"
              onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >Ver planos</Button>
        </div>

        {/* how to create fast */}
        <div className="w-full space-y-8">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Crie seu primeiro funcionário de IA de forma rápida</p>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-8">
              <div className="w-full p-8 flex flex-col justify-between gap-8">
                <div className="mx-auto space-y-4">
                  <h2 className="text-2xl font-medium">1. Preencha as informações</h2>
                  <p className="text-gray-600">Selecione uma boa imagem e preencha os campos com as informações para sua organização.</p>
                </div>
                  <Image
                    src={BannerStep1}
                    alt=""
                  />
                {/* <div className="w-full h-[500px] bg-white rounded-2xl p-8 flex justify-center">
                </div> */}
              </div>
              <div className="w-full p-8 flex flex-col justify-between gap-8">
                <div className="mx-auto space-y-4">
                  <h2 className="text-2xl font-medium">2. Selecione um template e Defina o cargo</h2>
                  <p className="text-gray-600">Selecione um template e escolha um nome, coloque uma breve descrição da sua empresa e descreva o objetivo do Funcionário de IA, como faria em uma vaga de emprego, defina tom de voz, e instruções gerais.</p>
                </div>
                <Image
                  src={BannerStep2}
                  alt=""
                />
              </div>
              <div className="w-full p-8 flex flex-col justify-between gap-8">
                <div className="mx-auto space-y-4">
                  <h2 className="text-2xl font-medium">3. Ensine sobre seus produtos/serviços</h2>
                  <p className="text-gray-600">Suba arquivos, descrevendo mais detalhadamente sua empresa, explique processos e coloque perguntas e respostas para treinar seu Funcionário de IA.</p>
                </div>
                <Image
                  src={BannerStep3}
                  alt=""
                />
              </div>
              <div className="w-full p-8 flex flex-col justify-between gap-8">
                <div className="mx-auto space-y-4">
                  <h2 className="text-2xl font-medium">4. Conecte ao whatsapp</h2>
                  <p className="text-gray-600">Com seu funcionário criado, agora basta conectá-lo ao whatsapp via QR code, e ele seguirá suas instruções com precisão.</p>
                </div>
                <Image
                  src={BannerStep4}
                  alt=""
                />
              </div>
            </div>


        </div>

        {/* mais que chatbots */}
        <div className="w-full space-y-8 flex flex-col items-center">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Muito mais do que chatbots tradicionais</p>
              <p className="text-gray-600">Funcionários de IA não são apenas chatbots. Eles respondem por áudio, gerenciam calendário, recuperam carrinhos abandonados e muito mais. Tudo o que você precisa para engajar e converter mais.</p>
            </div>
            <Button
              size={"lg"}
              className="w-xl py-8 text-md"
              onClick={() => document?.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver planos
            </Button>
        </div>

        {/* video */}
        <div className="w-full space-y-8 flex flex-col items-center">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Por que agora é o melhor momento para você dominar os {'"Funcionários de Inteligência Artificial"'}</p>
            </div>
            <iframe
              width="800"
              height="450"
              src="https://www.youtube.com/embed/SWOp9WOjfIs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </div>

        {/* @TODO */}
        {/* <p>Depoimentos (depois)</p> */}

        {/* planos */}
        <div id="planos" className="w-full space-y-16 flex flex-col">
            <div className="max-w-3xl text-center space-y-4 mx-auto">
              <p className="text-4xl font-medium">Contrate o melhor funcionário da sua empresa por menos que um estagiário</p>
            </div>

            <div className="grid grid-cols-3 gap-8">

              <div className="w-full bg-white h-[600px] rounded-2xl p-8 space-y-8">

                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">Básico</h2>
                  <p className="text-3xl font-bold">R$ 119,90<span className="text-lg text-gray-400">/mês</span></p>
                  <Button
                    size={"lg"}
                    className="w-8/10 py-6 text-md mt-4"
                    onClick={() => window.location.href = "https://buy.stripe.com/test_eVqaEY8Ty1Pjfszbtba3u03"}
                  >
                    Assinar
                  </Button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p>1 funcionário de IA</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p>2 instâncias Whatsapp</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p>Dashboard completa</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p>Atendimento em segundos</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                    <p>Acesso a futuras atualizações sem custo adicional</p>
                  </div>
                </div>

              </div>
              
              <div className="w-full bg-white h-[600px] rounded-2xl p-8 space-y-8">

                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">Professional</h2>
                  <p className="text-3xl font-bold">R$ 297,00<span className="text-lg text-gray-400">/mês</span></p>
                  <Button
                    size={"lg"}
                    className="w-8/10 py-6 text-md mt-4"
                    onClick={() => window.location.href = "https://buy.stripe.com/test_bJedRa7Pudy1gwD9l3a3u02"}
                  >
                    Assinar
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2-600" />
                    <p>Envia links e instruções</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2-600 w-6 h-6 flex-shrink-0" />
                    <p>Passa para humano</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2-600 w-6 h-6 flex-shrink-0" />
                    <p>Fecha vendas</p>
                  </div> */}
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>5 Funcionários de IA</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>10 instâncias Whatsapp</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Dashboard completa</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Atendimento em segundos</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Acesso a futuras atualizações sem custo adicional</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white h-[600px] rounded-2xl p-8 space-y-8">

                <div className="text-center mx-auto space-y-2">
                  <h2 className="text-xl font-medium">Empresarial</h2>
                  <p className="text-3xl font-bold">R$ 990,00<span className="text-lg text-gray-400">/mês</span></p>
                  <Button
                    size={"lg"}
                    className="w-8/10 py-6 text-md mt-4"
                    onClick={() => window.location.href = "https://buy.stripe.com/test_dRmfZigm0bpTdkr2WFa3u01"}
                  >
                    Assinar
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Envia links e instruções</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Passa para humano</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Fecha vendas</p>
                  </div> */}
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Funcionários de IA <b>ilimitados</b></p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Instâncias Whatsapp <b>ilimitadas</b></p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Dashboard completa</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Atendimento em segundos</p>
                  </div>
                  <div className="flex gap-2 p-2 text-gray-700 items-start">
                    <CheckCircle2 className="text-blue-600  w-6 h-6 flex-shrink-0" />
                    <p>Acesso a futuras atualizações sem custo adicional</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-12 w-full justify-center">
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700 items-start w-60 text-start">
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                <p>Cancele quando quiser</p>
              </div>
              <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700 items-start w-60 text-start">
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                <p>Suporte 24h</p>
              </div>
              {/* <div className="flex gap-2 shadow-md bg-white p-4 rounded-md text-gray-700 items-start w-60 text-start">
                <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                <p>Acesso liberado a comunidade</p>
              </div> */}
            </div>
        </div>
        
        <FAQ/>

      </div>

      <Footer/>
    </div>
  );
};



function Topbar() {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between py-4 px-12 mb-10">
      <div className="text-3xl font-bold">FUN.AI</div>
      <div className="flex gap-4">
        <Button variant="link">Documentação</Button>
        <Button variant="link" onClick={() => router.push("/login")}>Login</Button>
      </div>
    </div>
  );
};

function Footer() {
  return (
    <div className="h-40 w-full bg-gray-900">

    </div>
  );
};


const FAQQuestions: { question: string; answer: string }[] = [
  {
    question: "Qual plano escolher?",
    answer:
      "O principal ponto é definir quantos atendimentos seu funcionário de IA fará por mês. Em média, consideramos 8-10 mensagens por atendimento, mas isso pode variar dependendo do nicho. Além disso, a quantidade de caracteres para treinar o Cérebro refere-se ao volume de informações que você pode inserir nos documentos para treinar seu IA.",
  },
  {
    question: "Quais as formas de pagamento disponíveis? Posso pagar por PIX?",
    answer:
      "A FUN.AI funciona como um serviço de assinatura, então os pagamentos são aceitos apenas por cartão de crédito.\n\nNosso time ainda está estudando como viabilizar pagamentos por Pix ou boleto bancário; infelizmente, eles não estão disponíveis no momento.",
  },
  {
    question: "Os funcionários de IA funcionam no Whatsapp?",
    answer:
      "Sim! Seus Funcionários de IA podem atender, prestar suporte e até realizar vendas no WhatsApp, e essa funcionalidade está disponível em todos os planos.\n\nPara usar no WhatsApp comum, o processo é super rápido: em poucos segundos, você conecta o IA escaneando um QR code via API não oficial.\n\nA FUN.AI ainda não dá suporte API oficial do whatsapp, mas nosso time está estudando a viabilidade desta funcionalidade.",
  },
  {
    question: "Posso ter mais de um funcionário de IA na mesma conta?",
    answer:
      "Sim, você pode! Cada plano inclui um número específico de Funcionários de IA.",
  },
  // {
  //   question: "Preciso esperar até o final do meu teste para assinar um plano pago?",
  //   answer:
  //     "Não. Você pode selecionar um plano e inserir informações de cobrança a qualquer momento durante o teste.",
  // },
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade do seu plano a qualquer momento. A alteração é aplicada imediatamente e ajustada na próxima cobrança.",
  },
  {
    question: "Como faço para cancelar minha conta?",
    answer:
      "Para cancelar sua conta FUN.AI vá na aba 'Minha conta' no menu lateral, ao final da página haverá o botão 'Cancelar minha assinatura'. Preencha os campos solicitados, e sua assinatura será cancelada imediatamente, mas você poderá utilizar a plataforma até o final do período vigente.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Atualmente aceitamos apenas cartão de crédito.",
  },
  {
    question: "Quantos funcionários de IA posso criar?",
    answer:
      "Isso depende do seu plano. No Básico você pode criar 1 funcionário, no Profissional até 3, e no Empresarial a quantidade é personalizada.",
  },
  {
    question: "Em quantas instâncias (whatsapp) posso conectar meu funcionário?",
    answer:
      "Isso depende do seu plano. No Básico você pode utilizar até 2 instâncias, no Profissional até 4, e no Empresarial a quantidade é personalizada.",
  },
  {
    question: "Posso treinar meu funcionário de IA com dados próprios?",
    answer:
      "Sim, você pode adicionar informações personalizadas no painel de configuração do seu funcionário para deixá-lo mais adaptado ao seu negócio, isso é o recomendável. Esse processo pode ser feito durante a criação do funcionário na aba 'Funcionários' > 'Novo funcionário', ou editando um funcionário já criado na aba 'Funcionários' > Selecione o funcionário desejado > 3 pontos no topo da tela à direita > 'editar' ",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer:
      "Você pode enviar uma mensagem contando o problema que teve na plataforma direto para o nosso email de suporte 'suporte@kumotecnologia.com' ou entrar em contato atráves do botão ao final desta página.",
  },
];

function FAQ() {
  return (
    <div>
      {/* <h2 className="text-lg font-bold mb-4">Perguntas Frequentes</h2> */}

      <div className="max-w-3xl text-center space-y-4 mx-auto">
        <p className="text-4xl font-medium mb-4">Perguntas frequentes</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        
        {
          FAQQuestions.map((item, i) => (
          <AccordionItem value={i.toString()} key={i}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            {/* <AccordionContent>{item.answer}</AccordionContent> */}
            <AccordionContent>
              {item.answer.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-2 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  )
}