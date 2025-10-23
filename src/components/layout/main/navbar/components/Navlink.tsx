"use client";

import LinkProvider from "next/link";
import React from "react";
import VLinkProvider from "@/components/helpers/VLinkProvider";

const Navlink:React.FC<{to: string, active?: boolean, children: React.ReactNode}> = ({to, children, active = false})=>{
    return(
        <VLinkProvider to={to} className={`text-base capitalize text-black 
            hover:text-blue-600
            transition-colors ease-in duration-300
            ${ active ? "text-blue-700 font-bold" : "font-normal"}
        `}>
            {children}
        </VLinkProvider>
    )
}

export default Navlink
