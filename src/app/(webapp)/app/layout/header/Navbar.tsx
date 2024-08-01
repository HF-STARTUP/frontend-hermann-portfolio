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

export const Navbar = () => {
    return (
        <div className={"bg-vaPrimary py-[16px] fixed w-full flex items-center justify-between px-[30px] z-50"}>
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
                    <div className="text-[#f2f2f2] text-[24px] font-bold  leading-[23px]">Roger Nasser</div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "text-gray-100 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                                "flex items-center gap-1"
                            )}>
                                <div>Park Bafang</div>
                                <ChevronDownIcon className={"opacity-75 group-hover:scale-[1.3]"}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Selectionner la flotte</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuRadioGroup value={"1"}>
                                {["Douala", "Yaoundé"].map((p, i) => (
                                    <DropdownMenuRadioItem key={i} value={p}>{p}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <Button className={`group translate-x-0 mt-[2px]`}>
                        <SignOutIcon/>
                    </Button>
                </div>
            </div>
        )
    }
}
