"use client"

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import * as React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {CrownIcon} from "@/components/ui/__icons";
import {useGetSubscriptionHistoryOnFleet} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export const AABonnHistory = () => {

    return (
        <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
            <div className={"mb-[23px]"}>
                <ABlockTitle>Historique d’abonnements</ABlockTitle>
            </div>
            <div className={"overflow-hidden"}>
                <TabsNav/>
            </div>
        </div>
    )
}

export function TabsNav() {

    const {data: abonList, isLoading} = useGetSubscriptionHistoryOnFleet()
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <>
            <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Tous ({abonList?.length ?? "-"})</TabsTrigger>
                    <TooltipProvider>
                        <Tooltip defaultOpen={true}>
                            <TooltipTrigger>
                                <TabsTrigger value="password" disabled={true}>Sélectionnez une période</TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Pas encore assez de données.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TabsList>
                <TabsContent value="account" className={""}>
                    <HistoryTable/>
                </TabsContent>
                <TabsContent value="password">
                    <HistoryTable/>
                </TabsContent>
            </Tabs>
            {/*<Calendar*/}
            {/*    mode="single"*/}
            {/*    selected={date}*/}
            {/*    onSelect={setDate}*/}
            {/*    className="rounded-md border"*/}
            {/*/>*/}
        </>
    )
}


const HistoryTable = () => {

    const {data: abonList, isLoading} = useGetSubscriptionHistoryOnFleet()

    if (isLoading) {

        return <Loading/>
    }

    if (abonList && abonList.length) {
        return (
            <div className={"w-full"}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date souscription</TableHead>
                            <TableHead>Date d’expiration</TableHead>
                            <TableHead>Abonnement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {abonList.map((abon) => {

                            const abonType = abon.subscription.subscriptionType

                            const isAbon = abonType === "ESSENTIEL" || abonType === "PREMIUM"
                            const isEssential = abonType === "ESSENTIEL" || abonType == "tryfree"
                            const isPremium = abonType === "PREMIUM"

                            return (
                                <TableRow key={abon.id}>
                                    <TableCell className="font-medium">{abon.startDate}</TableCell>
                                    <TableCell>{abon.endDate}</TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "font-bold",
                                            isEssential && "text-[#e51d13] bg-[#FFEBEA] flex items-center justify-center gap-[8.8px] h-[30px] px-[2px] py-[0.88px] rounded-sm",
                                            isPremium && "text-[#E89900] bg-[#FFF8DE] flex items-center justify-center gap-[8.8px] h-[30px] px-[15px] py-[0.88px] rounded-sm",
                                        )}>
                                            {isAbon && <CrownIcon/>}
                                            {abon.subscription.name}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export const AbonnTag: React.FC<{ label: string }> = ({label}) => {
    const isAbon = label === "ESSENTIEL" || label === "PREMIUM"
    const isEssential = label === "ESSENTIEL"
    const isPremium = label === "PREMIUM"
    const isFree = label === "Essaie gratuit"

    return (
        <div className={cn(
            "font-bold uppercase flex items-center justify-center gap-[8.8px] h-[30px] px-[5px] lg:px-[10px] py-[0.88px] rounded-sm",
            isEssential && "text-[#e51d13] bg-[#FFEBEA]",
            isPremium && "text-[#E89900] bg-[#FFF8DE]",
            isFree && "text-[#83BF6E] bg-[#EAFAE5]",
            "text-[0.5rem] lg:text-xs"
        )}>
            {isAbon && <CrownIcon/>}
            {label}
        </div>
    )
}