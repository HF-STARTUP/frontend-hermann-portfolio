"use client";

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {AbonnTypeCard} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/acrtiveAbonn/activeAbonn";
import * as React from "react"

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import {usGetSubscriptionPacks} from "@/hooks/subscription/useSubscription";
import {useGetMyPosition} from "@/hooks/__globlal/useGlobalHook";
import Loading from "@/components/ui/Loader";

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
                    let textColor = "text-[#E51D13]"
                    let bgColor = "bg-gradient-to-r from-[#A70000] via-[#ff0000] to-[#A70000]"

                    switch (d._instance.name) {
                        case "starter particulier":
                            textColor = "text-[#002978]"
                            bgColor = "bg-gradient-to-r from-[#002978] via-[#2746C9] to-[#002978]"
                            break
                        case "premium particulier":
                            textColor = "text-[#002978]"
                            bgColor = "bg-gradient-to-r from-[#2E003E] via-[#6B27C9] to-[#2E003E]"
                            break
                        case "premium entreprise":
                            textColor = "text-[#ffcd6f]"
                            bgColor = "bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900]"
                            break
                    }
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
                                    logoColor={textColor}
                                    className={bgColor}
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
                <ABlockTitle>Autres packs d’abonnement</ABlockTitle>
            </div>
            <PackCaroussel/>
        </div>
    )
}
