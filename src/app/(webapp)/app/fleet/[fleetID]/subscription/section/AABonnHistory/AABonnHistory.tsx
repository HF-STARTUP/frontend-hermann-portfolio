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
import {getSubscriptionColors, getSubscriptionType, shouldShowCrown} from "@/utils/subscriptionColors";

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
                            const colors = getSubscriptionColors(abon.subscription.name);
                            const showCrown = shouldShowCrown(abon.subscription.name);

                            return (
                                <TableRow key={abon.id}>
                                    <TableCell className="font-medium">{abon.startDate}</TableCell>
                                    <TableCell>{abon.endDate}</TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "font-bold flex items-center justify-center gap-[8.8px] h-[30px] px-[5px] py-[0.88px] rounded-sm",
                                            colors.textColor,
                                            colors.tagBgColor,
                                        )}>
                                            {showCrown && <CrownIcon/>}
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
    const subscriptionType = getSubscriptionType(label);
    const colors = getSubscriptionColors(label);
    const showCrown = shouldShowCrown(label);

    return (
        <div className={cn(
            "font-bold uppercase flex items-center justify-center gap-[8.8px] h-[30px] px-[5px] lg:px-[10px] py-[0.88px] rounded-sm",
            colors.textColor,
            colors.tagBgColor,
            "text-[0.5rem] lg:text-xs"
        )}>
            {showCrown && <CrownIcon/>}
            {label}
        </div>
    )
}