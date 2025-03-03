"use client";

import Container from "@/components/box/Container";
import BtnBase from "@/components/elements/BtnBase";
import React from "react";
import NAVIGATIONS_URL from "@/utils/navigation";
import {FunCards} from "@/app/(main)/home/_components/Fonctionnalities";

const Advantages = () => {
    return (
        <div className={`relative bg-indigo-50 py-[90px]`}>
            <Container>
                <div className={'flex flex-col justify-center items-center gap-[74px] py-5'}>
                    <div>
                        <FunCards/>
                    </div>
                    <div className={``}>
                        <BtnBase color={'blue'} variant={'outline'} to={NAVIGATIONS_URL.requestDemo.url}>Planifier une
                            démo</BtnBase>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Advantages
