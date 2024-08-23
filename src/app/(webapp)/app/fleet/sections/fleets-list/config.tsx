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
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import {FleetModel} from "@/model/ADMIN/fleet";

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

export default function FleetListAccount({fleets}: { fleets: FleetModel[] }) {

    const $router = useRouter()

    const headers = [
        'Nom de la flotte',
        'Propriétaire',
        'Ville',
        'Véhicules',
        'Chauffeurs',
        'Date d’ajout',
        'CA total',
        'Prix',
        'Abonnement',
        'Date d’exp',
        'Statut'
    ];

    const body = fleets.map((fleet, index) => {
        return [
            fleet.id,
            fleet.name,
            fleet.ownerName,
            fleet.city,
            fleet.number_vehicle,
            fleet.driver_number,
            fleet.start_date ?? "-",
            fleet.ca_total,
            (fleet.subscription_amount ?? 0),
            fleet.suscription_name,
            fleet.end_date ?? "-",
            fleet.abon_status
        ]
    })


    const vehicleNumber = `${fleets.reduce((acc, fleet) => acc + fleet.number_vehicle, 0)}`
    const driverNumber = `${fleets.reduce((acc, fleet) => acc + fleet.driver_number, 0)}`
    const totalCA = `${fleets.reduce((acc, fleet) => acc + fleet._instance.ca_total, 0)}`
    const totalSubscriptionAmount = `${fleets.reduce((acc, fleet) => (acc ?? 0) + (fleet._instance.subscription_amount ?? 0), 0) ?? 0} `


    const config: AdminDataTableDisplayProps = {
        variant: 'v2',
        head: headers,
        body: body,
        footer: [
            "-",
            "-",
            "-",
            vehicleNumber,
            driverNumber,
            "-",
            totalCA,
            totalSubscriptionAmount,
            "-",
            "-",
            "-"
        ],
        callback: function (index) {
            //if(index)
            //$router.push(`/app/fleet/${this.body[index]}/dashboard`)
        }
    };


    return (
        <div className={`flex gap-[30px] flex-wrap flex-col`}>
            <AdminTableDisplayData data={config} isv2={true}/>
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