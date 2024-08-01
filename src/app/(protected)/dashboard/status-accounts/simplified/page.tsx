"use client"

import React from "react";
import {AdminDataTableDisplayProps} from "@/types/dataDisplayTable";
import AdminTableDisplayData from "@/components/display/AdminTableDisplayData";
import {useRequestAccountingPNL} from "@/hooks/acounting/useAcounting";
import {PlusIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    CreateAccountingOrSubAccounting
} from "@/app/(protected)/dashboard/status-accounts/simplified/actions/createAccountingActionDialog/CreateAccountingOrSubAccountingDialog";
import {AccountingPnlResponseType} from "@/types/Accounting.types";


function processCategories(categories: any) {
    return categories.map((category: any) => {
        const monthsData = [];
        for (let monthKey in category.months) {
            const monthValue = category.months[monthKey] === null ? 0 : category.months[monthKey];
            monthsData.push(monthValue);
        }
        return [`${category.name}`].concat(monthsData);
    });
}

function generateTableData(data: AccountingPnlResponseType, isPerte = true) {
    const headers = [isPerte ? 'Pertes' : 'Profits', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const body = processCategories(isPerte ? data.pertes.categories : data.profits.categories);
    const totals = headers.map((header, index) => {
        if (index === 0) return 'Total';
        return body.reduce((sum: any, row: any) => sum + (parseInt(row[index], 10) || 0), 0);
    });

    return {
        variant: 'v2',
        head: headers,
        body: body,
        footer: totals
    };
}

export default function StatusAccountsSimplifiedPage() {

    const [perteProps, setPerteProps] = React.useState<AdminDataTableDisplayProps>()
    const [profisProps, setProfisProps] = React.useState<AdminDataTableDisplayProps>()

    const {data: acountingsPNL, isLoading} = useRequestAccountingPNL()

    //
    // const statusAccountsDisplay2: AdminDataTableDisplayProps = generateTableData(acountingsPNL?.map(a => a._instance)) as AdminDataTableDisplayProps

    React.useEffect(() => {
        if (acountingsPNL) {
            const statusAccountsDisplay1: AdminDataTableDisplayProps = generateTableData(acountingsPNL) as AdminDataTableDisplayProps
            const statusAccountsDisplay2: AdminDataTableDisplayProps = generateTableData(acountingsPNL, false) as AdminDataTableDisplayProps
            setPerteProps(statusAccountsDisplay1)
            setProfisProps(statusAccountsDisplay2)
        }
    }, [acountingsPNL])


    return (
        <div className={`flex gap-[30px] flex-wrap flex-col`}>
            <PnlActions/>
            {isLoading && <div className={"rounded-lg w-full bg-slate-200 h-[400px]"}>

            </div>}
            {profisProps && <SimplifiedStatusAccountList table={profisProps}/>}
            {perteProps && <SimplifiedStatusAccountList table={perteProps}/>}
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