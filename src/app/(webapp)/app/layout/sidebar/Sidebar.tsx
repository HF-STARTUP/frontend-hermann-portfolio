"use client"

import React from "react";
import {DashboardIcon, GeolocationIcon, LayoutListIcon, SettingIcon} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";

export const Sidebar = () => {

    return (
        <div className={"w-[290px] bg-vaPrimary text-white h-[100vh] pt-[100px] flex flex-col gap-[20px] fixed z-40"}>
            <SidebarItem
                label={`Dashboard`}
                icon={<DashboardIcon/>}
                to={`/app/dashboard `}
            />
            <SidebarItem
                label={"Flottes"}
                icon={<LayoutListIcon/>}
                to={"/app/fleet"}

            />
            <SidebarItem
                label={"Géolocalisation"}
                icon={<GeolocationIcon/>}
                to={"/app/geolocalisation"}
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
        <Link href={to ?? ""}>
            <div className={cn(
                "flex gap-[11px] text-[16px] pl-[33px] border-r-vaYellow rounded-[1px] py-[10px] cursor-pointer hover:opacity-80",
                isActive && "border-r-4"
            )}>
                <div>{icon}</div>
                <div>{label}</div>
            </div>
        </Link>
    )
}