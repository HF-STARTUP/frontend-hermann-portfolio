import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import * as React from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead
} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {CrownIcon} from "@/components/ui/__icons";

export const AABonnHistory = () => {

    return (
        <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
            <div className={"mb-[23px]"}>
                <ABlockTitle>Historique d’abonnementss</ABlockTitle>
            </div>
            <TabsNav/>
        </div>
    )
}

export function TabsNav() {
    return (
        <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Tous (15)</TabsTrigger>
                <TabsTrigger value="password">Sélectionnez une période</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className={""}>
                <HistoryTable/>
            </TabsContent>
            <TabsContent value="password">
                <HistoryTable/>
            </TabsContent>
        </Tabs>
    )
}


const HistoryTable = () => {

    const invoices = [
        {
            start: "12/08/2024",
            end: "12/08/2024",
            type: "PREMIUM"
        },
        {
            start: "12/08/2024",
            end: "12/08/2024",
            type: "ESSENTIEL"
        },
        {
            start: "12/08/2024",
            end: "12/08/2024",
            type: "PREMIUM"
        },
        {
            start: "12/08/2024",
            end: "12/08/2024",
            type: "ESSENTIEL"
        },
        {
            start: "12/08/2024",
            end: "12/08/2024",
            type: "PREMIUM"
        },
    ]

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
                    {invoices.map((invoice) => {

                        const isAbon = invoice.type === "ESSENTIEL" || invoice.type === "PREMIUM"
                        const isEssential = invoice.type === "ESSENTIEL"
                        const isPremium = invoice.type === "PREMIUM"

                        return (
                            <TableRow key={invoice.start}>
                                <TableCell className="font-medium">{invoice.start}</TableCell>
                                <TableCell>{invoice.end}</TableCell>
                                <TableCell className={cn(
                                    "font-bold",
                                    isEssential && "text-[#e51d13] bg-[#FFEBEA] flex items-center justify-center gap-[8.8px] h-[30px] px-[2px] py-[0.88px] rounded-sm",
                                    isPremium && "text-[#E89900] bg-[#FFF8DE] flex items-center justify-center gap-[8.8px] h-[30px] px-[15px] py-[0.88px] rounded-sm",
                                )}>
                                    {isAbon && <CrownIcon/>}
                                    {invoice.type}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export const AbonnTag: React.FC<{ label: string }> = ({label}) => {
    const isAbon = label === "ESSENTIEL" || label === "PREMIUM"
    const isEssential = label === "ESSENTIEL"
    const isPremium = label === "PREMIUM"

    return (
        <div className={cn(
            "font-bold",
            isEssential && "text-[#e51d13] bg-[#FFEBEA] flex items-center justify-center gap-[8.8px] h-[30px] px-[2px] py-[0.88px] rounded-sm",
            isPremium && "text-[#E89900] bg-[#FFF8DE] flex items-center justify-center gap-[8.8px] h-[30px] px-[15px] py-[0.88px] rounded-sm",
        )}>
            {isAbon && <CrownIcon/>}
            {label}
        </div>
    )
}