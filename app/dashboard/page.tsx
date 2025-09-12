"use client";

import Loading from "@/components/loadingStatus";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { convertToBrl, toastError } from "@/lib/utils";
import { getDashboard } from "@/services/dashboard";
import { DashboardInfo, DataStatus } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { InfoIcon, ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Dashbord() {
  const [dataStatus, setDataStatsus] = useState<DataStatus>('idle');
  const [dashboardData, setDashboardData] = useState<DashboardInfo | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"30" | "90" | "180" | "365">("30");

  const fetchMetrics = async (days: number) => {
    try {
      setDashboardData(null);
      setDataStatsus('loading');
      const { data } = await getDashboard(days);

      setDashboardData(data);
      setDataStatsus('idle');
    } catch (error) {
      toastError("Ocorreu um erro ao buscar os dados do dashboard");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMetrics(Number(selectedTimeRange));
  }, []);

  const chartData = useMemo(() => {

    const data = dashboardData?.history.labels.map((label, index) => ({
      month: label,
      mensagens: dashboardData?.history.messages[index] ?? 0,
      clients: dashboardData?.history.clients[index] ?? 0,
    }));

    return data ?? [];
  }, [dashboardData]);

  const handleChangeTimeRange = (value: "30" | "90" | "180") => {
    fetchMetrics(Number(value));
    setSelectedTimeRange(value);
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold">Resumo da plataforma</h1>
              <p className="text-gray-500 text-sm">Veja como a FUN.AI ajudou com sua performance no último período.</p>
            </div>
            
            <Select defaultValue={selectedTimeRange} onValueChange={handleChangeTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"7"}>7 dias</SelectItem>
                <SelectItem value={"10"}>10 dias</SelectItem>
                <SelectItem value={"30"}>30 dias</SelectItem>
                <SelectItem value={"90"}>90 dias</SelectItem>
                <SelectItem value={"180"}>6 meses</SelectItem>
                <SelectItem value={"210"}>7 meses</SelectItem>
                <SelectItem value={"240"}>8 meses</SelectItem>
                <SelectItem value={"270"}>9 meses</SelectItem>
                <SelectItem value={"365"}>12 meses</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </CardHeader>

        <Separator className="mb-8 bg-gray-200 h-[2px]" />

        <CardContent className="space-y-8">
          {
            dataStatus === 'loading' ? (<Loading />) : (
              <>
                <div className="flex w-full justify-center space-x-8">
                  <KPIItem 
                    title="Economia Estimada (BRL)"
                    value={convertToBrl(dashboardData?.impact.estimatedSavingsBRL ?? 0)}
                    percentage={{
                      value: dashboardData?.impact.estimatedSavingsBRL ?? 0,
                      prevValue: dashboardData?.prevImpact.estimatedSavingsBRL ?? 0,
                    }}
                    tooltipContent="Economia estimada em reais proporcionada pela plataforma no período."
                  />

                  <KPIItem 
                    title="Horas Trabalhadas"
                    value={`${dashboardData?.impact.hoursSaved ?? 0}h`}
                    tooltipContent="Total de horas economizadas no período."
                    percentage={{
                      value: dashboardData?.impact.hoursSaved ?? 0,
                      prevValue: dashboardData?.prevImpact.hoursSaved ?? 0,
                    }}
                  />

                  <KPIItem 
                    title="Clientes atendidos"
                    value={`${dashboardData?.customerServedCount ?? 0} cliente(s)`}
                    tooltipContent="Total de clientes atendidos no período."
                    percentage={{
                      value: dashboardData?.customerServedCount ?? 0,
                      prevValue: dashboardData?.prevCustomerServedCount ?? 0,
                    }}
                  />

                  <KPIItem 
                    title="Mensagens trocadas"
                    value={`${dashboardData?.usage.messagesCount ?? 0} mensagem(s)`}
                    tooltipContent="Total de mensagens trocadas por todos os funcionários no período."
                    percentage={{
                      value: dashboardData?.usage.messagesCount ?? 0,
                      prevValue: dashboardData?.prevUsage.messagesCount ?? 0,
                    }}
                  />
                </div>

                <div className="flex w-full justify-center space-x-8">
                  <KPIItem 
                    title="Tempo de resposta médio"
                    value={`${dashboardData?.usage.avgResponseTime ?? 0} segundo(s)`}
                    tooltipContent="Tempo médio de resposta dos funcionários no período."
                    percentage={{
                      value: dashboardData?.usage.avgResponseTime ?? 0,
                      prevValue: dashboardData?.prevUsage.avgResponseTime ?? 0,
                      isReverse: true,
                    }}
                  />

                  <KPIItem 
                    title="Taxa de resolução automática"
                    value={`${(dashboardData?.usage.automatedResolutionRate ?? 0) * 100}% resolvidas`}
                    tooltipContent="Porcentagem de conversas resolvidas automaticamente pelos funcionários no período."
                    percentage={{
                      value: dashboardData?.usage.automatedResolutionRate ?? 0,
                      prevValue: dashboardData?.prevUsage.automatedResolutionRate ?? 0,
                    }}
                  />

                  <KPIItem 
                    title="Funcionários ativos"
                    value={`${dashboardData?.usage.activeAgents ?? 0} funcionário(s)`}
                    tooltipContent="Total de funcionários ativos."
                    // percentage={{
                    //   value: dashboardData?.usage.activeAgents ?? 0,
                    //   prevValue: dashboardData?.prevUsage.activeAgents ?? 0,
                    // }}
                  />

                  <KPIItem 
                    title="Uso do Plano"
                    value={`${dashboardData?.usage.planAgentsUsagePercent ?? 0}%`}
                    tooltipContent="Total de uso do plano contratado no período."
                    // percentage={{
                    //   value: dashboardData?.usage.planAgentsUsagePercent ?? 0,
                    //   prevValue: dashboardData?.prevUsage.planAgentsUsagePercent ?? 0,
                    // }}
                  />
                </div>

                <Card className="max-w-[1300px] mx-auto">
                  <CardHeader>
                    <h2 className="text-lg font-bold">Gráfico de desempenho</h2>
                  </CardHeader>
                  <CardContent>
                    <MessagesMonthChart data={chartData} />
                  </CardContent>
                </Card>

                {/* <Card className="max-w-[1300px] mx-auto">
                  <CardHeader>
                    <h2 className="text-md font-bold">Mensagens mais frequentes</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      {
                        dashboardData?.insights.topQuestions.map((item, index) => (
                          <div key={index} className="py-2 flex justify-between">
                            <h3>{index+1}. {item.question}</h3>
                            <p className="text-gray-500">contagem: {item.count}</p>
                          </div>
                        ))
                      }
                    </div>
                  </CardContent>
                </Card> */}

              </>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
};


interface MessagesMonthChartProps {
  data: {
    month: string;
    mensagens: number;
    clients: number;
  }[]
}

const calculatePercentageAndStatus = (current: number, previous: number) => {
  if (previous === 0) {
    return {
      percentage: 0,
      status: 'neutral'
    };
    // previous = current /2; // To avoid division by zero, we can set previous to 1
  }

  const percentage = Number(((current - previous) / previous).toFixed(2)) * 100;

  if (percentage > 0) {
    return { percentage, status: 'positive' };
  } else if (percentage < 0) {
    return { percentage, status: 'negative' };
  } else {
    return { percentage: 0, status: 'neutral' };
  }
}

const MessagesMonthChart = ({ data }: MessagesMonthChartProps) => {

  const chartConfig = {
    mensagens: {
      label: "Mensagens",
      color: "#000000",
    },
    clients: {
      label: "Clientes",
      color: "#3B82F6",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          label={{
            value: "Data",
            position: "insideBottomRight",
            offset: -5,
          }}
        />
        
        <YAxis
          dataKey="mensagens"
          label={{
            value: "Quantidade de mensagens",
            angle: -90,
            position: "insideLeft",
            offset: 0,
          }}
        />
        <ChartTooltip />
        <Legend />
        <Line type="monotone" dataKey="mensagens" stroke="var(--color-mensagens)" strokeWidth={2} dot />
        <Line type="monotone" dataKey="clients" stroke="var(--color-clients)" strokeWidth={2} dot />
      </LineChart>
    </ChartContainer>
  );
}


interface KPIItemProps {
  title: string;
  value: number | string;
  tooltipContent: string;
  percentage?: {
    value: number;
    prevValue: number;
    isReverse?: boolean;
  }
}

const KPIItem = ({ title, tooltipContent, value, percentage }: KPIItemProps) => {
  const { percentage: percentageValue, status } = calculatePercentageAndStatus(percentage?.value ?? 0, percentage?.prevValue ?? 0);

  const statusText = status === "positive"
    ? percentage?.isReverse ? "text-red-600" : "text-green-600"
    : status === "negative"
      ? percentage?.isReverse ? "text-green-600" : "text-red-600"
      : "text-gray-500";


  return (
    <Card className="w-[300px] h-[120px] gap-2">
      <CardHeader className="flex justify-between">
        <span className="text-gray-500 text-sm">{title}</span>
        <Tooltip>
          <TooltipTrigger><InfoIcon size={16}/></TooltipTrigger>
          <TooltipContent className="opacity-80">
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="text-lg font-bold" style={{ whiteSpace: 'pre-wrap' }}>{value}</span>
        {percentage && (
          <div className="flex gap-2 items-center">
            {
              percentageValue > 0 ? (
                <ArrowUp className={statusText} size={16} />
              ) : percentageValue < 0 ? (
                <ArrowDown className={statusText} size={16} />
              ) : (
                <span className="text-gray-500">—</span>
              )
            }
            <span className={`text-sm font-bold ${statusText}`}>{percentageValue}%</span>
          </div>
          )}
      </CardContent>
    </Card>
  )
}