"use client"
import React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import Loading from "@/components/ui/Loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import Image from "next/image";
import {imageBaseUrl} from "@/model/Model";
import {EmptyData} from "@/components/box/PageNetworkState";
import {useDashboardPaymentMethods} from "@/app/(webapp)/app/dashboard/_hook/useDashboardSectionsHooks";

type PaymentMethod = {
    name: string,
    amount: string,
    progress: number, // Approximate progress based on the visual
    path?: string
}

export default function PaymentMethods() {

    const [method, setMethod] = React.useState<string>("Ce Mois")
    const {paymentMethods, isLoading} = useDashboardPaymentMethods()

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

                {
                    !paymentMethods.length && !isLoading && (
                        <EmptyData
                            message={"Aucune donnée pour le moment"}
                        />
                    )
                }

                {/* Payment Methods List */}
                {paymentMethods && paymentMethods.length ? <ScrollArea className={"h-[500px]"}>
                    <div className="space-y-6 ">
                        {paymentMethods.map((method, index) => (
                            <PaymentMethod
                                key={index}
                                method={method}
                            />
                        ))}
                    </div>
                </ScrollArea> : <span></span>}
            </CardContent>
        </Card>
    )
}

const PaymentMethod: React.FC<{ method: PaymentMethod }> = ({method}) => {
    return (
        <div className="flex items-center gap-6 group">
            {/* Wave Logo */}
            {method.path && <div
                className="size-8 overflow-hidden bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                    src={`${imageBaseUrl}/${method.path}`}
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

