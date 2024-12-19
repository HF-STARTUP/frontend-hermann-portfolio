"use client"

import {CustomChartLineUtils3} from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
import {SectionTitle} from "@/app/(protected)/dashboard/status-accounts/soldes/components/_utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {ArrowDropDownIcon} from "@/components/ui/__icons";
import React from "react";
import {
    useGetCourseEvolution,
    useGetDashboardActivities, useGetDashboardSubscriptionEvolution,
    useGetEntretienEvolution,
    useGetRevenusEvolution
} from "@/hooks/admin/useFleetHook";
import {DateSelect} from "@/app/(webapp)/app/dashboard/_components/activities/acctivities";
import {getDay, getMonth, getYear} from "date-fns";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import Loading from "@/components/ui/Loader";
import StackBarChart from "@/lib/react-chart-2/stackBarDiagram";

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
            {data && <CustomChartLineUtils3
                idata={data.map(d => d.revenue)}
                ilabels={data.map(d => d.item)}
            />}
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
                                <SelectItem value="day">Journalier</SelectItem>
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