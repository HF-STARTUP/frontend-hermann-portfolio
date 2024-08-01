import React from "react";
import Container from "@/components/box/Container";
import valueItem from '@/assets/img/icons/valueItem.png'
import Image from "next/image";
import {PrimaryBgCardWhiteContainer} from "@/components/box/PrimaryBgCardContainer";
import bulles from '@/assets/img/design/bulles.png'

const PlusValues = () => {

    return (
        <PrimaryBgCardWhiteContainer>
            <div className={`h-full z-10`}>
                <Container>
                    <div className={`py-[40px]  lg:py-[70px] flex flex-col gap-[32px] lg:gap-0 lg:flex-row lg:justify-between`}>
                        <div className={'flex flex-col gap-[46px]'}>
                            <div className="text-blue-700 text-2xl lg:text-[40px] font-bold text-center lg:text-left leading-[41px] lg:max-w-[200px]">Nos plus-values
                            </div>
                            <Image src={bulles} alt={'bulles'} className={`hidden lg:block`} width={250} />
                        </div>
                        <ValueItems/>
                    </div>
                </Container>
            </div>
        </PrimaryBgCardWhiteContainer>
    )
}

const ValueItems = () => {
    const PLUS_VALUES = [
        {
            title: 'Assistance 24H/7 :',
            desk: 'Notre équipe d\'assistance dédiée est disponible à tout moment pour répondre à vos questions, vous guider à travers chaque étape, assurant une intégration sans heurts et une utilisation optimale de la plateforme.'
        },
        {
            title: 'Sécurité Avancée :',
            desk: 'Protégez vos données sensibles avec notre infrastructure sécurisée et nos protocoles de cryptage avancés.'
        },
        {
            title: 'Action étendue :',
            desk: 'Profitez de la suite d’applications dédiées qui accompagne la plateforme.'
        }
    ]

    return (
        <div className={`flex flex-col lg:flex-row justify-between gap-[24px] lg:gap-[120px]`}>
            {PLUS_VALUES.map((item, key) => (
                <ValueItem key={key} title={item.title} desk={item.desk}/>
            ))}
        </div>
    )
}

const ValueItem: React.FC<{ title: string, desk: string }> = ({title, desk}) => {

    return (
        <div className={`flex items-center lg:items-start lg:justify-start flex-col gap-[14px] lg:gap-[18px] text-center lg:text-left`}>
            <Image src={valueItem} alt={'item'} width={32} className={`hidden lg:block mb-[12px]`}/>
            <h4 className="text-zinc-900 text-base lg:text-xl font-bold  leading-7 tracking-tight">{title}</h4>
            <p className="lg:w-[196px] text-base font-normal  leading-relaxed tracking-tight text-[#5F5F64] lg:text-left">{desk}</p>
        </div>
    )
}


export default PlusValues
