"use client"

import {ActiveAbonnSection} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/acrtiveAbonn/activeAbonn";
import {AABonnHistory} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/AABonnHistory/AABonnHistory";
import {OtherPack} from "@/app/(webapp)/app/fleet/[fleetID]/subscription/section/otherPack/OtherPack";

export default function ASubscriptionPage() {
    return (
        <div>
            <div className={"grid grid-cols-12 gap-[32px]"}>
                <div className={"col-span-12 2xl:col-span-6"}>
                    <ActiveAbonnSection/>
                    <div className={"mt-[42px]"}>
                        <OtherPack/>
                    </div>
                </div>
                <div className={"col-span-12 2xl:col-span-6"}>
                    <AABonnHistory/>
                </div>
            </div>
        </div>
    )
}