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
    useGetDashboardActivities,
    useGetEntretienEvolution,
    useGetRevenusEvolution
} from "@/hooks/admin/useFleetHook";
import {DateSelect} from "@/app/(webapp)/app/dashboard/_components/activities/acctivities";
import {getDay, getMonth, getYear} from "date-fns";

export const AbonnEvolution = () => {

    const currentYear = getYear(new Date());
    const currentMonth = getMonth(new Date());

    const [month, setMonth] = React.useState<number>(currentMonth)
    const [year, setYear] = React.useState<number>(currentYear)

    const handleSelectMonth = (value: string) => {
        setMonth(+value)
    };


    const handleSelectYear = (value: string) => {
        setYear(+value)
    };

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution abonnements</ABlockTitle>
                <div>
                    <div className={"flex items-center gap-2"}>
                        <DateSelect type="month" currentMonth={month} handleSelect={handleSelectMonth}/>
                        <DateSelect type="year" handleSelect={handleSelectYear}/>
                    </div>
                </div>
            </div>
            <CustomChartLineUtils3/>
        </div>
    )
}

export const CourseEvolution = () => {

    const {data: courseEvolution, isLoading} = useGetCourseEvolution()

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution courses</ABlockTitle>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "text-gray-100 text-[12px] font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                "flex items-center gap-1",
                                "bg-[#f4f7fe] px-3 py-2 rounded-[7px] text-center text-[#A3AED0] text-lg font-medium font-['DM Sans'] leading-normal"
                            )}>
                                <div>Avril 2024</div>
                                <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={"1"}>
                                {["Janvier 2024", "Fevrier 2024"].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <CustomChartLineUtils3/>
        </div>
    )
}


export const CashEvolution = () => {

    const {} = useGetRevenusEvolution()

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution chiffre d’affaires</ABlockTitle>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                "flex items-center gap-1",
                                "bg-[#f4f7fe] px-3 py-2 rounded-[7px] text-center text-[#A3AED0] text-lg font-medium font-['DM Sans'] leading-normal"
                            )}>
                                <div>Avril 2024</div>
                                <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={"1"}>
                                {["Janvier 2024", "Fevrier 2024"].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <CustomChartLineUtils3/>
        </div>
    )
}

export const EntretienEvolution = () => {

    const {} = useGetEntretienEvolution()

    return (
        <div className={"flex flex-col justify-between bg-white h-full py-[17px] px-[27px] gap-[77px] rounded-[20px]"}>
            <div className={"flex items-center justify-between"}>
                <ABlockTitle>Evolution entretiens</ABlockTitle>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                "flex items-center gap-1",
                                "bg-[#f4f7fe] px-3 py-2 rounded-[7px] text-center text-[#A3AED0] text-lg font-medium font-['DM Sans'] leading-normal"
                            )}>
                                <div>Avril 2024</div>
                                <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel></DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={"1"}>
                                {["Janvier 2024", "Fevrier 2024"].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <CustomChartLineUtils3/>
        </div>
    )
}

export const ABlockTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <h4 className="text-black text-2xl font-semibold block">{children}</h4>
    )
}