"use client"

import VLinkProvider from "@/components/helpers/VLinkProvider";
import React from "react";
import {ACCOUNTS_ROUTE, P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE} from "@/utils/protectedNavigation";
import {usePathname} from "next/navigation";


export const AccountAfterTitleComponent = () => {

    const $pathname = usePathname()

    const plIsActive = $pathname === P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE
    const accountIsActive = $pathname === ACCOUNTS_ROUTE
    const soldeIsActive = $pathname === "/dashboard/status-accounts/soldes"

    return (
        <div className={`font-medium text-[20px] leading-[25px] tracking-[-2%] text-admin-primary flex items-center`}>
            <VLinkProvider className={`pr-[20px] border-r ${!soldeIsActive ? '' : 'text-blue-primary'}`}
                           to={"/dashboard/status-accounts/soldes"}>Solde</VLinkProvider>
            <VLinkProvider to={ACCOUNTS_ROUTE}
                           className={`px-[20px] ${accountIsActive ? 'text-blue-primary' : ''}`}>Comptes</VLinkProvider>
            <VLinkProvider className={`pl-[20px] border-l ${plIsActive ? 'text-blue-primary' : ''}`}
                           to={P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE}>P&L
                simplifié</VLinkProvider>
        </div>
    )
}

export const DashboardAfterTitle = () => {

    const $pathname = usePathname()

    const dashboardRoute = $pathname === "/dashboard"
    const resumeRoute = $pathname === "/dashboard/resume"

    return (
        <div className={`font-medium text-[20px] leading-[25px] tracking-[-2%] text-admin-primary flex items-center`}>
            <VLinkProvider to={"/dashboard/resume"}
                           className={`pr-[20px] ${resumeRoute ? 'text-blue-primary' : ''}`}>Résumé</VLinkProvider>
            <VLinkProvider className={`pl-[20px] border-l ${dashboardRoute ? 'text-blue-primary' : ''}`}
                           to={"/dashboard"}>Dashboard</VLinkProvider>
        </div>
    )
}


export const ChatAfterTitle = () => {

    const $pathname = usePathname()

    const plIsActive = $pathname === P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE

    return (
        <div className={`font-medium text-[20px] leading-[25px] tracking-[-2%] text-admin-primary flex items-center p-2.5 bg-white rounded-[10px] hover:bg-white/80`}>
            <VLinkProvider to={ACCOUNTS_ROUTE}
                           className={`hover:translate-y-[0.2] transition pr-[20px] ${!plIsActive ? 'text-blue-primary' : ''}`}>Chats</VLinkProvider>
            {/*<VLinkProvider className={`hover:translate-y-[0.2] transition pl-[20px] border-l ${!plIsActive ? '' : 'text-blue-primary'}`}*/}
            {/*               to={P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE}>Évènements</VLinkProvider>*/}
        </div>
    )
}



