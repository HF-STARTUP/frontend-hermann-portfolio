import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {AbonnTypeCard} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/acrtiveAbonn/activeAbonn";
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function PackCaroussel() {
    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-1">
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                        <AbonnTypeCard
                            title={"PREMIUM PARTICULIER"}
                            subtitle={"1000XAF/véhicule/mois"}
                            // action={
                            //     <ChangePackBtn/>
                            // }
                            logoColor={"text-[#E51D13]"}
                            className={"bg-gradient-to-r from-[#A70000] via-[#ff0000] to-[#A70000]"}
                        />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                        <AbonnTypeCard
                            title={"STARTER PARTICULIER"}
                            subtitle={"1000XAF/véhicule/mois"}
                            // action={
                            //     <ChangePackBtn/>
                            // }
                            logoColor={"text-[#002978]"}
                            className={"bg-gradient-to-r from-[#002978] via-[#2746C9] to-[#002978]"}
                        />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                        <AbonnTypeCard
                            title={"STARTER PARTICULIER"}
                            subtitle={"1000XAF/véhicule/mois"}
                            // action={
                            //     <ChangePackBtn/>
                            // }
                            logoColor={"text-[#002978]"}
                            className={"bg-gradient-to-r from-[#2E003E] via-[#6B27C9] to-[#2E003E]"}
                        />
                    </div>
                </CarouselItem>
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
