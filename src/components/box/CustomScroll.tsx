"use client";

import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

export const CustomScroll: React.FC<{
    overflowAxis?: 'y' | 'x',
    ctx?: 'dialog' | 'default' | 'dialogMin' | 'extends'
} & React.HTMLAttributes<HTMLDivElement>> = ({ctx = 'default', overflowAxis = 'y', children, ...props}) => {

    const isYaxis = overflowAxis === 'y'
    const isDefaultCtx = ctx === 'default'
    const isDialogMin = ctx === 'dialogMin'
    const isExtendedScroll = ctx === 'extends'

    return (
        <ScrollArea
            className={`${isExtendedScroll ? `h-[580px]` : (isDefaultCtx ? 'h-[520px]' : (isDialogMin ? 'h-[400px]' : 'h-[460px]'))} transition ease-in duration-200`}>
            {children}
        </ScrollArea>
    )
}
