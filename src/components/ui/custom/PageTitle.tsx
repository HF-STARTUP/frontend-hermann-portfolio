"use client"

import {ChevronBackIcon} from "@/components/ui/__icons";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {Input} from "@/components/ui/input";
import {FleetModel} from "@/model/ADMIN/fleet";
import {searchAndFilter} from "@/model/Model";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

type SelectType = { key: string; value: string }

const defaultSelect: SelectType[] = [
    {key: "particulier", value: "Particuliers"},
    {key: "professionnel", value: "Professionnels"},
]

export const PageTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    page_title: string,
    isSecondFleet?: boolean,
    items?: [],
    withSelect?: boolean
    onValueChange?: (selectedValue: string) => void,
}> = ({page_title, isSecondFleet, items = defaultSelect, onValueChange, withSelect = true}) => {

    const {parkID} = useGetParkID()

    const [activeFleet, setActiveFleet] = React.useState(parkID)
    const $router = useRouter();
    const {data: data, isLoading} = useGetFleetsList({
        page: 1,
        itemPerPage: 100,
    })
    const pathname = usePathname()
    const [filterFleetToken, setFilterFleetToken] = React.useState("")
    const [fleetListState, setFleetListState] = React.useState<FleetModel[]>([])


    React.useEffect(() => {
        if (activeFleet) {
            const splitedPages = pathname.split("/")
            const lastPage = splitedPages[splitedPages.length - 1]
            $router.push(`/app/fleet/${activeFleet}/${lastPage}`)
        }
    }, [activeFleet])

    React.useEffect(() => {
        if (data) {
            setFleetListState(data.fleets || [])
        }
    }, [data])


    React.useEffect(() => {
        onFilterFleet()
    }, [filterFleetToken])


    const onFilterFleet = () => {
        if (data) {
            const filteredFleet = searchAndFilter(data.fleets || [], filterFleetToken, ['name'])
            const fleetEnabled = data.fleets?.find(d => d.id === activeFleet) ?? data.fleets?.[0]
            const filteredDataContainActiveElement = filteredFleet?.find(d => d.id === activeFleet)

            if (!filteredDataContainActiveElement) {
                setFleetListState([fleetEnabled, ...filteredFleet || []])
            } else {
                setFleetListState([...filteredFleet || []])
            }
        }
    }


    return (
        <div className={"flex items-center lg:justify-start justify-between  md:gap-[16px] mb-[26px] w-full lg:w-fit"}>
            <div
                className="text-vaTextPrimary text-[1.5rem] md:text-[34px] font-bold font-['DM Sans'] leading-[42px] flex items-center gap-1">
                {isSecondFleet && <button onClick={() => $router.replace("/app/fleet/")}>
                    <ChevronBackIcon className={"text-xs"}/>
                </button>}
                <div>{page_title}</div>
            </div>
            {isSecondFleet && <div>
                <Select defaultValue={activeFleet} onValueChange={v => setActiveFleet(v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selectionner"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Flotte active</SelectLabel>
                            <div className={"px-2 mb-2 mt-2"}>
                                <Input
                                    placeholder={"Rechercher..."}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setFilterFleetToken(e.currentTarget.value)
                                    }}
                                />
                            </div>
                            {
                                fleetListState.map((item, index) => (
                                    <SelectItem key={item.id}
                                                value={item.id}>{item.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            }
            {withSelect &&
                <Select onValueChange={onValueChange} defaultValue={AuthManagerGuard.getEnabledFleetType ?? items[0]?.key}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selectionner"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Selectionner le type de flotte</SelectLabel>
                            {
                                items?.map((item, index) => (
                                    <SelectItem key={item.key}
                                                value={item.key}>{item.value}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>}


        </div>
    );
}

const SectionTitle = () => {

    return (
        <div></div>
    )
}

