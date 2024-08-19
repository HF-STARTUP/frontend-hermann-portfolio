"use client"

import React from "react";
import {
    DashboardIcon,
    GeolocationIcon,
    InfoIcon,
    LayoutListIcon,
    ReclamsIcon,
    SettingIcon
} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import {CreditCardIcon} from "lucide-react";

export const Sidebar = () => {

    return (
        <div
            className={cn(
                "lg:w-[290px] bg-vaPrimary/95 md:bg-vaPrimary backdrop-blur-md border-t border-white text-white lg:h-[100vh] lg:pt-[100px] lg:px-0 lg:flex lg:flex-col lg:gap-[20px] fixed z-40 lg:justify-start lg:items-start",
                "w-[98%] lg:ml-0 ml-[1%] lg-[1%] mb-[5px] lg:mb-0 rounded-lg lg:rounded-none h-[60px] bottom-0 flex items-center justify-around px-[7px] gap-1"
            )}>
            <SidebarItem
                label={`Dashboard`}
                icon={<DashboardIcon/>}
                to={`/app/dashboard`}
            />
            <SidebarItem
                label={"Flottes"}
                icon={<LayoutListIcon/>}
                to={"/app/fleet"}

            />
            {/*<SidebarItem*/}
            {/*    label={"Géolocalisation"}*/}
            {/*    icon={<GeolocationIcon/>}*/}
            {/*    to={"/app/geolocalisation"}*/}
            {/*/>*/}
            <SidebarItem
                label={"Transactions bancaires"}
                icon={<CreditCardIcon/>}
                to={"/app/transactions"}
            />
            <SidebarItem
                label={"Tickets de réclamations"}
                icon={<InfoIcon/>}
                to={"/app/tickets"}
            />
            <SidebarItem
                label={"Paramètres"}
                icon={<SettingIcon/>}
                to={"/app/settings"}
            />
        </div>
    )
}

const SidebarItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    label: string,
    icon: React.ReactNode,
    to?: string
}> = ({label, icon, to}) => {

    const cur_path = usePathname()
    const isActive = cur_path === to


    return (
        <Link href={to ?? ""} className={"w-full"}>
            <div className={cn(
                "flex gap-[11px] text-[16px] lg:pl-[33px] border-r-vaYellow rounded-[1px] py-[10px] cursor-pointer hover:opacity-80 w-full",
                isActive && "lg:border-r-4 bg-vaYellow/10 rounded-md text-vaYellow lg:bg-transparent lg:text-white lg:rounded-none",
                "flex items-center justify-center lg:justify-start"
            )}>
                <div className={cn(
                )}>{icon}</div>
                <div className={cn(
                    "hidden lg:flex",
                )}>{label}</div>
            </div>
        </Link>
    )
}