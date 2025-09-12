"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { User, PhoneCall, CreditCard, Bot, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";


export default function Ajuda() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
            <div>
              <h1 className="text-lg font-bold">Central de ajuda e suporte</h1>
              <p className="text-gray-500 text-sm">Estamos aqui para te ajudar!</p>
            </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 w-full gap-8 py-8">
            <CardItem
              Icon={User}
              title="Minha conta"
              description="Gerencie sua conta e altere informações pessoais"
              route="/minha-conta"
            />
            <CardItem
              Icon={CreditCard}
              title="Assinatura e pagamento"
              description="Veja detalhes do seu plano e suas faturas"
              route="/assinatura"
            />
            <CardItem
              Icon={Bot}
              title="Funcionários de IA"
              description="Configure, edite ou remova seus funcionários de inteligência artificial"
              route="/funcionarios"
            />
            <CardItem
              Icon={BookOpen}
              title="Tutoriais (indisponível)"
              description="Acesse guias e vídeos para começar a usar a FUN.AI com facilidade"
              route="/ajuda"
            />
            {/* <CardItem
              Icon={User}
              title="Suporte Técnico"
              description="Precisa de ajuda? Entre em contato com nossa equipe"
            /> */}
          </div>

          <Separator className="my-12"/>

          <FAQ/>

          <Separator className="my-12"/>
          
          <SuporteDireto/>

        </CardContent>
      </Card>

    </div>
  )
};


interface HelpGridItemProps {
  // eslint-disable-next-line
  Icon: any,
  title: string,
  description: string,
  route: string,
}

const CardItem = ({ description, Icon, title, route } : HelpGridItemProps) => {
  const router = useRouter();

  return (
    <Card className="gap-0 w-xs mx-auto p-8 cursor-pointer hover:opacity-85" onClick={() => router.push(route)}>
      <CardHeader className="flex flex-col items-center">
        <Icon size={36} className={"text-gray-600"}/>
        <h1 className="text-sm">{title}</h1>
        <Separator className="bg-gray-200 h-[2px] w-1/4 my-4" />
      </CardHeader>
      <CardContent className="flex justify-center h-12">
        <p className="text-xs text-gray-500 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}


const FAQQuestions: { question: string; answer: string }[] = [
  {
    question: "Como redefinir minha senha?",
    answer:
      "Caso não tenha acesso a plataforma, você pode redefinir sua senha acessando a tela de login e clicando em 'Esqueci minha senha'. Um link será enviado para seu e-mail cadastrado. Caso esteja logado, pode ir na aba 'Minha conta' e definir uma nova.",
  },
  {
    question: "Como alterar meu e-mail de login?",
    answer:
      "Não é possível atualizar o seu email de login através da plataforma pois tratamos cada email como único. Entre em contato com nosso suporte ao final da página caso seja necessário.",
  },
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
  // {
  //   question: "Quais formas de pagamento são aceitas?",
  //   answer:
  //     "Atualmente aceitamos cartão de crédito e PIX. Em breve também boleto.",
  // },
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
    question: "Como conectar meu WhatsApp à FUN.AI?",
    answer:
      "No painel, vá em Integrações > WhatsApp e siga o passo a passo para gerar a conexão via API oficial.",
  },
  // {
  //   question: "Minha integração com o WhatsApp parou, o que fazer?",
  //   answer:
  //     "Isso pode acontecer se o token expirar. Basta gerar um novo no painel e reconectar sua conta. Se persistir, contate o suporte.",
  // },
  {
    question: "Como entro em contato com o suporte?",
    answer:
      "Você pode enviar uma mensagem contando o problema que teve na plataforma direto para o nosso email de suporte 'suporte@kumotecnologia.com' ou entrar em contato atráves do botão ao final desta página.",
  },
];

function FAQ() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        
        {
          FAQQuestions.map((item, i) => (
          <AccordionItem value={i.toString()} key={i}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  )
}

function SuporteDireto() {
  return (
    <Card className="text-center text-xs">
      <CardHeader className="flex flex-col items-center gap-2">
        <PhoneCall size={20} />
        <h2 className="font-semibold">Ainda precisa de ajuda?</h2>
        <p className="text-gray-500">Nossa equipe está pronta para te ajudar com qualquer dúvida ou problema.</p>
      </CardHeader>

      <CardContent className="flex justify-center">
        <a
          href="https://wa.me/+5511989442271?text=Olá! Preciso de ajuda."
          target="_blank"
          className="bg-green-500 hover:bg-green-600 text-white rounded-sm p-2 font-semibold"
        >
          Falar com o suporte
        </a>
      </CardContent>
    </Card>
  );
}