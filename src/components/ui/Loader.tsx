"use client"

import React from "react"
import { Bars, Oval, RotatingLines } from "react-loader-spinner"
import { cn } from "@/utils/ui/cn"
import CardTitle from "./custom/CardTitle"

export default function Loading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(
            `w-full font-bold text-admin-primary h-[300px] flex justify-center items-center`,
            className
        )} {...props}>
            <RotatingLines
                visible={true}
                width={"30"}
                strokeWidth="2"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor={'currentcolor'}
            />
        </div>
    )
}


export function LoadingBar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('text-admin-primary h-[50px]', className)} {...props}>
            <Bars
                visible={true}
                width={"15"}
                ariaLabel="rotating-lines-loading"
                color={'currentcolor'}
            />
        </div>
    )
}

export function CircularProgress({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('text-admin-primary h-[50px]', className)} {...props}>
            <Oval
                color={'#2554AE'}
                secondaryColor={"#2554AE"}
            />
        </div>
    )
}

