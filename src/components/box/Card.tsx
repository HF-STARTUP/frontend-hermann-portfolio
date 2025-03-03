"use client";

import React from "react";

const CardDefault:React.FC<{children:React.ReactNode} & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({children,...props})=>{

    return (
        <div className={`h-full`}>
            <div className={`py-[36px] px-[16px] bg-white rounded-md border border-neutral-400 border-opacity-60 h-full`}>
                {children}
            </div>
        </div>
    )
}

export const Divider:React.FC = ()=>{

    return (
        <div className="w-full h-[0px] border border-neutral-200"></div>
    )
}

export default CardDefault


export const AdminSettingBox:React.FC<{children: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props })=> {
    return (
        <div className={`p-[34px]`} {...props}>
            {children}
        </div>
    )
}
