"use client"

import {CustomChartLineUtils3} from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
import React, {useMemo} from "react";
import {
    useGetCourseEvolution,
    useGetDashboardSubscriptionEvolution,
    useGetEntretienEvolution,
    useGetProfitableList,
    useGetRevenusEvolution,
    useGetSubscriptionPlanRevenus
} from "@/hooks/admin/useFleetHook";
import {endOfMonth, getMonth, getYear, startOfMonth} from "date-fns";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Loading from "@/components/ui/Loader";
import StackBarChart from "@/lib/react-chart-2/stackBarDiagram";
import {toIsoDate} from "@/services/Service";
import {useGetActiveCurrency} from "@/hooks/__globlal/useGlobalHook";

import {Doughnut} from "react-chartjs-2"
import {type ChartOptions} from "chart.js"
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {Car, TrendingUp} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";

export const AbonnEvolution = () => {

    const [graphType, setGraphType] = React.useState("year")
    const currentYear = getYear(new Date());
    const currentMonth = getMonth(new Date());

    const [month, setMonth] = React.useState<number>(currentMonth)
    const [year, setYear] = React.useState<number>(currentYear)

    const {data, isLoading} = useGetDashboardSubscriptionEvolution(graphType)

    const handleSelectMonth = (value: string) => {
        setMonth(+value)
    };

    const handleSelectYear = (value: string) => {
        setYear(+value)
    };

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution abonnements</ABlockTitle>
                {/*<div>*/}
                {/*    <div className={"flex items-center gap-2"}>*/}
                {/*        <DateSelect type="month" currentMonth={month} handleSelect={handleSelectMonth}/>*/}
                {/*        <DateSelect type="year" handleSelect={handleSelectYear}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Select
                    defaultValue={"year"}
                    onValueChange={v => setGraphType(v)}
                >
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Selectionner la fréquence"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="month">Mensuel</SelectItem>
                            <SelectItem value="year">Annuel</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {isLoading && <Loading className={"h-[150px]"}/>}
            {/*{data && <CustomChartLineUtils3*/}
            {/*    idata={data.map(d => d.revenue)}*/}
            {/*    ilabels={data.map(d => d.item)}*/}
            {/*/>}*/}
        </div>
    )
}

export const CourseEvolution = () => {

    const [graphType, setGraphType] = React.useState("month")
    const {data: courseEvolution, isLoading} = useGetCourseEvolution(graphType)

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution courses</ABlockTitle>
                <div>
                    <Select
                        defaultValue={"month"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Selectionner la fréquence"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="month">Mensuel</SelectItem>
                                <SelectItem value="year">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {courseEvolution && <CustomChartLineUtils3
                idata={courseEvolution.map(d => d.revenue)}
                ilabels={courseEvolution.map(d => d.item)}
            />}
            {isLoading && <Loading className={"h-[200px]"}/>}
        </div>
    )
}


export const CashEvolution = () => {

    const [graphType, setGraphType] = React.useState("month")

    const {data, isLoading} = useGetRevenusEvolution(graphType)


    return (
        <div
            className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution chiffre d’affaires</ABlockTitle>
                <div>
                    <Select
                        defaultValue={"month"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Selectionner la fréquence"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="month">Mensuel</SelectItem>
                                <SelectItem value="year">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {isLoading && <Loading className={"h-[150px]"}/>}
            {data && <CustomChartLineUtils3
                idata={data.map(d => d.revenue)}
                ilabels={data.map(d => d.item)}
            />}
        </div>
    )
}

export const EntretienEvolution = () => {

    const [graphType, setGraphType] = React.useState("month")
    const {data, isLoading} = useGetEntretienEvolution(graphType)

    let t: { t: string } = {t: ""}
    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px]  gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution entretiens</ABlockTitle>
                <div>
                    <Select
                        defaultValue={"month"}
                        onValueChange={v => setGraphType(v)}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Selectionner la fréquence"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="month">Mensuel</SelectItem>
                                <SelectItem value="year">Annuel</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className={"h-[300px]"}>
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
                {isLoading && <Loading className={"h-[200px]"}/>}
            </div>
        </div>
    )
}

export const ABlockTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

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

export const SouscriptionPartition = () => {
    // const [graphType, setGraphType] = React.useState("year")
    // const currentYear = getYear(new Date())
    // const currentMonth = getMonth(new Date())
    const {currency} = useGetActiveCurrency()
    const [method, setMethod] = React.useState<string>("Ce Mois")

    const curDate = new Date();

    const {data: revenusDatas, isLoading} = useGetSubscriptionPlanRevenus({
        start_date: toIsoDate(startOfMonth(curDate)),
        end_date: toIsoDate(endOfMonth(curDate)),
        currency_id: currency ? currency : undefined,
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
                    borderColor: "#ffffff",
                    borderWidth: 3,
                    cutout: "60%",
                },
            ],
        }
    }, [data])

    const options: ChartOptions<"doughnut"> = {
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
        return new Intl.NumberFormat("fr-FR").format(num)
    }

    return (
        <div
            className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Sondage des abonnements</ABlockTitle>
                <Select
                    value={method}
                    onValueChange={setMethod}
                >
                    <SelectTrigger className="w-fit bg-slate-50">
                        <SelectValue placeholder="Selectionner"/>
                    </SelectTrigger>
                    <SelectContent>
                        {["Ce Mois"].map((city) => (
                            <SelectItem key={city} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {isLoading && <Loading className={"h-[150px]"}/>}
            {/* Chart Container */}
            {!isLoading && <div className="flex flex-col items-center">
                <div className="relative h-80 w-80">
                    {<Doughnut data={chartData} options={options}/>}

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div
                            className="text-[#1c1c1c] text-2xl font-bold">{formatNumber(total)} {revenusDatas?.currency}</div>
                        <div className="text-[#878787] text-sm">Total</div>
                    </div>
                </div>

                {/* Percentage Labels around the chart */}
                <div className="relative pointer-events-none">
                    {data.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(1)
                        const angle = index * (360 / data.length) - 90 // Start from top
                        const radius = 140
                        const x = Math.cos((angle * Math.PI) / 180) * radius
                        const y = Math.sin((angle * Math.PI) / 180) * radius

                        return (
                            <div
                                key={index}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                }}
                            >
                                <div
                                    className={`px-3 py-1 rounded-full shadow-sm border ${
                                        colors[index] === "#000000"
                                            ? "bg-[#1c1c1c] text-white"
                                            : "bg-white border-[#eaedf2] text-[#1c1c1c]"
                                    }`}
                                >
                                    <span className="text-sm font-medium">{percentage}%</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}

            {/* Legend */}
            <div className="flex flex-col gap-4 max-w-md">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: colors[index]}}></div>
                            <span className="text-[#1c1c1c] text-base">{item.label}</span>
                        </div>
                        <span className="text-[#1c1c1c] font-medium">{formatNumber(item.value)} XOF</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const BestFleet = () => {

    const {data: fleetData, isLoading} = useGetProfitableList({
        type: AuthManagerGuard.getEnabledFleetType as string,
        city_id: String(AuthManagerGuard.getEnabledCity)
    })

    return (
        <div
            className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[20px] lg:gap-[77px] rounded-[20px]"}>
            <div className={"flex flex-col items-start justify-between"}>
                <ABlockTitle>Meilleurs flottes</ABlockTitle>

                <div className="bg-[#ffffff] mt-4 w-full">
                    {fleetData && <div className="space-y-6 pt-6 w-full">
                        {/* Compact Fleet List */}
                        <div className="rounded-lg shadow-sm border w-full">
                            {/* Header */}
                            {/*<div*/}
                            {/*    className="grid grid-cols-12 gap-4 p-4 border-b bg-slate-50 text-sm font-medium text-slate-600">*/}
                            {/*    <div className="col-span-5">Nom de la flotte</div>*/}
                            {/*    /!*<div className="col-span-2">Type</div>*!/*/}
                            {/*    <div className="col-span-4">Véhicules</div>*/}
                            {/*    <div className="col-span-3">Flux financier</div>*/}
                            {/*</div>*/}

                            {/* Fleet Items */}
                            <div className="divide-y divide-slate-100 w-full">
                                <ScrollArea className={"h-[500px]"}>
                                    {fleetData.map((fleet) => (
                                        <div
                                            key={fleet.id}
                                            className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer w-full"
                                        >
                                            <div className="col-span-12 flex items-center space-x-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Car className="h-4 w-4 text-blue-600"/>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{fleet.park_name}</p>
                                                    <p className="text-xs text-slate-500">ID: {fleet.id}</p>
                                                </div>
                                            </div>

                                            {/*<div className="col-span-2 flex items-center">*/}
                                            {/*    <Badge*/}
                                            {/*        variant={fleet.type === "Professionnel" ? "default" : "secondary"}*/}
                                            {/*        className={`text-xs ${*/}
                                            {/*            fleet.type === "Professionnel"*/}
                                            {/*                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"*/}
                                            {/*                : "bg-purple-100 text-purple-800 hover:bg-purple-100"*/}
                                            {/*        }`}*/}
                                            {/*    >*/}
                                            {/*        {fleet.type}*/}
                                            {/*    </Badge>*/}
                                            {/*</div>*/}

                                            <div className={"col-span-1"}></div>

                                            <div className="col-span-4 flex items-center">
                                                <div className="flex items-center space-x-2">
                                                    <Car className="h-4 w-4 text-slate-400"/>
                                                    <span
                                                        className="font-semibold text-slate-900">{fleet.vehicle_number}</span>
                                                </div>
                                            </div>

                                            <div className="col-span-6 flex items-center">
                                                <div className="flex items-center space-x-2">
                                                    <TrendingUp className="h-4 w-4 text-green-500"/>
                                                    <div>
                                                  <span className="font-semibold text-slate-900">
                                                    {fleet.flux.toLocaleString()} {fleet.currency}
                                                  </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </div>
                        </div>
                    </div>}
                </div>
                {isLoading && <Loading className={"h-[150px]"}/>}
            </div>
        </div>
    )
}