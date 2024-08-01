"use client"

import {PrimaryBgSimpleWithVectorContainer} from "@/components/box/PrimaryBgCardContainer";
import React from "react";
import {HeroTitleColorized} from "@/components/typo/typo";
import Container from "@/components/box/Container";
import {
    PackResumeInfo,
    UserInfosCard
} from "@/app/(main)/tarif/payment-validation/[packID]/components/ResumeComponent/ResumeComponent";


export default function PayementValidationPage() {

    const nextDialogRef = React.useRef<any>(undefined)
    const nextDialog2Ref = React.useRef<any>(undefined)
    const [resumePageIsVisible, setResumePageIsVisible] = React.useState(false)
    const [userInfoCardISVisible, setUerInfoCardISVisible] = React.useState(true)

    const handleGoToResumePayPage = ()=> {
        setUerInfoCardISVisible(false)
        setResumePageIsVisible(true)
    }

    const handleBackToUserInfosCard = ()=> {
        setUerInfoCardISVisible(true)
        setResumePageIsVisible(false)
    }

    return (
        <div>
            <PrimaryBgSimpleWithVectorContainer>
                <Container>
                    <div className={`py-[44px]`}>
                        <HeroTitleColorized>Validation de<br/>votre achat</HeroTitleColorized>
                        <div className={`mt-[32px]`}>
                            <div className={`grid grid-cols-12 gap-6 h-full`}>
                                {userInfoCardISVisible && <div className={`col-span-12 lg:col-span-8`}>
                                    <UserInfosCard handleGoToResumePayPage={handleGoToResumePayPage}
                                                   nextDialogRef={nextDialog2Ref}/>
                                </div>}
                                <div className={`col-span-12 lg:col-span-4 h-full ${resumePageIsVisible ? '' : 'hidden'} lg:block`}>
                                    <PackResumeInfo handleBackToForm={handleBackToUserInfosCard} nextDialogRef={nextDialogRef}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </PrimaryBgSimpleWithVectorContainer>
        </div>
    )
}
