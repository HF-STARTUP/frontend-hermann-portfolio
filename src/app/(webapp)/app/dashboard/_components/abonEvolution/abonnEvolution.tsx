"use client"

import { CustomChartLineUtils3 } from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
import React, { useMemo, useState } from "react";
import {
    useDashboardAbonnEvolution,
    useDashboardBestFleet,
    useDashboardCashEvolution,
    useDashboardCourseEvolution,
    useDashboardEntretienEvolution
} from "@/app/(webapp)/app/dashboard/_hook/useDashboardSectionsHooks";
import { endOfMonth, startOfMonth } from "date-fns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Loading from "@/components/ui/Loader";
import StackBarChart from "@/lib/react-chart-2/stackBarDiagram";
import { toIsoDate } from "@/services/Service";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";

import { Doughnut } from "react-chartjs-2"
import { type ChartOptions } from "chart.js"
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { Car, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyData } from "@/components/box/PageNetworkState";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetSubscriptionPlanRevenus } from "@/hooks/admin/useFleetHook";

interface DataPoint {
    label: string
    value: number
}

interface RevenueChartProps {
    data: DataPoint[]
    title?: string
    subtitle?: string
}


/*
export const AbonnEvolution = () => {

    const [graphType, setGraphType] = React.useState("month")
    const {points, isLoading, hasData} = useDashboardAbonnEvolution(graphType)


    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution abonnements</ABlockTitle>
                {/!*<div>*!/}
                {/!*    <div className={\"flex items-center gap-2\"}>*!/}
                {/!*        <DateSelect type=\"month\" currentMonth={month} handleSelect={handleSelectMonth}/>*!/}
                {/!*        <DateSelect type=\"year\" handleSelect={handleSelectYear}/>*!/}
                {/!*    </div>*!/}
                {/!*</div>*!/}
                <Select
                    defaultValue={\"month\"}
                    onValueChange={v => setGraphType(v)}
                >
                    <SelectTrigger className=\"w-fit\">
                        <SelectValue placeholder=\"Selectionner la fréquence\"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value=\"month\">Mensuel</SelectItem>
                            <SelectItem value=\"year\">Annuel</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {isLoading && <Loading className={\"h-[150px]\"}/>}
            {!hasData && !isLoading && <EmptyData message={\"Aucune donnée ici pour l'instant\"}/>}
            {hasData && (
                <ModernLineChart
                    data={points}
                />
            )}
            {/!*{data && <CustomChartLineUtils3*!/}
            {/!*    idata={data.map(d => d.revenue)}*!/}
            {/!*    ilabels={data.map(d => d.item)}*!/}
            {/!* />}*!/}
            {/!*{data && JSON.stringify(data.data.map(d => ({label: d.item, value: d.amount})))}*!/}
        </div>
    )
}
*/

/*
export const CourseEvolution = () => {

    const [graphType, setGraphType] = React.useState(\"month\")
    const {data: courseEvolution, isLoading} = useDashboardCourseEvolution(graphType)

    return (
        <div className={\"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]\"}>
            <div className={\"flex items-center justify-between\"}>
                <ABlockTitle>Evolution courses</ABlockTitle>
                <div>
                    <Select
                        defaultValue={\"month\"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className=\"w-fit\">
                            <SelectValue placeholder=\"Selectionner la fréquence\"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value=\"month\">Mensuel</SelectItem>
                                <SelectItem value=\"year\">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {courseEvolution && <CustomChartLineUtils3
                idata={courseEvolution.map(d => d.revenue)}
                ilabels={courseEvolution.map(d => d.item)}
            />}
            {isLoading && <Loading className={\"h-[200px]\"}/>}
        </div>
    )
}
*/


/*
export const CashEvolution = () => {

    const [graphType, setGraphType] = React.useState(\"month\")
    const {data, isLoading} = useDashboardCashEvolution(graphType)


    return (
        <div
            className={\"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]\"}>
            <div className={\"flex items-center justify-between\"}>
                <ABlockTitle>Evolution chiffre d’affaires</ABlockTitle>
                <div>
                    <Select
                        defaultValue={\"month\"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className=\"w-fit\">
                            <SelectValue placeholder=\"Selectionner la fréquence\"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value=\"month\">Mensuel</SelectItem>
                                <SelectItem value=\"year\">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {isLoading && <Loading className={\"h-[150px]\"}/>}
            {data && <CustomChartLineUtils3
                idata={data.map(d => d.revenue)}
                ilabels={data.map(d => d.item)}
            />}
        </div>
    )
}
*/

/*
export const EntretienEvolution = () => {

    const [graphType, setGraphType] = React.useState(\"month\")
    const {data, isLoading} = useDashboardEntretienEvolution(graphType)

    let t: { t: string } = {t: \"\"}
    return (
        <div className={\"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]\"}>
            <div className={\"flex items-center justify-between\"}>
                <ABlockTitle>Evolution entretiens</ABlockTitle>
                <div>
                    <Select
                        defaultValue={\"month\"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className=\"w-fit\">
                            <SelectValue placeholder=\"Selectionner la fréquence\"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value=\"month\">Mensuel</SelectItem>
                                <SelectItem value=\"year\">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className={\"h-[300px]\"}>
                {data && <StackBarChart ilabels={data.map(d => d.item)} idata={[
                    {
                        label: 'Carburant',
                        data: data.map(d => d.data.carburant),
                        backgroundColor: '#FF716A',
                    },
                    {
                        label: 'Change',
                        data: data.map(d => d.data.change),
                        backgroundColor: '#BFC2F5',
                    },
                    {
                        label: 'Breakdown',
                        data: data.map(d => d.data.breakdown),
                        backgroundColor: '#FFDE6C',
                    },
                ]}/>}
                {isLoading && <Loading className={\"h-[200px]\"}/>}
            </div>
        </div>
    )
}
*/

export const ABlockTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {

    return (
        <h4 className="text-black text-lg lg:text-2xl font-semibold block">{children}</h4>
    )
}

const colors = [
    "#ea8f20",
    "#b1e3ff",
    "#baedbd",
    "#000000",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4"
]

/*
export const SouscriptionPartition = () => {
    // const [graphType, setGraphType] = React.useState(\"year\")
    // const currentYear = getYear(new Date())
    // const currentMonth = getMonth(new Date())
    const {currency} = useGetActiveCurrency()
    const [method, setMethod] = React.useState<string>(\"Ce Mois\")

    const curDate = new Date();

    const {data: revenusDatas, isLoading} = useGetSubscriptionPlanRevenus({
        start_date: toIsoDate(startOfMonth(curDate)),
        end_date: toIsoDate(endOfMonth(curDate)),
        currency_id: AuthManagerGuard.getCurrency,
    })

    const data = useMemo(() => {
        if (!revenusDatas) return []
        return revenusDatas.plans.map(d => ({label: d.subscription_name, value: d.amount}))
    }, [revenusDatas])


    const total = useMemo(() => {
        if (!data) return 0
        return data.reduce((sum, item) => sum + item.value, 0)
    }, [data])

    const chartData = useMemo(() => {
        if (!data) return
        return {
            labels: data.map((item) => item.label),
            datasets: [
                {
                    data: data.map((item) => item.value),
                    backgroundColor: colors.slice(0, data.length),
                    borderColor: \"#ffffff\",
                    borderWidth: 3,
                    cutout: \"60%\",
                },
            ],
        }
    }, [data])

    const options: ChartOptions<\"doughnut\"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const percentage = ((context.parsed / total) * 100).toFixed(1)
                        return `${context.label}: ${percentage}%`
                    },
                },
            },
        },
        elements: {
            arc: {
                borderRadius: 8,
            },
        },
    }

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat(\"fr-FR\").format(num)
    }

    return (
        <div
            className={\"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[20px] lg:gap-[77px] rounded-[20px]\"}>
            <div className={\"flex items-center justify-between\"}>
                <ABlockTitle>Sondage des abonnements</ABlockTitle>
                <Select
                    value={method}
                    onValueChange={setMethod}
                >
                    <SelectTrigger className=\"w-fit bg-slate-50\">
                        <SelectValue placeholder=\"Selectionner\"/>
                    </SelectTrigger>
                    <SelectContent>
                        {[\"Ce Mois\"].map((city) => (
                            <SelectItem key={city} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {isLoading && <Loading className={\"h-[150px]\"}/>}
            {/!* Chart Container *!/}
            {!isLoading && <div className=\"flex flex-col items-center\">
                <div className=\"relative h-80 w-80\">
                    {<Doughnut
                        data={chartData || []}
                        options={options}
                    />}

                    {/!* Center Text *!/}
                    <div className=\"absolute inset-0 flex flex-col items-center justify-center pointer-events-none\">
                        <div
                            className=\"text-[#1c1c1c] text-2xl font-bold\">{formatNumber(total)} {revenusDatas?.currency}</div>
                        <div className=\"text-[#878787] text-sm\">Total</div>
                    </div>
                </div>

                {/!* Percentage Labels around the chart *!/}
                <div className=\"relative pointer-events-none\">
                    {data.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(1)
                        const angle = index * (360 / data.length) - 90 // Start from top
                        const radius = 140
                        const x = Math.cos((angle * Math.PI) / 180) * radius
                        const y = Math.sin((angle * Math.PI) / 180) * radius

                        return (
                            <div
                                key={index}
                                className=\"absolute transform -translate-x-1/2 -translate-y-1/2\"
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                }}
                            >
                                <div
                                    className={`px-3 py-1 rounded-full shadow-sm border ${
                                        colors[index] === \"#000000\"
                                            ? \"bg-[#1c1c1c] text-white\"
                                            : \"bg-white border-[#eaedf2] text-[#1c1c1c]\"
                                    }`}
                                >
                                    <span className=\"text-sm font-medium\">{percentage}%</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}

            {/!* Legend *!/}
            <div className=\"flex flex-col gap-4 max-w-md\">
                {data.map((item, index) => (
                    <div key={index} className=\"flex items-center justify-between\">
                        <div className=\"flex items-center gap-3\">
                            <div className=\"w-3 h-3 rounded-full\" style={{backgroundColor: colors[index]}}></div>
                            <span className=\"text-[#1c1c1c] text-base\">{item.label}</span>
                        </div>
                        <span className=\"text-[#1c1c1c] font-medium\">{formatNumber(item.value)} XOF</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
*/

export const BestFleet = () => {

    const { fleetData, isLoading, currency } = useDashboardBestFleet()

    const [ville, setVille] = useState<string | undefined>()
    const [type, setType] = useState<string | undefined>()

    return (
        <div className={"flex flex-col bg-white p-6 rounded-2xl h-fit max-w-full"}>
            <div className={"flex flex-col items-start justify-between"}>
                <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-bold text-vaTextPrimary">Meilleures flottes</p>
                    <div className="flex items-center gap-2">
                        <Select value={ville} defaultValue="1">
                            <SelectTrigger className="bg-vaLightGray/10 border-none rounded-xl text-vaTextPrimary px-4 font-semibold">
                                <SelectValue placeholder="Ville"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Douala</SelectItem>
                                <SelectItem value="2">Yaounde</SelectItem>
                                <SelectItem value="3">Coccody</SelectItem>
                                <SelectItem value="4">Kinshassa</SelectItem>
                                <SelectItem value="5">San Pedro</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={type} defaultValue="1">
                            <SelectTrigger className="bg-vaLightGray/10 border-none rounded-xl text-vaTextPrimary px-4 font-semibold">
                                <SelectValue placeholder="type"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Particulier</SelectItem>
                                <SelectItem value="2">Professionnel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                

                <div className="w-full">
                    {fleetData && <div className="space-y-6 pt-6 w-full">
                        <div className="w-full">
                            {/* Fleet Items & Header Container */}
                            {!isLoading && fleetData && fleetData.length == 0 && (
                                <div>
                                    <EmptyData message={"Aucune donnée pour le moment"} />
                                </div>
                            )}

                            {fleetData && fleetData.length ? (
                                <div className="w-full">
                                    {/* Scrollable Area - Hauteur conservée à 33.5rem */}
                                    <div className={"h-full max-h-[39rem] overflow-x-auto overflow-y-auto w-full custom-scrollbar"}>

                                        {/* Conteneur interne avec largeur mini pour le scroll horizontal sur mobile */}
                                        <div className="w-full min-w-[750px]">

                                            {/* Header (placé ici pour scroller avec le contenu) */}
                                            <div className="grid grid-cols-4 gap-4 border-b border-vaGray pb-4 text-base font-normal text-vaTextPrimary sticky top-0 bg-white z-[5]">
                                                <div className="">Flotte</div>
                                                <div className="">Type</div>
                                                <div className="">Nombres de véhicules</div>
                                                <div className="">Flux financiers</div>
                                            </div>

                                            {/* Fleet Items */}
                                            {fleetData.map((fleet) => (
                                                <div
                                                    key={fleet.id}
                                                    className="grid grid-cols-4 w-full py-4 text-sm text-black font-medium gap-4 items-center"
                                                >
                                                    <div className="w-full">
                                                        {fleet.park_name}
                                                    </div>
                                                    <div className="w-full">
                                                        {fleet.type}
                                                    </div>
                                                    <div className="w-full">
                                                        {fleet.vehicle_number}
                                                    </div>
                                                    <div className="w-full">
                                                        {fleet.flux} {currency}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : <span></span>}
                        </div>
                    </div>}
                </div>
                {isLoading && <Loading className={"h-[150px]"} />}
            </div>
        </div>
    )
}


interface DataPoint {
    label: string
    value: number
}

interface ModernLineChartProps {
    data: DataPoint[]
    title?: string
    description?: string
    color?: string
    height?: number
}

export function ModernLineChart({
    data,
    title = "Diagramme en ligne",
    description = "Évolution des données dans le temps",
    color = "hsl(var(--chart-1))",
    height = 400,
}: ModernLineChartProps) {
    const chartConfig = {
        value: {
            label: "Valeur",
            color: color,
        },
    }

    return (
        <div>
            <ChartContainer config={chartConfig} className={`w-full h-[${height}px]`}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} className="text-muted-foreground"
                        fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} className="text-muted-foreground" fontSize={12} />
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "5 5" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        dot={{
                            fill: color,
                            strokeWidth: 2,
                            r: 4,
                            stroke: "hsl(var(--background))",
                        }}
                        activeDot={{
                            r: 6,
                            fill: color,
                            stroke: "hsl(var(--background))",
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}


