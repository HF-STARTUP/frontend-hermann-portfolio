import React from "react";

export const AuthHead:React.FC<{title: string, subtitle: string}> = ({title, subtitle})=>{
    return (
        <div className="relative mb-[21px] lg:mb-[40px]">
            <h1 className="text-black text-2xl lg:text-[40.39px] font-bold leading-[62.83px]">{ title }</h1>
            <div className="text-gray-500 text-lg font-normal leading-[17.95px] mb-[30px]">{ subtitle }</div>
            <div className="w-full h-[0px] lg:border lg:border-slate-200"></div>
        </div>
    )
}

export default AuthHead
