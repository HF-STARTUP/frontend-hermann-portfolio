import React from "react";
import {cn} from "@/utils/ui/cn";

export const Stack:React.FC<{variant?: 'default'|'md', children: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>> = ({children, variant= 'default', className})=> {

    const isMd = variant === 'md'

    return (
        <div className={cn(`flex flex-col lg:flex-row ${isMd ? 'gap-[12px] ' : 'gap-[23px] '} items-start w-full`, className)}>
            {children}
        </div>
    )
}
