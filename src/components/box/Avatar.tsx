import React from "react";
import Image from "next/image";
import VImageProvider from "@/components/helpers/VImageProvider";
import {cn} from "@/utils/ui/cn";

const Avatar:React.FC<{src: string, w: number, h: number}&React.HTMLAttributes<HTMLDivElement>> = ({src, h, w, className})=>{
    return(
        <VImageProvider src={src} alt={src} height={h} width={w} className={cn(
            `rounded-full bg-[#fab491] hover:opacity-75 transition ease-in duration-200`, className
        )}/>
    )
}

export default Avatar
