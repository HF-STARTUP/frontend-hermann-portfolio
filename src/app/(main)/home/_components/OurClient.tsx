"use client";

import React from "react";
import Container from "@/components/box/Container";
import clients from '@/assets/img/illustrations/clients.png'
import Image from "next/image";

const OurClient = ()=> {
    return (
        <div>
            <Image src={clients} alt={'clients'} className={`lg:hidden w-[600px]`} />
            <div className={`py-[67px] bg-gradient-to-r from-orange-50 to-orange-50 relative`}>
                <Container>
                    <div>
                        <div className={`flex flex-col gap-[24px]`}>
                            <h2 className="text-black text-2xl lg:text-[40px] font-bold fpoppins leading-[50px]">Ce que nos clients disent</h2>
                            <p className="max-w-[532px] text-justify text-zinc-600 text-[10.44px] lg:text-base font-normal fpoppins">"Depuis que nous utilisons VTCC et sa suite d’applications, notre gestion de flotte est devenue plus efficace que jamais. Les fonctionnalités intuitives et les analyses détaillées nous ont permis de réaliser des économies significatives."</p>
                            <div className={`flex border-t pt-[12px] border-zinc-300 justify-between items-center gap-[5px] max-w-[532px]`}>
                                <div className={`lg:hidden`}>
                                    <IconButton active={false} />
                                </div>
                                <div className="w-[436px] text-justify text-zinc-600 text-base lg:text-2xl font-medium fpoppins">Modi Din Jacob</div>
                                <div className={`flex gap-[12px] justify-between`}>
                                    <div className={`hidden lg:block`}>
                                        <IconButton active={false} />
                                    </div>
                                    <IconButton active={true}/>
                                </div>
                            </div>
                        </div>
                        <Image src={clients} alt={'clients'} className={`hidden lg:block absolute right-0 bottom-0 w-[600px]`} />
                    </div>
                </Container>
            </div>
        </div>
    )
}


const IconButton:React.FC<{active?: boolean}> = ({active = true})=>{
    return(
        <button className={`w-9 h-9 -rotate-180 hover:opacity-85 ease-in ${active ? 'bg-blue-700 rotate-3' : 'bg-white border-2 border-blue-700 rotate-[-3deg]'} rounded-[70px] justify-center items-center inline-flex`}>
            {active ? <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.71509 17.9995L15.0037 11.7109L8.71509 5.42236" stroke="white" stroke-width="2.09619"
                      stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                : <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2849 5.00049L7.99634 11.2891L14.2849 17.5776" stroke="#215AD1" stroke-width="2.09619" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            }
        </button>
    )
}


export default OurClient
