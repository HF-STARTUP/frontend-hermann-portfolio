"use client";

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {AbonnTypeCard} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/acrtiveAbonn/activeAbonn";
import * as React from "react"

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {usGetSubscriptionPacks} from "@/hooks/subscription/useSubscription";
import {useGetMyPosition} from "@/hooks/__globlal/useGlobalHook";
import Loading from "@/components/ui/Loader";
import {getSubscriptionColors} from "@/utils/subscriptionColors";

export function PackCaroussel() {


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

    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-1">
                {data && data.map((d, i) => {
                    const colors = getSubscriptionColors(d._instance.name);
                    
                    return (
                        <CarouselItem
                            key={i}
                            className="pl-1 md:basis-1/2 lg:basis-1/2"
                        >
                            <div className="p-1">
                                <AbonnTypeCard
                                    id={d.id}
                                    title={`${d.name}`}
                                    subtitle={`${d._instance.amount}${d._instance.currency}/véhicule/${d._instance.period}`}
                                    action={
                                        <ChangePackBtn/>
                                    }
                                    logoColor={colors.textColor}
                                    className={colors.bgColor}
                                />
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className={"hidden md:block"}/>
            <CarouselNext className={"hidden md:block"}/>
        </Carousel>
    )
}

const ChangePackBtn = () => {

    return (
        <button
            className={"text-center text-black text-sm font-bold font-['DM Sans'] leading-3 px-2 py-[3.90px] bg-white rounded-md "}
        >
            Changer
        </button>
    )
}

export const OtherPack = () => {

    return (
        <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
            <div className={"mb-[23px]"}>
                <ABlockTitle>Autres packs d'abonnement</ABlockTitle>
            </div>
            <PackCaroussel/>
        </div>
    )
}
