"use client";

import PrimaryBgCardContainer from "@/components/box/PrimaryBgCardContainer";
import React from "react";
import Image from "next/image";
import heroImage from '@/assets/img/illustrations/hero-bg-image.jpg'
import vtccDashboardPass from '@/assets/img/illustrations/vtccDashboardPass.png'
import Container from "@/components/box/Container";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";
import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";

const Hero = () => {

    const CONTROLS = [
        'Devenez plus performant',
        'Optimisez vos process',
        'Accelerez votre croissance'
    ]

    const words = [
        {
            text: "À",
        },
        {
            text: "partir",
        },
        {
            text: "de",
        },
        {
            text: "250 $/mois.",
            className: "text-yellow-400 font-bold",
        },
    ];

    return (
        <PrimaryBgCardContainer>
            <div className={`h-full flex relative items-end justify-end`}>
                <div className={'xl:absolute left-0 top-0 h-full w-full'}>
                    <Container>
                        <div
                            className={`flex flex-col gap-[18px] min-[1279px]:py-[20px] min-[1450px]:py-[35px] min-[1550px]:py-[76px] py-[76px]`}>
                            <h1 className={`text-white text-2xl max-w-[509px] 
                            min-[1381px]:text-[32px] min-[1381px]:max-w-[509px] 
                            max-[1380px]:text-[24px] max-[1380px]:max-w-[420px]
                            font-medium 
                            `}>Professionalisez votre
                                flotte automobile
                                avec <span className={`font-bold fpoppins`}>VTCControl</span></h1>
                            {/*<p className={`text-white text-[32px] font-bold fpoppins`}>Control</p>*/}
                            <ul className={`pl-[25px]`}>
                                {CONTROLS.map((control, index) => (
                                    <li key={index}
                                        className={`text-white text-base font-medium list-disc`}>{control}</li>
                                ))}
                            </ul>
                            <div className={`text-white text-xl font-medium`}>
                                <TypewriterEffectSmooth words={words}/>
                            </div>
                            <div className={`flex gap-1 md:gap-5 mt-[23px]`}>
                                <BtnBase responsive={true} size={"sm"} fontWeight={'bold'} color={'white'}
                                         variant={'outline'} to={NAVIGATIONS_URL.requestDemo.url}>Demander une
                                    démo</BtnBase>
                                <BtnBase responsive={true} size={"sm"} fontWeight={'bold'} color={'yellow'}
                                         variant={'contained'} to={NAVIGATIONS_URL.tarif.url}>Commencer</BtnBase>
                            </div>
                        </div>
                    </Container>
                </div>
                <Image src={vtccDashboardPass} alt="design vector line"
                       className={'absolute bottom-[67px] z-10 w-[197px] 2xl:w-[297px] left-[47%] hidden xl:block '}/>
                <Image src={heroImage} alt={'Hero image'} priority={true} className={'w-1/2 hidden xl:block'}/>
            </div>
        </PrimaryBgCardContainer>
    )
}

export default Hero

// animate-bounce ease-linear 1s
