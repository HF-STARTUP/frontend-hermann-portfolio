"use client"

import React from "react";
import {AdminDataTableDisplayProps} from "@/types/dataDisplayTable";
import AdminTableDisplayData from "@/components/display/AdminTableDisplayData";
import {PlusIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    CreateAccountingOrSubAccounting
} from "@/app/(protected)/dashboard/status-accounts/simplified/actions/createAccountingActionDialog/CreateAccountingOrSubAccountingDialog";
import {AccountingPnlResponseType} from "@/types/Accounting.types";
import {useRouter} from "next/navigation";

function generateTableData(data: AccountingPnlResponseType) {

    const headers = [
        'Nom de la flotte',
        'Propriétaire',
        'Ville',
        'Véhicules',
        'Chauffeurs',
        'Date d’ajout',
        'CA total',
        'Abonnement',
        'Date d’exp',
        'Statut'
    ];

    const body = ["", ""]

    return {
        variant: 'v2',
        head: headers,
        body: body,
    };
}

export default function FleetListAccount() {

    const $router = useRouter()

    const headers = [
        'Nom de la flotte',
        'Propriétaire',
        'Ville',
        'Véhicules',
        'Chauffeurs',
        'Date d’ajout',
        'CA total',
        'Abonnement',
        'Date d’exp',
        'Statut'
    ];

    const body = Array.from({length: 6}).map(() => {
        return ["Yfleet Cameroun", "Christian Onguene", "Kinshasa", "15", "24", "15/08/2024", "1,500,000", "ESSENTIEL", "15/11/2024", "Active"]
    })


    const config: AdminDataTableDisplayProps = {
        variant: 'v2',
        head: headers,
        body: body,
        footer: [],
        callback: () => {
            $router.push("/app/fleet/03fecf9a-3715-480f-b41a-daa35256257a/dashboard")
        }
    };


    return (
        <div className={`flex gap-[30px] flex-wrap flex-col`}>
            <AdminTableDisplayData data={config}/>
        </div>
    )
}


export function FournisseurListTab() {

    const headers = [
        'IMEI',
        'Nom du GPS',
        'Flotte',
        'No. de téléphone',
        'Ville',
        'Dernier statut en ligne',
        'Statut'
    ];

    const body = Array.from({length: 6}).map(() => {
        return ["547800543741232", "CE 920 BF", "Yfleet Cameroon", "+237 698 112 491", "Kinshasa", "il y’a 3 heures", "Active"]
    })

    const config: AdminDataTableDisplayProps = {
        variant: 'v2',
        head: headers,
        body: body,
        footer: [],
        callback: () => {
        }
    };

    return (
        <div className={`flex gap-[30px] flex-wrap flex-col`}>
            <AdminTableDisplayData data={config}/>
        </div>
    )
}

const SimplifiedStatusAccountList: React.FC<{ table: AdminDataTableDisplayProps }> = ({table}) => {

    return (
        <AdminTableDisplayData data={table}/>
    )
}


const PnlActions = () => {


    return (
        <div className={"gap-8 w-full flex justify-end items-center"}>
            <CreateAccountingOrSubAccounting>
                <PnlAction>Ajouter un compte</PnlAction>
            </CreateAccountingOrSubAccounting>
            <CreateAccountingOrSubAccounting variant={"subpnl"}>
                <PnlAction>Ajouter un sous-compte</PnlAction>
            </CreateAccountingOrSubAccounting>
        </div>
    )
}

const PnlAction: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, className, ...props}) => {

    return (
        <button className={cn(
            "text-[#2554AE] flex items-center gap-2 text-sm font-bold",
            className
        )}>
            <PlusIcon/>
            <div>{children}</div>
        </button>
    )
}