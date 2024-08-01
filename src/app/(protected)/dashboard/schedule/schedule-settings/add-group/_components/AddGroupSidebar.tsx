"use client"

import React from "react";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {isCurrentPage} from "@/utils/urlValidation";
import {usePathname} from "next/navigation";
import {ADD_ROTATION_GROUP_SIDEBAR_NAVIGATION} from "@/utils/protectedNavigation";

const AddGroupSidebar: React.FC = () => {
    return (
        <div className={`w-[375px] bg-[#FAFBFF] px-[32px] py-[34px] `}>
            <AddGroupSidebarItems/>
        </div>
    )
}


const AddGroupSidebarItems: React.FC = () => {

    return (
        <ul className={`flex flex-col gap-[33px] pl-[30px] py-[35px] pr-[50px] bg-[#FAFBFF]`}>
            {ADD_ROTATION_GROUP_SIDEBAR_NAVIGATION.map(navItem => (
                <li key={navItem.url}>
                    <AddGroupSidebarItem icon={navItem.icon}
                                         to={navItem.url}>{navItem.label}</AddGroupSidebarItem>
                </li>
            ))
            }
        </ul>
    )
}


const AddGroupSidebarItem: React.FC<{
    icon: React.ReactNode,
    children: React.ReactNode,
    to?: string
} & React.HTMLAttributes<HTMLDivElement>> = ({icon, children, to, ...props}) => {

    const $pathName = usePathname()

    const isActive = to ? isCurrentPage($pathName, to, 5) : false

    const classes = `w-full flex gap-[23px] items-center justify-start text-base font-medium finter leading-normal transition ease-in duration-300 ${isActive ? 'text-blue-primary' : 'text-admin-primary hover:text-blue-500'}`

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

export default AddGroupSidebarItems

