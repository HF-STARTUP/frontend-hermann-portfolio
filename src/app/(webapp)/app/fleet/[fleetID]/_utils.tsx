"use client"

import * as React from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const PageNavigation = () => {

    const base_url = "/app/fleet/03fecf9a-3715-480f-b41a-daa35256257a"
    const links = [
        {
            label: "Dashboard",
            url: "/dashboard",
        },
        {
            label: "Abonnement",
            url: "/subscription",
        },
        {
            label: "Administrateurs",
            url: "/admin",
        },
        {
            label: "Véhicules",
            url: "/cars",
        },
        {
            label: "Chauffeurs",
            url: "/drivers",
        },
        {
            label: "Clients",
            url: "/clients",
        },
        {
            label: "Courses",
            url: "/races",
        },
        {
            label: "Fournisseurs",
            url: "/supliers",
        },
        {
            label: "Entretiens",
            url: "/entretien",
            last: true
        },

    ]


    return (
        <div className={"flex items-center"}>
            {links.map(({label, last, url}, index) => (
                <PageLink
                    key={index}
                    label={label}
                    url={base_url + url}
                    last={last}
                />
            ))
            }
        </div>
    )
}

export const PageLink: React.FC<{ label: string, url: string, last?: boolean }> = ({label, url, last}) => {

    const $pathname = usePathname()
    const is_active = $pathname === url

    console.log("$pathname=", $pathname)
    console.log("$url=", url)

    return (
        <Link href={url}
              className={cn(
                  "text-[#506d82] text-base font-normal font-['DM Sans'] leading-[25px] px-[21px] border-r border-[#506d82] hover:opacity-80 transition",
                  last && "border-transparent",
                  is_active && "text-[#2554ae] text-xl font-bold"
              )}>
            <div>{label}</div>
        </Link>
    )
}