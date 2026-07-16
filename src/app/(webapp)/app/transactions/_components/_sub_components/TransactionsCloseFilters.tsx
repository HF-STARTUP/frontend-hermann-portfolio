import React, { Dispatch, JSX } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CurencyResponseType } from '@/types/vehicule.type';
import { TransactionsParams } from '@/types/transactions.type';
import { FleetType } from '@/types/admin/fleet.type';

const TransactionCloseFilters = ({
    currencies,
    isLoading,
    setFilters
}: {
    currencies?: CurencyResponseType[],
    isLoading?: boolean,
    setFilters: Dispatch<React.SetStateAction<TransactionsParams>>
}): JSX.Element => {
    return (
        <div className="flex items-center gap-4">
            {/* Premier Filtre : Statut/Type */}
            <Select defaultValue='all' onValueChange={(value) => setFilters(prev => ({
                ...prev,
                account_type: value as FleetType
            }))}>
                <SelectTrigger className="bg-vaDarkBlue text-vaPrimary rounded-xl border-none">
                    <SelectValue placeholder="Type de compte" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value={"particulier"}> Particulier/ Entrepreneur </SelectItem>
                    <SelectItem value={"professionnel"}>Professionnel</SelectItem>
                </SelectContent>
            </Select>

            {/* <Select onValueChange={(value) => setFilters(prev => ({
                ...prev,
                currency_id: value
            }))}>
                <SelectTrigger className="bg-vaDarkBlue text-vaPrimary rounded-xl border-none">
                    <SelectValue placeholder="Devise" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toutes les Devise</SelectItem>
                    {
                        currencies?.map((c) =>
                            <SelectItem value={c.id} key={c.id}> {c.name} </SelectItem>
                        )
                    }
                </SelectContent>
            </Select> */}
        </div>
    );
};

export default TransactionCloseFilters;