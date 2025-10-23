"use client";

import React from "react";
import Image from "next/image";
import vectorLine from '@/assets/img/design/vectorLine.png'
import vectorLineDark from '@/assets/img/design/vectorLineDark.png'
import vectorLineTop from '@/assets/img/design/vectorLineTop.png'
import vectorLineImageTop from '@/assets/img/design/vectorLineImageTop.png'
import vectorLineImageBottom from '@/assets/img/design/vectorLineImageBottom.png'
import vBtnDark from "@/assets/img/design/vBtnDark.png"
import vTopDark from "@/assets/img/design/vTopDark.png"
import Container from "@/components/box/Container";
import {HeroTitleColorized} from "@/components/typo/typo";

const PrimaryBgCardContainer: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    return (
        <div className={`bg-gradient-to-l from-blue-700 to-sky-500 relative`}>
            <div className={`h-full`}>
                <div className={`z-10 h-full relative`}>
                    {children}
                </div>
                <Image src={vectorLine} alt="design vector line" width={800}
                       className={'absolute bottom-0 right-0 z-0 animate-pulse'}/>
            </div>
        </div>
    )
}

export const PrimaryBgCardWhiteContainer: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    return (
        <div className="relative bg-white">
            <div className="z-10 h-full relative">
                {children}
            </div>
            <Image src={vectorLineTop} alt="design vector line top" width={280}
                   className="absolute top-0 left-0 z-0"/>
            <Image src={vectorLineDark} alt="design vector line" width={500}
                   className="absolute bottom-0 right-0 z-0 animate-pulse"/>
        </div>
    )
}


export const PrimaryBgCardWithImageContainer: React.FC<{ children?: React.ReactNode, bg?: string }> = ({children, bg}) => {

    const bgImage = bg ?? "bg-[url('/assets/tarif-hero.jpeg')]"

    return (
        <div className={`relative ${bgImage} bg-no-repeat bg-cover`}>
            <div className={`relative z-10 h-ful ${bg ? '' : 'bg-gradient-to-r from-black to-blackl'}`}>
                {children}
            </div>
            <Image src={vectorLineImageTop} alt="design vector line top" width={980}
                   className="absolute top-0 left-0 z-0 hidden lg:block"/>
            <Image src={vectorLineImageBottom} alt="design vector line" width={500}
                   className="absolute bottom-0 right-0 z-0 hidden lg:block"/>
        </div>
    )
}

export const PrimaryBgSimpleWithVectorContainer: React.FC<{ children?: React.ReactNode, bg?: string }> = ({children, bg}) => {


    return (
        <div className={`relative`}>
            <div className={`relative z-10 h-ful'}`}>
                {children}
            </div>
            <Image src={vTopDark} alt="design vector line top" width={980}
                   className="absolute top-0 left-0 z-0"/>
            <Image src={vBtnDark} alt="design vector line" width={900}
                   className="absolute bottom-0 right-0 z-0"/>
        </div>
    )
}



export const MiddleHeadContainer:React.FC<{children: React.ReactNode}> = ({children})=> {
    return(
        <div className={`py-[44px] relative overflow-y-hidden`}>
            <Container>
                <div>
                    <Image src={vectorLineTop} alt="design vector line top" width={900}
                           className="absolute top-0 left-0 z-0"/>
                   <HeroTitleColorized>{children}</HeroTitleColorized>
                </div>
            </Container>
        </div>
    )
}


export default PrimaryBgCardContainer
