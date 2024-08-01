"use client"

import {PrimaryBgCardWithImageContainer} from "@/components/box/PrimaryBgCardContainer";
import Container from "@/components/box/Container";
import React from "react";
import checkBlue from '@/assets/img/icons/check-blue.png'
import checkRed from '@/assets/img/icons/check-red.png'
import checkYellow from '@/assets/img/icons/check-yellow.png'
import Image, {StaticImageData} from "next/image";
import BtnBase from "@/components/elements/BtnBase";
import BillOptionDialog from "@/app/(main)/tarif/components/tarifPayConfirmDialog/TarifPayConfirmDialog";
import {usGetSubscriptionPacks} from "@/hooks/subscription/useSubscription";
import Loading from "@/components/ui/Loader";
import {useGetMyPosition} from "@/hooks/__globlal/useGlobalHook";
import {Advantage, SubscriptionType} from "@/types/subscription.types";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import VLinkProvider from "@/components/helpers/VLinkProvider";


const CHECK_ICONS = {
    blue: checkBlue,
    red: checkRed,
    yellow: checkYellow
}

export type PackInterface = {
    id: string,
    variant: 'blue' | 'red' | 'yellow'
    packName: string
    packDesk: string
    packSubDesk: string
    packPrice: string
    packType: string
    disabledSize: number
    index?: number
    section?: number,
    advantages: Advantage[],
    amount: number,
    remise: number
}


const Packs: React.FC<{ children?: React.ReactNode }> = ({children}) => {

    return (
        <PrimaryBgCardWithImageContainer>
            <Container>
                <div className={`py-[48px] flex flex-col justify-center items-center gap-[29px]`}>
                    <div>
                        <h1 className="lg:max-w-[830px] text-2xl lg:text-[40px]  leading-[120%] text-center text-white text-[40px] font-bold ">
                            Optimisez la Gestion de votre flotte avec nos solutions innovantes
                        </h1>
                        <div className="max-w-[981px] text-center text-white/80 text-xl font-medium pt-[24px]">Que
                            vous
                            soyez une entreprise ou un particulier, notre plateforme de gestion des flottes s’adapte
                            à vos besoins spécifiques. Découvrez nos formules basiques et premium conçues pour
                            maximiser l’efficacité et la sécurité de votre flotte.
                        </div>
                    </div>
                    {children}
                </div>
            </Container>
        </PrimaryBgCardWithImageContainer>
    )
}


export const PackList: React.FC<{ index?: number }> = ({index = 0}) => {

    const [contry_code, set_contry_code] = React.useState<string>()

    const {isLoading: loading_position, data: position} = useGetMyPosition()

    const {
        data,
        isLoading,
        isSuccess
    } = usGetSubscriptionPacks(contry_code as string)

    React.useEffect(() => {
        if (position && Object.keys(position).length) {
            set_contry_code(position.country)
        }
    }, [position, loading_position])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    const subs_type = [SubscriptionType.Starter, SubscriptionType.Premium]

    if (data) {

        return (
            <div className={`flex items-center justify-center gap-[40px]`}>
                {
                    data.filter(d => d.subscription_type === subs_type[index]).map(d => {
                        return {
                            id: d.id,
                            variant: d.color,
                            packName: d.name,
                            packDesk: d.description,
                            packSubDesk: d.text_limitation,
                            packPrice: `${d.amount} ${d.currency}/mois`,
                            packType: d.text_remise,
                            disabledSize: 0,
                            advantages: d.advantages,
                            amount: d.amount,
                            remise: d.remise
                        } as PackInterface
                    }).map((pack, index) => (
                        <PackSubscription
                            pack={{...pack, index: index, section: index}}
                            key={index}
                        />
                    ))
                }
            </div>
        )
    }
}

const PackItem: React.FC<{
    label: string,
    icon: StaticImageData,
    isActive?: boolean,
    variant?: 'blue' | 'red' | 'yellow'
}> = ({label, isActive = true, icon, variant}) => {
    return (
        <div className={`${isActive ? '' : 'opacity-20'} flex justify-start items-start gap-[13px]`}>
            <Image className="h-4 w-4" src={icon} alt="pack check icon"/>
            <div className="text-black text-xs font-normal  break-words ">{label}</div>
        </div>
    );
}


const PackSubscription: React.FC<{ pack: PackInterface }> = ({pack,}) => {

    const variant = pack.variant

    const PACK_VARIATIONS = {
        blue: {
            colorClass: 'border-blue-700 text-blue-700',
            icon: CHECK_ICONS.blue,
        },
        red: {
            colorClass: 'border-red-700 text-red-700',
            icon: CHECK_ICONS.red,
        },
        yellow: {
            colorClass: 'border-amber-500 text-amber-500',
            icon: CHECK_ICONS.yellow,
        }
    }

    const currentVariation = PACK_VARIATIONS[variant]

    const isYellowVariant = variant === 'yellow'

    const {data, isLoading, isSuccess} = useUserProfile()

    return (
        <div className={`col-span-12 lg:col-span-6 relative flex justify-start max-w-[430px]`}>
            {isYellowVariant && <div
                className="hidden h-[34px] absolute top-[-34px] px-[39px] pt-[7px] pb-1.5 bg-gradient-to-l bg-black to-[#2a2a2a] rounded-tl-2xl rounded-tr-2xl justify-center items-center lg:inline-flex">
                <div className="text-center text-white text-base font-bold">Recommandée</div>
            </div>}
            <div
                className={`h-full px-4 py-[23px] bg-white rounded-md border-2 ${currentVariation.colorClass} flex flex-col justify-start items-start gap-2.5`}>
                <div className="flex flex-col justify-start items-start gap-[15px]">
                    <div className="text-black text-2xl font-bold leading-[41px]">{pack.packName}</div>
                    <div className="text-black text-base font-medium">{pack.packDesk}</div>
                    <div className="text-zinc-500 text-sm font-medium">{pack.packSubDesk}</div>
                    <div
                        className={`${currentVariation.colorClass} text-[40px] font-bold leading-[41px]`}>{pack.packPrice}</div>
                    <div className={`${currentVariation.colorClass} text-sm font-bold`}>{pack.packType}</div>
                    <div className="flex flex-col justify-start items-start gap-2">
                        {pack.advantages.map((advantage, index) => {
                            return (
                                <PackItem key={index} icon={currentVariation.icon} label={advantage.title}
                                          isActive={advantage.active}/>
                            );
                        })}
                    </div>
                    {isLoading && <Loading/>}
                    {!isLoading && <div>
                        {data && isSuccess && <BillOptionDialog
                            pack={pack.variant}
                            pack_obj={pack}
                        >
                            <BtnBase to={''} color={"black"} fullwidth={true} variant={'outline'}>Commencer</BtnBase>
                        </BillOptionDialog>
                        }
                        {!data && (
                            <VLinkProvider to={`/auth/register/startup?return_url=${window.location.href}`}>
                                <BtnBase
                                    to={''}
                                    color={"black"}
                                    fullwidth={true}
                                    variant={'outline'}
                                >
                                    Commencer
                                </BtnBase>
                            </VLinkProvider>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    );
};


export default Packs
