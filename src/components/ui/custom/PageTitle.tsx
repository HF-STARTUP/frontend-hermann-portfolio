"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {ArrowDropDownIcon, ChevronBackIcon} from "@/components/ui/__icons";
import React from "react";
import {useRouter} from "next/navigation";

export const PageTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    page_title: string,
    isSecondFleet?: boolean,
    items?: string[]
}> = ({page_title, isSecondFleet, items}) => {

    const $router = useRouter();

    return (
        <div className={"flex items-center gap-[16px] mb-[26px]"}>
            <div
                className="text-vaTextPrimary text-[34px] font-bold font-['DM Sans'] leading-[42px] flex items-center gap-1">
                {isSecondFleet && <button onClick={() => $router.back()}>
                    <ChevronBackIcon/>
                </button>}
                <div>{page_title}</div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn(
                        "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                        "flex items-center gap-1",
                        "bg-[#d9e4ff] px-3 py-2 rounded-[7px] text-center text-[#2554ae] text-lg font-medium font-['DM Sans'] leading-normal"
                    )}>
                        <div>{items ? items[0] : (isSecondFleet ? "Flotte de Christian (Cameroun)" : "Particulier")}</div>
                        <ArrowDropDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Selectionner le type de flotte</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuRadioGroup value={"1"}>
                        {
                            isSecondFleet
                                ? items ?? [
                                    "Flotte de arsene (Cameroun)",
                                    "Flotte de christian (Cameroun)"
                                ]
                                : items ?? [
                                    "Particulier",
                                    "Professionnel"
                                ].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))
                        }
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}

const SectionTitle = () => {

    return (
        <div></div>
    )
}