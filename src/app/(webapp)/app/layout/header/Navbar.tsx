"use client"

import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {ChevronDownIcon, SignOutIcon} from "@/components/ui/__icons";
import logout_icon from "./logout.png"
import logo_icon from "./logo.png"
import {Button} from "@/components/ui/button";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import SignOutAction from "@/components/actions/Signout.action";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as React from "react";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {queryClient} from "@/app/_utils/network/reactQuery";

export const Navbar = () => {
    return (
        <div
            className={"bg-vaPrimary py-[16px] h-[94px] fixed w-full flex items-center justify-between px-[30px] z-50"}>
            <div>
                <Image width={169} height={23} src={logo_icon} alt={""}/>
            </div>
            <div>
                <UserOption/>
            </div>
        </div>
    )
}

const UserOption: React.FC = () => {

    const {data, isLoading} = useUserProfile()


    if (isLoading) {

        return (
            <div></div>
        )
    }


    if (data) {
        return (
            <div className={`flex justify-between gap-[30px] items-start cursor-default finter`}>
                <div className={`flex justify-end items-end gap-[4px] flex-col`}>
                    <div className="text-[#f2f2f2] text-[24px] font-bold  leading-[23px]">{data.username}</div>
                    <Select onValueChange={(new_city_id) => {
                        AuthManagerGuard.setEnabledCityID(+new_city_id)
                        queryClient.invalidateQueries().then((() => {
                            //
                        }))
                    }}
                            defaultValue={AuthManagerGuard.getEnabledCity}
                    >
                        <SelectTrigger className="w-fit bg-transparent border-transparent text-[#f2f2f2] text-base font-medium">
                            <SelectValue placeholder="Selectionner"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Selectionner</SelectLabel>
                                {
                                    data.listPark?.map((item, index) => (
                                        <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <SignOutAction>
                        <Button className={`group translate-x-0 mt-[2px]`}>
                            <SignOutIcon/>
                        </Button>
                    </SignOutAction>
                </div>
            </div>
        )
    }
}
