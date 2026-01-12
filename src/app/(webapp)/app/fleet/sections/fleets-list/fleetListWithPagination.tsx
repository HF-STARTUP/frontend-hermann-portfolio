"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FleetModel } from "@/model/ADMIN/fleet";
import { DataTable } from "@/components/ui/DataTable";
import { fleetColumns, calculateFleetFooterData } from "./fleetColumns";

interface FleetListWithPaginationProps {
    fleets: FleetModel[];
    isLoading?: boolean;
    pageSize?: number;
}

/**
 * Version paginée du listing des flottes
 * Utile quand il y a beaucoup de flottes (>50)
 * 
 * Features:
 * - Pagination automatique
 * - Navigation entre les pages
 * - Footer avec totaux globaux (pas par page)
 */
export const FleetListWithPagination: React.FC<FleetListWithPaginationProps> = ({ 
    fleets,
    isLoading = false,
    pageSize = 20 
}) => {
    const router = useRouter();

    // Footer calculé sur TOUTES les données, pas seulement la page actuelle
    const footerData = useMemo(() => {
        return calculateFleetFooterData(fleets);
    }, [fleets]);

    // Handler pour la navigation
    const handleRowClick = React.useCallback(
        (fleet: FleetModel) => {
            router.push(`/app/fleet/${fleet.id}/dashboard`);
        },
        [router]
    );

    // Fonction pour déterminer le style de la ligne selon l'état de l'abonnement
    const getRowClassName = React.useCallback(
        (fleet: FleetModel) => {
            if (!fleet.hasActiveSubscription) {
                return "bg-gray-100 hover:bg-gray-200 opacity-60";
            }
            return "";
        },
        []
    );

    return (
        <DataTable
            columns={fleetColumns}
            data={fleets}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            getRowClassName={getRowClassName}
            enableSorting={true}
            enablePagination={true}
            pageSize={pageSize}
            showFooter={true}
            footerData={footerData}
            variant="v2"
            emptyMessage="Aucune flotte disponible"
        />
    );
};

export default FleetListWithPagination;

