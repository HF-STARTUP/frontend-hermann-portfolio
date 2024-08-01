"use client"

import React from "react";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {
    AlbumIcon,
    CardPPosIcon,
    Notification2Icon,
    SignOutIcon,
    UserIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {isCurrentPage} from "@/utils/urlValidation";
import {usePathname} from "next/navigation";
import SignoutAction from "@/components/actions/Signout.action";
import {SETTINGS_PAGE_NAVIGATION} from "@/utils/protectedNavigation";

const SettingSidebar: React.FC = () => {
    return (
        <div className={`w-[375px] bg-[#FAFBFF] px-[32px] py-[34px] `}>
            <SettingSidebarItems/>
        </div>
    )
}


const SettingSidebarItems: React.FC = () => {

    return (
        <ul className={`flex flex-col gap-[33px] px`}>
            {SETTINGS_PAGE_NAVIGATION.map(navItem => (
                <li key={navItem.url}>
                    <SettingSidebarItem icon={navItem.icon}
                                        to={navItem.url}>{navItem.label}</SettingSidebarItem>
                </li>
            ))
            }
            <li>
                <SignoutAction>
                    <SettingSidebarItem icon={<SignOutIcon/>}>Deconnexion</SettingSidebarItem>
                </SignoutAction>
            </li>
        </ul>
    )
}


const SettingSidebarItem: React.FC<{
    icon: React.ReactNode,
    children: React.ReactNode,
    to?: string
} & React.HTMLAttributes<HTMLDivElement>> = ({icon, children, to, ...props}) => {

    const $pathName = usePathname()

    const isActive = to ? isCurrentPage($pathName, to, 3) : false

    const classes = `w-full flex gap-[23px] items-center justify-start text-base font-medium finter 
    leading-normal transition ease-in duration-300 ${isActive ? 'text-blue-primary' : 'text-admin-primary hover:text-blue-500'}`

    return (
        <div className={classes} {...props}>
            {to && <VLinkProvider to={to} className={classes}>
                <div>{icon}</div>
                <div>{children}</div>
            </VLinkProvider>}
            {!to && <button className={classes}>
                <div>{icon}</div>
                <div>{children}</div>
            </button>}
        </div>
    )
}
export default SettingSidebar
