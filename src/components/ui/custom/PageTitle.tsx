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
    const {data, isLoading} = useGetFleetsList()
    const pathname = usePathname()


    React.useEffect(() => {
        if (activeFleet) {

            const splitedPages = pathname.split("/")
            const lastPage = splitedPages[splitedPages.length - 1]
            $router.push(`/app/fleet/${activeFleet}/${lastPage}`)
        }
    }, [activeFleet])


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
                {data && <Select defaultValue={activeFleet} onValueChange={v => setActiveFleet(v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selectionner"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Flotte active</SelectLabel>
                            {
                                data.map((item, index) => (
                                    <SelectItem key={item.id}
                                                value={item.id}>{item.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>}
            </div>
            }
            {withSelect &&
                <Select onValueChange={onValueChange} defaultValue={items[0]?.key ?? undefined}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selectionner"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Selectionner</SelectLabel>
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