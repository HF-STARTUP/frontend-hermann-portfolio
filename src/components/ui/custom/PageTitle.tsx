"use client"

import {ChevronBackIcon} from "@/components/ui/__icons";
import React from "react";
import {useRouter} from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

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

    const $router = useRouter();

    return (
        <div className={"flex items-center gap-[16px] mb-[26px]"}>
            <div
                className="text-vaTextPrimary text-[34px] font-bold font-['DM Sans'] leading-[42px] flex items-center gap-1">
                {isSecondFleet && <button onClick={() => $router.replace("/app/fleet/")}>
                    <ChevronBackIcon/>
                </button>}
                <div>{page_title}</div>
            </div>
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