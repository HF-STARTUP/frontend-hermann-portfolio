"use client";

import {AddButtonIcon, AddIconCircle} from "@/components/ui/__icons";
import React from "react";

export const ABtnAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <button className={"flex items-center gap-[10px]"}>
            <AddButtonIcon/>
            <div className="text-[#2554ae] text-base font-normal leading-[25px]">{children}</div>
        </button>
    )
}