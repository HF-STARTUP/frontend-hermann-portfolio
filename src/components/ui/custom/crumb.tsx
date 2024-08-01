"use client"

import React from "react";
import {cn} from "@/lib/utils";

type CrumbType = { label: string, url: string }

export const Crumb: React.FC<React.HTMLAttributes<HTMLDivElement> & { items: CrumbType[] }> = ({
                                                                                                   items,
                                                                                                   className,
                                                                                                   ...props
                                                                                               }) => {

    const crumbItemsDefault: CrumbType = {
        label: "Admin VTCControl /",
        url: "/"
    }

    return (
        <div className={cn(
            "text-[#707eae] text-sm font-medium font-['DM Sans'] leading-normal flex items-center gap-2 mb-[10px]",
            className,
        )}
             {...props}
        >
            {
                [crumbItemsDefault, ...items].map((item, index) => (
                    <div key={index}>{item.label}</div>
                ))
            }
        </div>
    )
}