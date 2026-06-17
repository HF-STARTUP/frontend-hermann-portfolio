"use client"

import { ChevronBackIcon } from "@/components/ui/__icons";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useGetCurrenciesList, useGetFleetsList } from "@/hooks/admin/useFleetHook";
import { useGetParkID } from "@/hooks/__globlal/useGlobalHook";
import { Input } from "@/components/ui/input";
import { FleetModel } from "@/model/ADMIN/fleet";
import { searchAndFilter } from "@/model/Model";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import FleetService from "@/services/admin/fleet/fleetService";
import { queryClient } from "@/app/_utils/network/reactQuery";

type SelectType = { key: string; value: string }

const defaultSelect: SelectType[] = [
    { key: "particulier", value: "Particuliers" },
    { key: "professionnel", value: "Professionnels" },
]

export const PageTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    page_title: string,
    items?: [],
    withSelect?: boolean
    onValueChange?: (selectedValue: string) => void,
    end_component?: ReactNode,
    close_component?: ReactNode,
    description?: string
}> = ({ page_title, items = defaultSelect, onValueChange, withSelect = true, end_component, close_component, description }) => {

    const { parkID } = useGetParkID()

    const [activeFleet, setActiveFleet] = React.useState(parkID)
    const $router = useRouter();

    const pathname = usePathname()
    const [filterFleetToken, setFilterFleetToken] = React.useState("")
    const { data: currencies, isLoading: loadingCurrency } = useGetCurrenciesList()


    React.useEffect(() => {
        if (activeFleet) {
            const splitedPages = pathname.split("/")
            const lastPage = splitedPages[splitedPages.length - 1]
            $router.push(`/app/fleet/${activeFleet}/${lastPage}`)
        }
    }, [activeFleet])


    return (
        <div className={"flex items-start justify-between  gap-12 flex-wrap my-5 w-full"}>
            <div
                className="text-vaTextPrimary text-[1.5rem] md:text-[34px] font-bold font-['DM Sans'] leading-[42px] flex items-center gap-1">

                <div className="text-[#506D82] font-bold text-3xl flex items-start gap-4">
                    <p className="flex flex-col gap-1 items-start">
                        {page_title}
                        <span className="text-sm font-normal text-muted-foreground max-w-xl">
                            {description}
                        </span>
                    </p>
                    {close_component &&
                        close_component
                    }
                </div>
            </div>

            {
                end_component && end_component
            }
            {withSelect &&
                <div className={"flex items-center gap-2"}>
                    <Select
                        onValueChange={async (v) => {
                            AuthManagerGuard.setEnabledFleetType(v)
                            console.log(AuthManagerGuard.getEnabledFleetType, ": New value setted")
                            await FleetService.invalidFleets()
                            queryClient.invalidateQueries().then(() => {
                            })
                        }}
                        defaultValue={AuthManagerGuard.getEnabledFleetType ?? items[0]?.key}
                    >
                        <SelectTrigger
                            className=" w-fit bg-[#D9E5FF]  text-center justify-center text-blue-800 text-lg font-medium font-['DM Sans'] leading-normal">
                            <SelectValue placeholder="Selectionner" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Selectionner le type de flotte</SelectLabel>
                                {/*<SelectItem*/}
                                {/*    value={"999999"}*/}
                                {/*>*/}
                                {/*    Tous*/}
                                {/*</SelectItem>*/}
                                {
                                    items?.map((item, index) => (
                                        <SelectItem key={item.key}
                                            value={item.key}>{item.value}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {AuthManagerGuard.isAllCities && <Select
                        onValueChange={cur => {
                            AuthManagerGuard.setCurrency(cur)
                            queryClient.invalidateQueries().then(() => {
                            })
                        }}
                        defaultValue={AuthManagerGuard.getCurrency ?? items[0]?.key}
                    >
                        <SelectTrigger
                            className=" w-fit bg-[#D9E5FF]  text-center justify-center text-blue-800 text-lg font-medium font-['DM Sans'] leading-normal">
                            <SelectValue placeholder="Dévise" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Selectionner la dévise</SelectLabel>
                                {
                                    currencies?.map((item, index) => (
                                        <SelectItem
                                            key={item.id}
                                            value={`${item.id}`}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>}
                </div>
            }


        </div>
    );
}

export const PageSubTitle = ({ subtitle }: { subtitle: string }) => {

    return (
        <p className="text-[#506D82] font-bold text-xl flex items-center gap-4">
            {subtitle}
        </p>
    )
}

