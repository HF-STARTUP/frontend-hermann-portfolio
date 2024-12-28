"use client"

import React from "react";
import {AdminDataTableDisplayProps} from "@/types/dataDisplayTable";
import AdminTableDisplayData from "@/components/display/AdminTableDisplayData";
import {useRequestAccounting} from "@/hooks/acounting/useAcounting";
import {AccountingModel} from "@/model/accounting/Accounting";
import Loading from "@/components/ui/Loader";

const StatusAccountList: React.FC = () => {

    const {data: accountings, isLoading} = useRequestAccounting()
    const [tablesDatas, setTableData] = React.useState<AccountingModel[]>()

    const statusAccountsDisplay: AdminDataTableDisplayProps = {
        head: [
            'Date',
            'Nom du chauffeur',
            'Recette',
            'Coût panne',
            'Objectif',
            'Ecart',
            'Marque de véhicule',
            'Modèle du véhicule'
        ],
        body: accountings?.map((r) => [
            r.creatingAt,
            r.driverName,
            '' + r.recette,
            '' + r.objective,
            '' + r.objective,
            '' + r.ecart,
            '' + r.vehicleBrand,
            '' + r.vehicleModel
        ]),
        footer: ['Total', '-',
            ''+accountings?.reduce((s, v)=>s+(v.recette||0), 0),
            ''+accountings?.reduce((s, v)=>s+(v.objective||0), 0),
            ''+accountings?.reduce((s, v)=>s+(v.objective||0), 0),
            ''+accountings?.reduce((s, v)=>s+(v.ecart||0), 0),
            '-',
            '-'
        ]
    }


    if (isLoading) {

        return (
            <div>
                <Loading/>
            </div>
        )
    }

    if (accountings?.length) {
        return (
            <div>
                <AdminTableDisplayData data={statusAccountsDisplay}/>
            </div>
        )
    }
}


export default StatusAccountList
