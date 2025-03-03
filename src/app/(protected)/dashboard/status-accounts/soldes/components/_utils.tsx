"use client";

import React from "react";
import {cn} from "@/lib/utils";

export const SectionTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {

    return (
        <div className={cn("text-[#506D82] text-xl font-bold leading-[25px]", className)}>{ children }</div>
    )
}