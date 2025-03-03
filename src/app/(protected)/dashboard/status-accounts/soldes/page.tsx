"use client";

import React from "react";
import {AccountStatus} from "@/app/(protected)/dashboard/status-accounts/soldes/components/accountStatus/accountStatus";
import {PayMethods} from "@/app/(protected)/dashboard/status-accounts/soldes/components/payMethods/payMethods";
import {
    MyLastTransactions
} from "@/app/(protected)/dashboard/status-accounts/soldes/components/lastTransactions/lastTransactions";

export default function SoldeAccountPage() {

    return (
        <div className={"flex flex-col gap-[25px] 2xl:w-[878px]"}>
            <AccountStatus />
            <PayMethods />
            <MyLastTransactions />
        </div>
    )
}
