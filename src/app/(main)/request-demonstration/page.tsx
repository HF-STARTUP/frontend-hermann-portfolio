"use client"

import React from "react";
import {HeroTitleColorized} from "@/components/typo/typo";
import {PrimaryBgSimpleWithVectorContainer} from "@/components/box/PrimaryBgCardContainer";
import Container from "@/components/box/Container";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";
import DateSelection from "@/app/(main)/request-demonstration/_components/DateSelection";
import AvailableHours from "@/app/(main)/request-demonstration/_components/AvailableHours";
import DemoPersonalInfoForm from "@/app/(main)/request-demonstration/_components/DemoPersonnaInfoForm";

const RequestDemonstrationPage: React.FC = () => {
    return (
        <PrimaryBgSimpleWithVectorContainer>
            <Container>
                <div className={`py-[44px]`}>
                    <HeroTitleColorized>Programmez une<br/>démonstration</HeroTitleColorized>
                    <div className={`pt-[32px] pb-[25px]`}>
                        <div className={`grid grid-cols-12 gap-4`}>
                            <div className={`col-span-12 lg:col-span-6 xl:col-span-3 h-full`}><DateSelection/></div>
                            <div className={`col-span-12 lg:col-span-6 xl:col-span-3 h-full`}><AvailableHours/></div>
                            <div className={`col-span-12 lg:col-span-12 xl:col-span-6 h-full`}><DemoPersonalInfoForm/>
                            </div>
                        </div>
                    </div>
                    <BtnBase color={'blue'} fit={true} variant={'outline'} to={NAVIGATIONS_URL.resumeDemo.url}>Valider le
                        programme</BtnBase>
                </div>
            </Container>
        </PrimaryBgSimpleWithVectorContainer>
    )
}


export default RequestDemonstrationPage
