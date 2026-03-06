import React, { JSX } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Ajustez l'import selon votre structure (ex: Shadcn UI)

const TransactionCloseFilters = (): JSX.Element => {
    return (
        <div className="flex items-center gap-4">
            {/* Premier Filtre : Statut/Type */}
            <Select>
                <SelectTrigger className="bg-vaDarkBlue text-vaPrimary rounded-xl border-none">
                    <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Test 1</SelectItem>
                    <SelectItem value="2">Test 2</SelectItem>
                    <SelectItem value="3">Test 3</SelectItem>
                </SelectContent>
            </Select>

            {/* Deuxième Filtre : Devise */}
            <Select>
                <SelectTrigger className="bg-vaDarkBlue text-vaPrimary rounded-xl border-none">
                    <SelectValue placeholder="Devise" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">XAF</SelectItem>
                    <SelectItem value="2">XOF</SelectItem>
                    <SelectItem value="3">USD</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default TransactionCloseFilters;