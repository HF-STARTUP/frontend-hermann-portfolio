"use client"
import React, {useMemo} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {useGetOperatorsRevenus} from "@/hooks/admin/useFleetHook";
import {toIsoDate} from "@/services/Service";
import {endOfMonth, startOfMonth} from "date-fns";
import {formatNumber} from "@/lib/utils";
import Loading from "@/components/ui/Loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";

type PaymentMethod = {
    name: string,
    amount: string,
    progress: number, // Approximate progress based on the visual
    path?: string
}

export default function PaymentMethods() {

    const [method, setMethod] = React.useState<string>("Ce Mois")
    const curDate = new Date();

    const {data, isLoading} = useGetOperatorsRevenus({
        start_date: toIsoDate(startOfMonth(curDate)),
        end_date: toIsoDate(endOfMonth(curDate))
    })

    const paymentMethods: PaymentMethod[] = useMemo(() => {
        if (!data || data.length === 0) return []

        const total = data.reduce((sum, d) => sum + d.total_amount, 0)

        return data.map(d => ({
            name: d.operator_name,
            amount: `${formatNumber(d.total_amount)} ${d.currency}`,
            progress: total > 0 ? Math.round((d.total_amount / total) * 100) : 0,
            path: d.path
        }))
    }, [data])

    return (
        <Card className="bg-[#ffffff] shadow-none border-0">
            <CardContent className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <ABlockTitle className="text-[#1a1c21] text-4xl font-bold leading-tight">
                        Moyen de paiement
                    </ABlockTitle>

                    <Select
                        value={method}
                        onValueChange={setMethod}
                    >
                        <SelectTrigger className="w-fit bg-slate-50">
                            <SelectValue placeholder="Selectionner"/>
                        </SelectTrigger>
                        <SelectContent>
                            {["Ce Mois"].map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {isLoading && <div>
                    <Loading/>
                </div>}

                {/* Payment Methods List */}
                <ScrollArea className={"h-[500px]"}>
                    <div className="space-y-6 ">
                        {paymentMethods.map((method, index) => (
                            <PaymentMethod
                                key={index}
                                method={method}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

const PaymentMethod: React.FC<{ method: PaymentMethod }> = ({method}) => {
    return (
        <div className="flex items-center gap-6 group">
            {/* Wave Logo */}
            {method.path && <div
                className="size-16 overflow-hidden bg-[#2d99fe] rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                    src={`${method.path}`}
                    alt={method.path ?? ""}
                    width={50}
                    height={50}
                />
            </div>}

            <div className={"flex-1"}>
                <div className={"flex justify-between items-center mb-2"}>
                    {/* Method Name */}
                    <div className="text-[#1a1c21] text-xl font-medium min-w-[80px]">{method.name}</div>

                    {/* Amount */}
                    <div
                        className="text-[#1a1c21] text-xl font-semibold min-w-[140px] text-right"
                    >
                        {method.amount}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 ">
                    <div className="w-full bg-[#f0f1f3] rounded-full h-3 group-hover:scale-[1.01] transition">
                        <div
                            className="bg-[#2d99fe] h-3 rounded-full transition-all duration-300"
                            style={{width: `${method.progress}%`}}
                        ></div>
                    </div>
                </div>
            </div>

        </div>
    )
}